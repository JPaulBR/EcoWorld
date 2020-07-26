import { Component, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import {Facebook,FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import * as CryptoJS from 'crypto-js';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  password: string;
  spinner: boolean;
  textBtn: string;
  forget= false;
  type = 'password';
  nameIcon = 'eye-off';
  buttonDisabled: boolean;
  userRegister: any;
  isKeyboardHide=true;

  constructor(public route:Router, private alertCtrl:AlertController,
    public toastCtrl: ToastController,private aptService: UsuarioService,
    private db2: AngularFirestore,private storage: Storage,private sms: SMS,
    private navCtrl: NavController, private emailComposer: EmailComposer,
    public menuCtrl: MenuController,private facebook:Facebook,
    private apt: UsuarioService, private screenOrientation: ScreenOrientation,
    public keyboard:Keyboard) {
    this.spinner = false;
    this.textBtn = "Iniciar sesión";
    this.buttonDisabled = false;
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit() {
    this.storage.set('email', "null");
  }

  registerFacebook(){
    this.buttonDisabled = true;
    this.facebook.login(["email","public_profile"]).then((response:FacebookLoginResponse)=>{
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)',[]).then(profile=>{
        var email = profile["email"];
        if (email===undefined || email===null || email===""){
          this.presentSnackBar("Ha ocurrido un error","danger");
        }
        this.apt.getUserByEmail(email).subscribe(res=>{
          if (res.length===0){
            this.userRegister = {
              nombre: profile["first_name"],
              apellido: profile["last_name"],
              email: profile["email"],
              contra: "YOUR_PASSWORD_FACEBOOK",
              urlFoto: profile["picture_large"]["data"]["url"],
              permiso: false,
              reciclado: 0,
            };
            this.apt.addUser2(this.userRegister).then(res=>{
              this.apt.createPointsForUser(email).then(r=>{
                this.buttonDisabled = false;
              });
            }).catch(res=>{
              alert(res);
            });
          }
          this.saveEmail(email);
          this.route.navigate(['/pagina-principal']);
        });
      })
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.isKeyboardHide=false;
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.isKeyboardHide=true;
      // console.log('HIDEK');
    });
  }

  //validate user input
  login(){
    this.spinner = true;
    this.textBtn = "";
    this.buttonDisabled = true;
    if (this.email==="" || this.password==="" || this.password===undefined || this.email===undefined){
      this.presentSnackBar("Espacios vacíos","danger");
      this.spinner = false;
      this.textBtn = "Iniciar sesión";
      this.buttonDisabled = false;
    }
    else if (!this.validateEmail(this.email)){
      this.presentSnackBar("Espacios vacíos","danger");
      this.spinner = false;
      this.textBtn = "Iniciar sesión";
      this.buttonDisabled = false;
    }
    else{
      this.existsUser();
    }
  }

  existsUser(){
    this.apt.getUserByEmail(this.email).subscribe(res1=>{
      var flag = false;
      if (res1.length>0){
        flag=true;
        var pass=res1[0].contra;
        var decrypt = this.convertPassword(false,pass);
        this.validateCredentials(decrypt,pass);
      }
      else{
        if (!flag){
          this.presentSnackBar("Correo no registrado","danger");
          this.spinner = false;
          this.textBtn = "Iniciar sesión";
          this.buttonDisabled = false;
        }
      }
    });
  }

  validateCredentials(decrypt:string,pass:string){
    if (decrypt===this.password){
      this.apt.getUserByCredential(this.email,pass).subscribe(res=>{
        this.saveEmail(this.email);
        this.spinner = false;
        this.textBtn = "Iniciar sesión";
        this.buttonDisabled = false;
        this.route.navigate(['/pagina-principal']);
      });
    }
    else{
      this.presentSnackBar("Contraseña incorrecta","danger");
      this.spinner = false;
      this.textBtn = "Iniciar sesión";
      this.buttonDisabled = false;   
    }
  }

  //go to register page
  register(){
    this.route.navigate(['/pagina-registrar']);
  }

  //save email in the sql lite (local database)
  saveEmail(email:string){
    this.storage.set('email', email);
  }

  //validate the email
  validateEmail(email:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //present a popup (modal form)
  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: 'Recuperación de contraseña',
      inputs: [
        {
          name: 'email',
          placeholder: 'Correo',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Send',
          handler: data => {
            if (data.email==='') {
              this.presentSnackBar("Ingrese un correo válido.","danger");
            }
            else {
              this.sendMsj();
            }
          }
        }
      ]
    });
    alert.present();
  }

  //present a snackbar
  async presentSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      color: tColor
    });
    toast.present();
  }

  sendEmail(mail:string){
    this.presentSnackBar("Servidor no disponible","success")
  }

  makePassword(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 sendMsj(){
   this.sms.send("+50689441001","Hola, esto es una prueba").then(res=>{
     console.log("enviado");
   }) ;
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

  convertPassword(type:boolean,password:string){
    if (type){
      var conversionEncryptOutput = CryptoJS.AES.encrypt(password.trim(), "nullnone").toString();
      return conversionEncryptOutput;
    }
    else{
      var conversionDecryptOutput = CryptoJS.AES.decrypt(password.trim(), "nullnone").toString(CryptoJS.enc.Utf8);
      return conversionDecryptOutput;
    }
  }

}
