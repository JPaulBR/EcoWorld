import { Component, OnInit } from '@angular/core';
import { CentrosService } from '../tablas/centros/centros.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

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
  lat: string;
  lng: string;

  constructor(private storage: Storage,private apt2: CentrosService,public loadingController: LoadingController,
    public alertController: AlertController,public route:Router, private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>{
      this.ide = res["id"];
      this.loadData();
    });
  }

  loadData(){
    this.apt2.getCampaign(this.ide).subscribe(res=>{
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

  saveData(ide:string){
    if (this.validateData()){
      this.presentLoading();
      this.storage.get('email').then((res)=>{
        var data={
          correoUsuario: res,
          lat: this.lat,
          long: this.lng,
          horario: this.schedule,
          telefono: this.phone,
          lugar: this.place,
          plastico: this.items[0].selected,
          aluminio: this.items[1].selected,
          papel: this.items[2].selected,
          tetra: this.items[3].selected,
          vidrio: this.items[4].selected,
          bateria: this.items[5].selected,
        }
        this.apt2.updateCampaign(data,ide);
        this.route.navigate(['/pagina-centros']);
      });
    }
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
