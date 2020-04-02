import { Component, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';


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

  constructor(public route:Router, private alertCtrl:AlertController,
    public toastCtrl: ToastController,private aptService: UsuarioService,
    private db2: AngularFirestore,private storage: Storage) {
    this.spinner = false;
    this.textBtn = "LOGIN";
  }

  //validate user input
  login(){
    this.spinner = true;
    this.textBtn = "";
    if (this.email==="" || this.password==="" || this.password===undefined || this.email===undefined){
      this.presentSnackBar("Empty fields","danger");
      this.spinner = false;
      this.textBtn = "LOGIN";
    }
    else if (!this.validateEmail(this.email)){
      this.presentSnackBar("Email invalid","danger");
      this.spinner = false;
      this.textBtn = "LOGIN";
    }
    else{
      this.aptService.getUserByCredential(this.email,this.password).subscribe(data=>{
        if (data.length>0){
          this.route.navigate(['/pagina-principal']);
          this.saveEmail(this.email);
        }
        else{
          this.presentSnackBar("Not found user","danger");
          this.spinner = false;
          this.textBtn = "LOGIN";
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
          placeholder: 'Email',
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
              console.log("crear función de enviar email");
              this.presentSnackBar("Email sent","success");
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

}
