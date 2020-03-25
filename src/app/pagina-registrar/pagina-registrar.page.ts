import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UsuarioService } from './../tablas/usuarios/usuario.service';
import {Observable} from 'rxjs';
import { ToastController, AlertController, PopoverController, Platform } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { PopupComponent } from '../popup/popup.component';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-pagina-registrar',
  templateUrl: './pagina-registrar.page.html',
  styleUrls: ['./pagina-registrar.page.scss'],
})
export class PaginaRegistrarPage implements OnInit {

  nombre:string = '';
  bookingForm: FormGroup;
  Bookings = [];
  image: any;
  urlImage: string;
  cambioImagenPerfil: boolean = false;

  constructor(private aptService: UsuarioService,
    public toastCtrl: ToastController,
    private router: Router,
    public popoverController: PopoverController,
    private camera: Camera,
    private platform: Platform, 
    private storage: AngularFireStorage,
    public fb: FormBuilder) {
    this.image = "https://image.flaticon.com/icons/svg/1177/1177568.svg";
   }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      id: [''],
      nombre: [''],
      apellido: [''],
      email: [''],
      contra: [''], 
      urlFoto: ['']
    })
  }

  formSubmit() {
    var id : number =  this.bookingForm.value.id;
    var nombre : string =  this.bookingForm.value.nombre;
    var apellido: string =  this.bookingForm.value.apellido;
    var email: string =  this.bookingForm.value.email;
    var contra: string = this.bookingForm.value.contra;
    if (id===undefined || nombre==='' || apellido==='' || email===''){
      this.verSnackBar("Empty fields","danger");
    }
    else{
      this.subirImagen(id);
      this.bookingForm.value.urlFoto = this.urlImage;
      this.aptService.addUser(this.bookingForm.value).then(res => {
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }

  async verSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 3000,
      color: tColor
    });
    toast.present();
  }

  subirImagen(ide:number){
    if (this.cambioImagenPerfil){
      const file = this.image;
      const filePath = 'imagenes/'+ide;
      const ref = this.storage.ref(filePath);
      const task = ref.putString(file,'data_url',{contentType: 'image/jpeg'}).snapshotChanges().toPromise().then(_ =>{
        ref.getDownloadURL().toPromise().then(res =>{
          this.urlImage = res.toString();
        });
      });
    }
    else{
      this.urlImage = "null";
    }
  }

  createProfile(){
    
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
      this.cambioImagenPerfil = true;
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
      this.cambioImagenPerfil = true;
    }).catch(error =>{
      console.log(error);
    })
  }

  async presentPopover(ev: any) {
    let popover = await this.popoverController.create({
      component: PopupComponent,
      event: ev,
      translucent: true,
      mode: 'ios'
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
