import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-pagina-usuarios',
  templateUrl: './pagina-usuarios.page.html',
  styleUrls: ['./pagina-usuarios.page.scss'],
})
export class PaginaUsuariosPage implements OnInit {

  listUsers: any;
  spinner: boolean;
  textSearch="";
  constructor(private navCtrl: NavController,private apt: UsuarioService,public viewer: PhotoViewer) { }

  ngOnInit() {
    this.spinner = true
    this.apt.getUsers().subscribe(res=>{
      this.listUsers = res;
      this.spinner = false;
    });
  }

  back(){
    this.navCtrl.navigateRoot("/profile");
  }

  update(id:number,check:boolean,key:string){
    var valor = true;
    if (check){
      valor= false;
    }
    this.listUsers.forEach(element => {
      if (element.key==key){
        element.permiso = valor;
        this.apt.updateUser(element,key).then(res=>{console.log("done")});
        return;
      }
    });
  }

  openImage(url:string){
    var photoUrl = url;
    var title = "Imagen de perfil";
    this.viewer.show(photoUrl,title);
  }

  buscar(event){
    var texto = event.detail.value;
    this.textSearch = texto;
  }

}
