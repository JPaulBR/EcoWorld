import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CentrosService } from '../tablas/centros/centros.service';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-ventana-mapa',
  templateUrl: './ventana-mapa.page.html',
  styleUrls: ['./ventana-mapa.page.scss'],
})
export class VentanaMapaPage implements OnInit {

  lat:any;
  lng:any;
  latlng: string;
  mapa:mapboxgl.Map;

  constructor(public alertController: AlertController,private activatedRoute:ActivatedRoute,
    public route:Router,private apt2: CentrosService,private http:HttpClient,private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    this.presentAlert();
    navigator.geolocation.getCurrentPosition(pos=>{
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.createMap(this.lat,this.lng);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    });
    /*var result;
    this.activatedRoute.params.subscribe(res=>{
      result = res["id"];
    });
    if (result===undefined){
      navigator.geolocation.getCurrentPosition(pos=>{
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.createMap(this.lat,this.lng);
      });
    }
    else{
      var coord = result.split(",");
      this.createMap(coord[1],coord[0]);
    }*/ 
  }

  createMap(lat:any,lng:any){
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapa-mapbox1', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // starting position lng lat
      zoom: 14.5 // starting zoom 
    });
    this.latlng = lng+","+lat;
    this.addMarker(lng,lat);
  }

  addMarker(lng,lat){
    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
    marker.on('drag',()=>{
      this.latlng = marker.getLngLat().lng+','+marker.getLngLat().lat;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'You can move the marker everywhere.',
      buttons: ['OK']
    });
    await alert.present();
  }

  close(){
    this.route.navigate(['/agregar-centro']);
    /*var result;
    this.activatedRoute.params.subscribe(res=>{
      result = res["id1"];
    });
    if (result===undefined){
      this.route.navigate(['/agregar-centro']);
      this.navCtrl.navigateRoot('/agregar-centro')
    }
    else{
      //console.log(result);
      this.route.navigate(['actualizarCentro',result]);
    }*/
  }

  save(){
    this.route.navigate(['/agregar-centro',this.latlng]);
    /*var result;
    this.activatedRoute.params.subscribe(res=>{
      result = res["id1"];
    });
    if (result===undefined){
      this.route.navigate(['/agregar-centro',this.latlng]);
    }
    else{
       this.updateLatLng(result);     
    }*/
  }

}
