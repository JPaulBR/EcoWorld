import { Component, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-pagina-reciclaje',
  templateUrl: './pagina-reciclaje.page.html',
  styleUrls: ['./pagina-reciclaje.page.scss'],
})
export class PaginaReciclajePage implements OnInit {

  mapa:mapboxgl.Map;

  constructor(private menuCtrl: MenuController,private navCtrl: NavController) { 
  }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapboxKey;
    navigator.geolocation.getCurrentPosition(pos=>{
      console.log(pos.coords.latitude+" "+ pos.coords.longitude);
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;
      this.mapa = new mapboxgl.Map({
        container: 'mapa-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat], // starting position lng lat
        zoom: 16.6 // starting zoom
      });

      this.mapa.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
      );

      var marker = new mapboxgl.Marker({
        draggable: false
        })
        .setLngLat([lng, lat])
        .addTo(this.mapa);
    })
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }


}
