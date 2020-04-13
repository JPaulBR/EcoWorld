import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CentrosService } from '../tablas/centros/centros.service';
import { HttpClient } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-ventana-mapa2',
  templateUrl: './ventana-mapa2.page.html',
  styleUrls: ['./ventana-mapa2.page.scss'],
})
export class VentanaMapa2Page implements OnInit {

  lat:any;
  lng:any;
  latlng: string;
  mapa:mapboxgl.Map;
  urlAdress1: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  urlAdress2: string = ".json?access_token=pk.eyJ1IjoianBicjI1IiwiYSI6ImNrOHRsdmw5NDAxb2YzbHA2NGNwM2FxNnUifQ.P7qjwxnZaeqi5hnC9IpDUw";
  
  constructor(public alertController: AlertController,private activatedRoute:ActivatedRoute,private screenOrientation: ScreenOrientation,
    public route:Router,private apt2: CentrosService,private http:HttpClient,public loadingController: LoadingController) { }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapboxKey;
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
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapa-mapbox2', // container id
      style: 'mapbox://styles/mapbox/streets-v11',//'https://api.mapbox.com/styles/v1/jpbr25/ck8xyya9g4n0f1iphr59enj8u?access_token='+environment.mapboxKey,
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

  close(){
    this.activatedRoute.params.subscribe(res=>{
      var result = res["id"];
      this.route.navigate(['/actualizarCentro',result]);
    });
  }

  save(){
    var ide;
    this.activatedRoute.params.subscribe(res=>{
      ide = res["id"];
    });
    this.updateLatLng(ide);
  }

  updateLatLng(ide:string){
    //console.log(result);
    this.presentLoading();
    var res = this.latlng.split(",");
    var lng = res[0];
    var lat = res[1];
    var adressCurl= this.urlAdress1+lng+","+lat+this.urlAdress2;
    this.http.get(adressCurl).subscribe(res=>{
      var place = res['features'][1].place_name;
      this.apt2.getCampaign(ide).subscribe(val=>{
        var lista={
          aluminio: val.aluminio,
          correoUsuario: val.correoUsuario,
          bateria: val.bateria,
          horario: val.horario,
          lat: lat,
          long: lng,
          lugar: place,//cambiar
          papel: val.papel,
          plastico: val.plastico,
          telefono: val.telefono,
          tetra: val.tetra,
          vidrio: val.vidrio
        };
      this.apt2.updateCampaign(lista,ide).then(resp=>{
        this.route.navigate(['/actualizarCentro',ide]);
        });
      });
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
