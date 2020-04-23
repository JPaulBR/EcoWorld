import { Component, OnInit } from '@angular/core';
import { MenuController,PopoverController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {

  listUsers: any;
  spinner: boolean;

  constructor(private menuCtrl:MenuController,private apt: UsuarioService,public toastCtrl: ToastController,
    public viewer: PhotoViewer,public popoverController: PopoverController) { }

  ngOnInit() {
    this.spinner = true;
    this.apt.getUserByOrder().subscribe(res=>{
      this.listUsers = res;
      this.spinner = false;
    });
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  openImage(url:string){
    var photoUrl = url;
    var title = "Profile image";
    this.viewer.show(photoUrl,title);
  }

  getTotal(tot:string){
    var msj = "Total reciclado: "+tot+" kg";
    this.presentSnackBar(msj,"success");
  } 
  
  async presentSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      color: tColor
    });
    toast.present();
  }

}
