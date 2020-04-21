import { Component, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import { SMS } from '@ionic-native/sms/ngx';

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

  constructor(public route:Router, private alertCtrl:AlertController,
    public toastCtrl: ToastController,private aptService: UsuarioService,
    private db2: AngularFirestore,private storage: Storage,private sms: SMS,
    private navCtrl: NavController, private emailComposer: EmailComposer,
    public menuCtrl: MenuController) {
    this.spinner = false;
    this.textBtn = "LOGIN";
    this.buttonDisabled = false;
  }

  ngOnInit() {
    this.storage.get("email").then(res=>{
      if (res!="-1"){
        this.navCtrl.navigateRoot("/pagina-principal");
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
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
      this.aptService.getUserByCredential(this.email,this.password).subscribe(data=>{
        if (data.length>0){
          this.spinner = false;
          this.textBtn = "Iniciar sesión";
          this.buttonDisabled = false;
          this.route.navigate(['/pagina-principal']);
          this.saveEmail(this.email);
        }
        else{
          this.presentSnackBar("Usuario no encontrado","danger");
          this.spinner = false;
          this.textBtn = "Iniciar sesión";
          this.buttonDisabled = false;
        }
      });
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
      header: 'Forget Password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Phone number',
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
              // invalid login
              this.presentSnackBar("Put an valid email.","danger");
            }
            else {
              // valid login
              //this.sendEmail(data.email);
              this.sendMsj();
              //console.log("crear función de enviar email");
              //this.presentSnackBar("Email sent","success");
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
    /*let email = {
      to: mail,
      cc: 'jpaulbr97@gmail.com',
      attachments: [
        'https://image.flaticon.com/icons/svg/46/46510.svg'
      ],
      subject: 'Recover password',
      body: 'Hi, have a nice day. This is your new password: '+this.makePassword(10)+" You can change the password whenever you want.",
      isHtml: true
    } 
    // Send a text message using default options
    this.emailComposer.open(email).then(res=>{
      this.presentSnackBar("Sent email","success");
    });*/
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

}
