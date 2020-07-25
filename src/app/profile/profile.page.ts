import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController, ToastController, NavController } from '@ionic/angular';
import { PopupComponent } from '../popup/popup.component';
import { Camera } from '@ionic-native/camera/ngx';
import {AngularFireStorage} from '@angular/fire/storage';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import { element } from 'protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  key: string;
  name: string;
  lastName:string;
  email: string;
  password:string;
  cambioImagenPerfil: boolean;
  image: string;
  urlImage:string;
  permiso: boolean;
  reciclado: number;
  search:boolean = false;
  type = 'password';
  nameIcon = 'eye-off';
  isActiveToggleTextPassword: Boolean = true;
  items= [
    {valor:"Plástico",img:"https://image.flaticon.com/icons/svg/2636/2636407.svg",cant:0},
    {valor:"Aluminio",img:"https://image.flaticon.com/icons/svg/542/542003.svg",cant:0},
    {valor:"Papel",img:"https://image.flaticon.com/icons/svg/876/876158.svg", cant: 0},
    {valor:"Tetra pack",img:"https://image.flaticon.com/icons/svg/723/723447.svg",cant: 0},
    {valor:"Vidrio",img:"https://image.flaticon.com/icons/svg/1855/1855765.svg", cant:0},
    {valor:"Batería",img:"https://image.flaticon.com/icons/svg/349/349767.svg",cant:0},
  ];

  constructor(private menuCtrl:MenuController,public viewer: PhotoViewer,private navCtrl: NavController,
    public popoverController: PopoverController,private camera: Camera,public toastCtrl: ToastController,
    private storage: AngularFireStorage,private storageIonic:Storage, private apt:UsuarioService) { }

  ngOnInit() {
    this.storageIonic.get('email').then(res=>{
      if (res==="jpaulbr97@gmail.com"){
        this.search = true;
      }
      this.apt.getUserByEmail(res).subscribe(val=>{
        this.key = val[0].key;
        this.name = val[0].nombre;
        this.lastName = val[0].apellido;
        this.email = val[0].email;
        this.password = val[0].contra;
        this.image = val[0].urlFoto;
        this.permiso = val[0].permiso;
        this.reciclado = val[0].reciclado;
        this.apt.getUserByIdForPoints(this.email).subscribe(resp=>{
          if (resp.length>0){
            this.items[0].cant = Number(resp[0].cantPlastico.toFixed(2));
            this.items[1].cant = Number(resp[0].cantAluminio.toFixed(2));
            this.items[2].cant = Number(resp[0].cantPaper.toFixed(2));
            this.items[3].cant = Number(resp[0].cantTetra.toFixed(2));
            this.items[4].cant = Number(resp[0].cantVidrio.toFixed(2));
            this.items[5].cant = Number(resp[0].cantBateria.toFixed(2));
          }
        });
      });
    });
  }

  updateData(){
    if (this.name===undefined || this.lastName ===undefined || this.email===undefined || 
      this.password === undefined){
      this.presentSnackBar("Espacios vacíos","danger");
    }
    else if (this.name === "" || this.lastName === "" || this.email === "" || this.password === ""){
      this.presentSnackBar("Espacios vacíos","danger");
    }
    else if (!this.validateEmail(this.email)){
      this.presentSnackBar("Correo inválido","danger");
    }
    else{
      var lista = {
        nombre : this.name,
        apellido : this.lastName,
        email : this.email,
        contra : this.password,
        urlFoto : this.image,
        permiso : this.permiso,
        reciclado : this.reciclado  
      }
      this.apt.updateUser(lista,this.key).then(res=>{
        this.presentSnackBar("Realizado","success");
      }).catch(res=>{
        this.presentSnackBar(res,"danger");
      });
    }
  }

  async presentSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      color: tColor
    });
    toast.present();
  }

  validateEmail(email:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  openImage(){
    var photoUrl = this.image;
    var title = "Imagen de perfil";
    this.viewer.show(photoUrl,title);
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  public toggleTextPassword(): void{
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
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
      this.subirImagen(this.makeid(10));
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
      this.subirImagen(this.makeid(10));
    }).catch(error =>{
      console.log(error);
    })
  }

  makeid(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  subirImagen(ide:string){
    const file = this.image;
    const filePath = 'imagenes/'+ide;
    const ref = this.storage.ref(filePath);
    const task = ref.putString(file,'data_url',{contentType: 'image/jpeg'}).snapshotChanges().toPromise().then(_ =>{
      ref.getDownloadURL().toPromise().then(res =>{
        this.urlImage = res.toString();
        this.image = res.toString();
      });
    });
  }

  showPass(){
    if (this.nameIcon==="eye-off"){
      this.nameIcon = "eye";
      this.type = "text";
    }
    else{
     this.nameIcon = "eye-off";
     this.type = "password";
    }
  }

  goToSearchUser(){
    this.navCtrl.navigateRoot("/pagina-usuarios");
  }

}
