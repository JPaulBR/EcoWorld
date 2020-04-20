import { Component, OnInit } from '@angular/core';
import { CentrosService } from '../tablas/centros/centros.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actualizar-centro',
  templateUrl: './actualizar-centro.page.html',
  styleUrls: ['./actualizar-centro.page.scss'],
})
export class ActualizarCentroPage implements OnInit {

  place:string;
  schedule:string;
  phone:string;
  items:any;
  ide:string;
  latlng: string;
  latlng2: string;
  lat: string;
  lng: string;
  urlAdress1: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  urlAdress2: string = ".json?access_token="+environment.mapboxKey;

  constructor(private storage: Storage,private apt2: CentrosService,public loadingController: LoadingController,private navCtrl: NavController,
    public alertController: AlertController,public route:Router, private activatedRoute:ActivatedRoute,private http:HttpClient
    ) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>{
      this.ide = res["id"];
      if (this.ide===undefined){
        this.storage.get('idCentro').then(resp=>{
          this.ide = resp
          this.storage.get('latlng').then(rept=>{
            if (rept!="0"){
              this.updatePlace(rept);
            }
            this.loadData(resp);
          });
        });
      }
      else{
        this.loadData(this.ide);
      }
    });
  }

  updatePlace(rept:string){
    var res = rept.split(",");
    this.latlng2 = rept;
    this.lng = res[0];
    this.lat = res[1];
    var adressCurl= this.urlAdress1+this.lng+","+this.lat+this.urlAdress2;
    this.http.get(adressCurl).subscribe(val=>{
      this.place = val['features'][1].place_name;
    });
  }

  loadData(ide:string){
    this.apt2.getCampaign(ide).subscribe(res=>{
      this.place= res.lugar;
      this.schedule = res.horario;
      this.phone = res.telefono;
      this.latlng = res.long+","+res.lat;
      this.lat = res.lat;
      this.lng = res.long;
      this.items=[
        {valor:"Plastic",img:"https://image.flaticon.com/icons/svg/2636/2636407.svg",selected:res.plastico},
        {valor:"Aluminum",img:"https://image.flaticon.com/icons/svg/542/542003.svg",selected:res.aluminio},
        {valor:"Paper",img:"https://image.flaticon.com/icons/svg/876/876158.svg",selected:res.papel},
        {valor:"Tetra pack",img:"https://image.flaticon.com/icons/svg/723/723447.svg",selected:res.tetra},
        {valor:"Glass",img:"https://image.flaticon.com/icons/svg/1855/1855765.svg",selected:res.vidrio},
        {valor:"Battery",img:"https://image.flaticon.com/icons/svg/349/349767.svg",selected:res.bateria},
      ];
    });
  }

  goToMap(ide: string,coord:string){
    this.route.navigate(['/ventana-mapa2',ide,coord]);
  }

  saveData(ide:string, latlng2:string ,place:string){
    if (latlng2===undefined){
      if (this.validateData()){
        this.saveInFireBase(ide,this.latlng,place);
      }
    }
    else{
      if (this.validateData()){
        this.saveInFireBase(ide,this.latlng,place);
      }
    }
  }

  saveInFireBase(ide:string,latlang:string,place:string){
    var res = latlang.split(",");
    var lng = res[0];
    var lat = res[1];
    this.presentLoading();
    this.storage.get('email').then((res)=>{
      var data={
        correoUsuario: res,
        lat: lat,
        long: lng,
        horario: this.schedule,
        telefono: this.phone,
        lugar: place,
        plastico: this.items[0].selected,
        aluminio: this.items[1].selected,
        papel: this.items[2].selected,
        tetra: this.items[3].selected,
        vidrio: this.items[4].selected,
        bateria: this.items[5].selected,
      }
      this.apt2.updateCampaign(data,ide).then(res=>{
        this.navCtrl.navigateRoot("/pagina-centros");
      });
    });
  }

  validateData(){
    var plastico= this.items[0].selected;
    var aluminio= this.items[1].selected;
    var papel= this.items[2].selected;
    var tetra= this.items[3].selected;
    var vidrio= this.items[4].selected;
    var bateria= this.items[5].selected;
    if (!plastico && !aluminio && !papel && !tetra && !vidrio && !bateria){
      this.presentAlert("Enter at least one type of material.");
      return false;
    }
    else if (this.schedule===undefined || this.phone===undefined){
      this.presentAlert("Empty fields.");
      return false;
    }
    else{
      return true;
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Updating...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
