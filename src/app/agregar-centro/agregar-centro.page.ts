import { Component, OnInit } from '@angular/core';
import { centros } from '../tablas/centros/centros';
import { Storage } from '@ionic/storage';
import { CentrosService } from '../tablas/centros/centros.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agregar-centro',
  templateUrl: './agregar-centro.page.html',
  styleUrls: ['./agregar-centro.page.scss'],
})
export class AgregarCentroPage implements OnInit {

  place:string;
  schedule:string;
  phone:string;
  items:any;
  lat:string;
  lng: string;
  urlAdress1: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  urlAdress2: string = ".json?access_token="+environment.mapboxKey;

  constructor(private storage: Storage,private apt2: CentrosService,public loadingController: LoadingController,
    public alertController: AlertController,public toastCtrl: ToastController,
    public route:Router,private activatedRoute: ActivatedRoute,private http:HttpClient) { 
    this.items=[
      {valor:"Plástico",img:"https://image.flaticon.com/icons/svg/2636/2636407.svg",selected:false},
      {valor:"Aluminio",img:"https://image.flaticon.com/icons/svg/542/542003.svg",selected:false},
      {valor:"Papel",img:"https://image.flaticon.com/icons/svg/876/876158.svg",selected:false},
      {valor:"Tetra pack",img:"https://image.flaticon.com/icons/svg/723/723447.svg",selected:false},
      {valor:"Vidrio",img:"https://image.flaticon.com/icons/svg/1855/1855765.svg",selected:false},
      {valor:"Batería",img:"https://image.flaticon.com/icons/svg/349/349767.svg",selected:false},
    ];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>{
      var latlng = res["id"];
      if (latlng!=undefined){
        var resultado = latlng.split(",");
        this.lng = resultado[0];
        this.lat = resultado[1];
        var adressCurl= this.urlAdress1+this.lng+","+this.lat+this.urlAdress2;
        this.http.get(adressCurl).subscribe(res=>{
          this.place = res['features'][1].place_name;
        })
      }
    });
  }

  goToMap(){
    this.route.navigate(['/ventana-mapa']);
  }

  saveData(lat:string,lng:string){
    if (this.validateData(lat)){
      this.presentLoading();
      this.storage.get('email').then((res)=>{
        var data={
          correoUsuario: res,
          lat: lat,
          long: lng,
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
        this.apt2.addCampaign(data).then(res=>{
          this.verSnackBar("Realizado","success");
          this.route.navigate(['/pagina-centros']);
        });
      });
    }
  }

  validateData(lat:string){
    var plastico= this.items[0].selected;
    var aluminio= this.items[1].selected;
    var papel= this.items[2].selected;
    var tetra= this.items[3].selected;
    var vidrio= this.items[4].selected;
    var bateria= this.items[5].selected;
    if (!plastico && !aluminio && !papel && !tetra && !vidrio && !bateria){
      this.presentAlert("Ingrese al menos un tipo de material.");
      return false;
    }
    else if (this.schedule===undefined || this.phone===undefined || lat===undefined){
      this.presentAlert("Espacios vacíos.");
      return false;
    }
    else{
      return true;
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
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

  async verSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 3000,
      color: tColor
    });
    toast.present();
  }

}
