import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl2 from 'mapbox-gl';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CentrosService } from '../tablas/centros/centros.service';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ventana-mapa2',
  templateUrl: './ventana-mapa2.page.html',
  styleUrls: ['./ventana-mapa2.page.scss'],
})
export class VentanaMapa2Page implements OnInit {

  lat:any;
  lng:any;
  latlng: string;
  mapa2:mapboxgl2.Map;
  urlAdress1: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  urlAdress2: string = ".json?access_token="+environment.mapboxKey;
  
  constructor(public alertController: AlertController,private activatedRoute:ActivatedRoute,private screenOrientation: ScreenOrientation,
    public route:Router,private apt2: CentrosService,private http:HttpClient,private storage: Storage,
    public loadingController: LoadingController,private navCtrl: NavController) { }

  ngOnInit() {
    (mapboxgl2 as any).accessToken = environment.mapboxKey;
    var result;
    this.activatedRoute.params.subscribe(res=>{
      result = res["id1"];
    });
    var coord = result.split(",");
    this.createMap(coord[1],coord[0]);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.screenOrientation.unlock();
  }

  createMap(lat:any,lng:any){
    (mapboxgl2 as any).accessToken = environment.mapboxKey;
    this.mapa2 = new mapboxgl2.Map({
      container: 'mapa-mapbox2', // container id
      style: 'mapbox://styles/mapbox/streets-v11',//'https://api.mapbox.com/styles/v1/jpbr25/ck8xyya9g4n0f1iphr59enj8u?access_token='+environment.mapboxKey,
      center: [lng, lat], // starting position lng lat
      zoom: 14.5 // starting zoom 
    });
    this.latlng = lng+","+lat;
    this.addMarker(lng,lat);
  }

  addMarker(lng,lat){
    var marker = new mapboxgl2.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa2);
    marker.on('drag',()=>{
      this.latlng = marker.getLngLat().lng+','+marker.getLngLat().lat;
    });
  }

  close(){
    this.activatedRoute.params.subscribe(res=>{
      var result = res["id"];
      this.storage.set('idCentro', result);
      this.navCtrl.navigateRoot("/actualizar-centro");
      this.storage.set('latlng', "0");
    });
  }

  save(latlng:string){
    var ide;
    console.log(latlng);
    this.storage.set('latlng',latlng);
    this.activatedRoute.params.subscribe(res=>{
      ide = res["id"];
      this.storage.set('idCentro', ide);
      this.presentLoading();
      this.navCtrl.navigateRoot("/actualizar-centro");
      //this.navCtrl.navigateRoot("/actualizar-centro");
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      duration: 2500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}