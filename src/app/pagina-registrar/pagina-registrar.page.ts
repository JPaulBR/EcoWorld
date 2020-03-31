import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { UsuarioService } from './../tablas/usuarios/usuario.service';
import {Observable} from 'rxjs';
import { ToastController, AlertController, PopoverController, Platform } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { PopupComponent } from '../popup/popup.component';
import {AngularFireStorage} from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pagina-registrar',
  templateUrl: './pagina-registrar.page.html',
  styleUrls: ['./pagina-registrar.page.scss'],
})
export class PaginaRegistrarPage implements OnInit {

  nombre:string = '';
  userForm: FormGroup;
  Bookings = [];
  image: any;
  urlImage: string;
  textoBoton: string = "Sign up";
  cambioImagenPerfil: boolean = false;
  spinner: boolean;

  constructor(private aptService: UsuarioService,
    public toastCtrl: ToastController,
    private router: Router,
    public popoverController: PopoverController,
    private camera: Camera,
    private platform: Platform, 
    private storage: AngularFireStorage,
    public fb: FormBuilder) {
    this.image = "https://image.flaticon.com/icons/svg/1177/1177568.svg";
    this.userForm = new FormGroup({
      id: new FormControl('',[Validators.required]),
      nombre: new FormControl('',Validators.required),
      apellido: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email,Validators.pattern(".+\@.+\..+")]),
      contra: new FormControl('',[Validators.required,Validators.minLength(4)]),
      urlFoto: new FormControl('')
    })
    this.spinner = false;
   }

  ngOnInit() {
  }

  formSubmit() {
    this.spinner = true;
    this.textoBoton = " ";
    var id : number =  this.userForm.value.id;
    var nombre : string =  this.userForm.value.nombre;
    var apellido: string =  this.userForm.value.apellido;
    var email: string =  this.userForm.value.email;
    var contra: string = this.userForm.value.contra;
    if (id===undefined || nombre==='' || apellido==='' || email===''){
      this.verSnackBar("Empty fields","danger");
      this.spinner = false;
      this.textoBoton = "Sign up";
    }
    else if (!this.validateEmail(email)){
      this.verSnackBar("Invalid email","danger");
      this.spinner = false;
      this.textoBoton = "Sign up";
    }
    else{
      this.aptService.getUserByEmail(email).subscribe(data=>{
        if (data.length>0){
          this.verSnackBar("Email is already exists","danger");
          this.spinner = false;
          this.textoBoton = "Sign up";
        }
        else{
          this.aptService.getUserById(id).subscribe(data=>{
            if (data.length>0){
              this.verSnackBar("Id is already exists","danger");
              this.spinner = false;
              this.textoBoton = "Sign up";
            }
            else{
              this.subirImagen(id);
              this.userForm.value.urlFoto = this.urlImage;
              this.aptService.addUser(this.userForm.value).then(res => {
              this.spinner = false;
              this.userForm.reset();
              this.verSnackBar("Sign up successfully","success");
              this.router.navigate(['/home']);
              }).catch(error => console.log(error));
            }
          });
        }
      });
    }
  }

  validateEmail(email:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
