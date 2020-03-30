import { Component, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController, AlertController, ToastController } from '@ionic/angular';
import { stringify } from 'querystring';
import { reduce, map, tap } from 'rxjs/operators';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { database } from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: string;
  pass: string;
  num: number;
  r1: any;

  constructor(public route:Router, private alertCtrl:AlertController,
    public toastCtrl: ToastController,private aptService: UsuarioService,
    private db2: AngularFirestore) {
    console.log("App started");
    this.num = 0;
  }

  login(){
    this.aptService.getUserByCredential(this.user,this.pass).subscribe(data=>{
      if (data.length>0){
        this.route.navigate(['/pagina-principal'])
      }
      else{
        this.verSnackBar("Not found user","danger");
      }
    });
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
