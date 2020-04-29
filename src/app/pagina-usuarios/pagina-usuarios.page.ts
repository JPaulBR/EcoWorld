import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
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
  constructor(private navCtrl: NavController,private apt: UsuarioService,
    public viewer: PhotoViewer,public toastCtrl: ToastController) { }

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

  update(check:boolean,key:string){
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

  deleteUser(ide:string,email:string){
    this.apt.deleteUser(ide);
  }

  async verSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 3000,
      color: tColor
    });
    toast.present();
  }

}
