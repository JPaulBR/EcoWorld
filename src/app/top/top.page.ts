import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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

  constructor(private menuCtrl:MenuController,private apt: UsuarioService,public viewer: PhotoViewer) { }

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

}
