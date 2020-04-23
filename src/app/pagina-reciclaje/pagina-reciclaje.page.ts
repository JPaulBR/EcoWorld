import { Component, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CentrosService } from '../tablas/centros/centros.service';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagina-reciclaje',
  templateUrl: './pagina-reciclaje.page.html',
  styleUrls: ['./pagina-reciclaje.page.scss'],
})
export class PaginaReciclajePage implements OnInit {

  mapa:mapboxgl.Map;
  pulsingDot:any;
  spinner: boolean;

  constructor(private menuCtrl: MenuController,private navCtrl: NavController,
    private screenOrientation: ScreenOrientation, private apt:CentrosService,
    private apt2:UsuarioService,private storage: Storage,private http:HttpClient) { 
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
  }

  ngOnInit() {
    this.spinner = true;
    (mapboxgl as any).accessToken = environment.mapboxKey;
    navigator.geolocation.getCurrentPosition(pos=>{
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;
      this.mapa = new mapboxgl.Map({
        container: 'mapa-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat], // starting position lng lat
        zoom: 13.5 // starting zoom
      });
      this.mapa.addControl(new mapboxgl.NavigationControl());
      this.spinner = false;
      var start = [lng,lat];
      this.createOriginDestiny(start);
      //this.createRoute(start);
      this.mapa.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        })
      );
      this.apt.getCampaigns().subscribe(res=>{
        res.forEach(element=>{
          var msj = '<strong>Horario: <p>'+element.horario+'</p></strong>'+'<strong>Teléfono: '+
          '<p>'+element.telefono+'</p></strong>';
          this.createMarker(element.long,element.lat,"https://image.flaticon.com/icons/svg/2371/2371819.svg",msj);
        })
      })
      this.storage.get('email').then(res=>{
        this.apt2.getUserByEmail2(res).subscribe(dato=>{
          var photo = dato[0].urlFoto;
          var msj = "I'm here";
          this.createMarker(lng,lat,photo,msj);
        })
      });
    });
  }

  createMarker(lng:any,lat:any,img:string,msj:string){
    var el = document.createElement("ion-avatar");
    var im = document.createElement("ion-img");
    if (msj === "I'm here"){
      im.src = img;
      im.style.width = "30px";
      im.style.height = "30px";
      el.appendChild(im);
      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML('<strong>Estoy aquí</strong>');
      new mapboxgl.Marker(el)
        .setLngLat([lng,lat])
        .setPopup(popup)
        .addTo(this.mapa);
    }
    else{
      im.src = img;
      im.style.width = "25px";
      im.style.height = "25px";
      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(msj);
      new mapboxgl.Marker(im)
        .setLngLat([lng,lat])
        .setPopup(popup)
        .addTo(this.mapa);
    }
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  createRoute(start:any,end:any){
    //var end = [-83.03111606215913,9.998421359889164];
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] +
    ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + environment.mapboxKey;
    this.http.get(url).subscribe(res=>{
      var data = res["routes"][0];
      var route = data.geometry.coordinates;
      console.log(route);
      var geojson  = {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: route
        }
      };
      if (this.mapa.getSource("route")){
        var r = this.mapa.getSource('route') as mapboxgl.GeoJSONSource;
        r.setData(geojson);
      }
      else{
        this.mapa.addLayer({
          id:"route",
          type: "line",
          source: {
            type : "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: geojson.geometry.coordinates
              }
            } 
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint:{
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75
          }
        });
      }
    });
  }

  createOriginDestiny(start:any){
    this.mapa.on("click",res=>{
      var coordsObj = res.lngLat;
      var coords = Object.keys(coordsObj).map(k=>{
        return coordsObj[k]
      });
      var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }]
      };
      this.createRoute(start,coords);  
    });
  }

}