import { Component, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CentrosService } from '../tablas/centros/centros.service';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../tablas/usuarios/usuario.service';

@Component({
  selector: 'app-pagina-reciclaje',
  templateUrl: './pagina-reciclaje.page.html',
  styleUrls: ['./pagina-reciclaje.page.scss'],
})
export class PaginaReciclajePage implements OnInit {

  mapa:mapboxgl.Map;
  pulsingDot:any;

  constructor(private menuCtrl: MenuController,private navCtrl: NavController,
    private screenOrientation: ScreenOrientation, private apt:CentrosService,
    private apt2:UsuarioService,private storage: Storage) { 
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
  }

  ngOnInit() {
    /*if (this.mapa!=undefined){
      this.mapa.remove();
    }*/
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
          var msj = element.horario;
          msj= msj+"\n"+"Phone: "+element.telefono;
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
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(msj);
      new mapboxgl.Marker(el)
        .setLngLat([lng,lat])
        .setPopup(popup)
        .addTo(this.mapa);
    }
    else{
      im.src = img;
      im.style.width = "25px";
      im.style.height = "25px";
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(msj);
      new mapboxgl.Marker(im)
        .setLngLat([lng,lat])
        .setPopup(popup)
        .addTo(this.mapa);
    }
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }


}