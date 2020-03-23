import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UsuarioService } from './../tablas/usuarios/usuario.service';
import {Appointment} from './../tablas/usuarios/usuario';
import {Observable} from 'rxjs';
import { ToastController, AlertController, PopoverController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { PopupComponent } from '../popup/popup.component';
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
  image: any;
  //profile = {} as Profile;
  //bookingListRef: AngularFireList<any>;

  constructor(private aptService: UsuarioService,
    public toastCtrl: ToastController,
    private router: Router,
    public popoverController: PopoverController,
    private camera: Camera,
    public fb: FormBuilder/*private aftAuth: AngularFireAuth,public navCtrl:NavController,
    private afDatabase: AngularFireDatabase*/) {
    /*this.ref.on('value', resp=>{
      this.items = snapshotToArray(resp);
    });*/
    this.image = "https://image.flaticon.com/icons/svg/1177/1177568.svg";
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
    var id : number =  this.bookingForm.value.id;
    var nombre : string =  this.bookingForm.value.nombre;
    var apellido: string =  this.bookingForm.value.apellido;
    var email: string =  this.bookingForm.value.email;
    var contra: string = this.bookingForm.value.contra;
    if (nombre==='' || apellido==='' || email==='' || contra==="" ){
      this.verSnackBar("Empty fields","danger");
    }
    else{
      //this.bookingForm.value.nombre con esto obtengo el nombre
      this.aptService.addUser(this.bookingForm.value).then(res => {
        this.bookingForm.reset();
        this.router.navigate(['/home']);
        this.verSnackBar("Sign up successfully","success");
      })
        .catch(error => console.log(error));
    }
  }

  async verSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      color: tColor
    });
    toast.present();
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

  sacarCamara(){
    console.log("camara");
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(resultado =>{
      this.image = "data:image/jpeg;base64,"+resultado;
    }).catch(error =>{
      console.log(error);
    })
  }

  tomarGaleria(){
    console.log("galeria");
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(resultado =>{
      this.image = "data:image/jpeg;base64,"+resultado;
    }).catch(error =>{
      console.log(error);
    })
  }

  async presentPopover(ev: any) {
    let popover = await this.popoverController.create({
      component: PopupComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    const {data} = await popover.onWillDismiss();
    if (data.item===1){
      this.sacarCamara();
    }
    else if (data.item===2){
      this.tomarGaleria();
    }
    else{
      //nothing
    }
  }

}
