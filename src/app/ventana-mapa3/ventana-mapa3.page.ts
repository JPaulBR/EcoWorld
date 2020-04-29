import { Component, OnInit } from '@angular/core';
import * as mapboxgl4 from 'mapbox-gl';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ventana-mapa3',
  templateUrl: './ventana-mapa3.page.html',
  styleUrls: ['./ventana-mapa3.page.scss'],
})
export class VentanaMapa3Page implements OnInit {

  mapaS:mapboxgl4.Map;
  constructor(private screenOrientation: ScreenOrientation,private storage: Storage,
    private http:HttpClient,private apt2:UsuarioService,private navCtrl: NavController) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
  }

  ngOnInit() {
    (mapboxgl4 as any).accessToken = environment.mapboxKey;
    navigator.geolocation.getCurrentPosition(pos=>{
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;
      this.mapaS = new mapboxgl4.Map({
        container: 'mapa-mapbox4', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat], // starting position lng lat
        zoom: 13.5 // starting zoom
      });
      this.mapaS.addControl(new mapboxgl4.NavigationControl());
      this.storage.get('email').then(res=>{
        this.apt2.getUserByEmail(res).subscribe(dato=>{
          var photo = dato[0].urlFoto;
          var msj = "Estoy aquí";
          this.createMarker(lng,lat,photo,msj);
        })
      });
      var lng1 = -83.03168162521428;
      var lat1 = 9.987411215113582;
      this.createMarker(lng1,lat1,"https://image.flaticon.com/icons/svg/1554/1554633.svg","Voy de camino");
      this.createRoute([lng,lat],[lng1,lat1],this.mapaS);
    });
  }

  createMarker(lng:any,lat:any,img:string,msj:string){
    var el = document.createElement("ion-avatar");
    var im = document.createElement("ion-img");
    im.src = img;
    im.style.width = "25px";
    im.style.height = "25px";
    if (msj==="Estoy aquí"){
      el.appendChild(im);
      im = el;
    }
    var popup = new mapboxgl4.Popup({ offset: 25 }).setHTML(msj);
    new mapboxgl4.Marker(im)
      .setLngLat([lng,lat])
      .setPopup(popup)
      .addTo(this.mapaS);
  }

  createRoute(start:any,end:any,mapa:any){
    //var end = [-83.03111606215913,9.998421359889164];
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] +
    ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + environment.mapboxKey;
    this.http.get(url).subscribe(res=>{
      var data = res["routes"][0];
      var route = data.geometry.coordinates;
      var geojson  = {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: route
        }
      };
      if (mapa.getSource("route")){
        var r = mapa.getSource('route') as mapboxgl4.GeoJSONSource;
        r.setData(geojson);
      }
      else{
        mapa.addLayer({
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

  close(){
    this.navCtrl.navigateRoot("/pagina-principal");
  }

}
