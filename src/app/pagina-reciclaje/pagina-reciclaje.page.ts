import { Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-pagina-reciclaje',
  templateUrl: './pagina-reciclaje.page.html',
  styleUrls: ['./pagina-reciclaje.page.scss'],
})
export class PaginaReciclajePage implements OnInit {
  map: GoogleMap;
  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCt2J7vkihxFkTGIvKeds1eUzptymCRjPo',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCt2J7vkihxFkTGIvKeds1eUzptymCRjPo'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }

}
