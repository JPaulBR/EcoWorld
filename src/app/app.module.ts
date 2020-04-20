import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
import { IonicStorageModule } from '@ionic/storage';
import {Camera} from '@ionic-native/camera/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import { HttpClientModule} from "@angular/common/http";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import { SMS } from '@ionic-native/sms/ngx';

@NgModule({
  declarations: [AppComponent,PopupComponent],
  entryComponents: [PopupComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireStorageModule],
  providers: [
    PhotoViewer,
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    EmailComposer,
    SMS,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
