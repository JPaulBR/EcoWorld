import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl1 from 'mapbox-gl';
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
  mapa1:mapboxgl1.Map;

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
  }

  createMap(lat:any,lng:any){
    (mapboxgl1 as any).accessToken = environment.mapboxKey;
    this.mapa1 = new mapboxgl1.Map({
      container: 'mapa-mapbox1', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // starting position lng lat
      zoom: 14.5 // starting zoom 
    });
    this.latlng = lng+","+lat;
    this.addMarker(lng,lat);
  }

  addMarker(lng,lat){
    var marker = new mapboxgl1.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa1);
    marker.on('drag',()=>{
      this.latlng = marker.getLngLat().lng+','+marker.getLngLat().lat;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Puede mover el marcador donde desee.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  close(){
    this.route.navigate(['/agregar-centro']);
  }

  save(){
    this.route.navigate(['/agregar-centro',this.latlng]);
  }

}
