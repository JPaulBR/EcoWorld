import { Component, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController, AlertController, ToastController } from '@ionic/angular';
import { stringify } from 'querystring';
import { reduce } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: string;
  pass: string; 

  constructor(public route:Router, private alertCtrl:AlertController, public toastCtrl: ToastController) {
    console.log("App started");
  }

  login(){
    console.log("User: "+this.user);
    console.log("pass: "+this.pass);
    this.route.navigate(['/pagina-principal']);
  }

  register(){
    this.route.navigate(['/pagina-registrar']);
  }
  
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
              this.verSnackBar("Put an valid email.","danger");
            }
            else {
              // valid login
              console.log("crear función de enviar email");
              this.verSnackBar("Email sent","success");
            }
          }
        }
      ]
    });
    alert.present();
  }

  async verSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      color: tColor
    });
    toast.present();
  }

}
