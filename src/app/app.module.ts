import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {GoogleMaps} from '@ionic-native/google-maps';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {PopupComponent} from './popup/popup.component';

//import {AngularFireModule} from '@angular/fire';
import {AngularFireModule} from 'angularfire2'
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from '../environments/environment';

import {Camera} from '@ionic-native/camera/ngx';
/*import {AngularFirestoreModule} from 'angularfire2/firestore';*/
@NgModule({
  declarations: [AppComponent,PopupComponent],
  entryComponents: [PopupComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
