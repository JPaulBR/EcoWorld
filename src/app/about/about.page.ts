import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  hide1: boolean = false;
  constructor(private menuCtrl:MenuController,private alertCtrl:AlertController,
    private router: Router,
    public toastCtrl: ToastController,private storage: Storage,private apt:UsuarioService) { }

  ngOnInit() {
    this.storage.get('email').then(res=>{
      if (res==="jpaulbr97@gmail.com"){
        this.hide1 = true;
      }
    });
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: '¿Qué le parece la app?',
      inputs: [
        {
          name: 'txt',
          placeholder: 'Comentarios',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: data => {
            if (data.txt!='' || data.txt !=undefined) {
              this.sendData(data.txt);
            }
          }
        }
      ]
    });
    alert.present();
  }

  sendData(txt:string){
    this.storage.get("email").then(res=>{
      this.apt.getUserByEmail(res).subscribe(val=>{
        var dateFormat = require('dateformat');
        var today = Date.now();
        var now  = dateFormat(today, "dddd, mmmm dS, yyyy, h:MM:ss TT");
        var usuario = val[0].nombre+" "+val[0].apellido;
        console.log(usuario+" "+now+" "+txt);
        var lista = {
          comentario: txt,
          fecha: now,
          usuario: usuario
        }
        this.apt.addcomments(lista).then(resp=>{
          this.presentSnackBar("Gracias por su comentario","success");
        });
      });
    })
  }

  async presentSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      color: tColor
    });
    toast.present();
  }

  goToComentaries(){
    this.router.navigate(['/comentarios']);
  }

}
