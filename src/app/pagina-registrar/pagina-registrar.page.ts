import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
//import * as firebase from 'firebase';
//import {snapshotToArray} from '../../environments/environment';
import { NavController, NavParams} from '@ionic/angular';
import {Profile} from '../models/profile';
import { auth } from 'firebase';

@Component({
  selector: 'app-pagina-registrar',
  templateUrl: './pagina-registrar.page.html',
  styleUrls: ['./pagina-registrar.page.scss'],
})
export class PaginaRegistrarPage implements OnInit {

  //items;
  //ref= firebase.database().ref('items/');
  nombre:string = '';
  profile = {} as Profile;

  constructor(private aftAuth: AngularFireAuth,public navCtrl:NavController,
    private afDatabase: AngularFireDatabase) {
    /*this.ref.on('value', resp=>{
      this.items = snapshotToArray(resp);
    });*/

   }

  ngOnInit() {
  }

  createProfile(){
    this.aftAuth.authState.subscribe(auth => {
      this.afDatabase.list('usuario/').push(this.profile);
    })
  }

}
