import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UsuarioService } from './../tablas/usuarios/usuario.service';
import {Appointment} from './../tablas/usuarios/usuario';
import {Observable} from 'rxjs';
/*import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
import { NavController, NavParams} from '@ionic/angular';
import {Profile} from '../models/profile';
import { auth } from 'firebase';
import { AngularFireList} from '@angular/fire/database';*/

@Component({
  selector: 'app-pagina-registrar',
  templateUrl: './pagina-registrar.page.html',
  styleUrls: ['./pagina-registrar.page.scss'],
})
export class PaginaRegistrarPage implements OnInit {

  //items;
  //ref= firebase.database().ref('items/');
  nombre:string = '';
  bookingForm: FormGroup;
  Bookings = [];
  //profile = {} as Profile;
  //bookingListRef: AngularFireList<any>;

  constructor(private aptService: UsuarioService,
    private router: Router,
    public fb: FormBuilder/*private aftAuth: AngularFireAuth,public navCtrl:NavController,
    private afDatabase: AngularFireDatabase*/) {
    /*this.ref.on('value', resp=>{
      this.items = snapshotToArray(resp);
    });*/
    console.log(this.getData());
    console.log("imprime");
   }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      id: [''],
      nombre: [''],
      apellido: [''],
      email: [''],
      contra: ['']
    })
    /*let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      })
    })
    console.log('fdfd')
    console.log(this.Bookings);*/
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      //this.bookingForm.value.nombre con esto obtengo el nombre
      this.aptService.addUser(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }

  createProfile(){
    /*this.aftAuth.authState.subscribe(auth => {
      this.afDatabase.list('usuario/').push(this.profile);
    })*/
  }

  getData(){
    return this.aptService.getUsers();
    //this.afDatabase.object.name.toString;
    /*this.afDatabase.database.ref('usuario/'+id).once('value').then(function(data){
      alert(JSON.stringify(data.val().items));
    })*/
  }


}
