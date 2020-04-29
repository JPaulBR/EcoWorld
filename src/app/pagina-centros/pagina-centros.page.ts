import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import { CentrosService } from '../tablas/centros/centros.service';

@Component({
  selector: 'app-pagina-centros',
  templateUrl: './pagina-centros.page.html',
  styleUrls: ['./pagina-centros.page.scss'],
})
export class PaginaCentrosPage implements OnInit {

  public listUser: any = [];
  public listCenters: any = [];
  email:string;
  hide:boolean;
  prueba = false;
  hide2:boolean;
  spinner: boolean;

  constructor(private menuCtrl:MenuController, private storage: Storage, private apt: UsuarioService, 
    private apt2: CentrosService,public toastCtrl: ToastController) {}

  ngOnInit() {
    this.spinner = true;
    this.hide=false;
    this.hide2=false;
    this.storage.get('email').then((val) => {
      this.apt.getUserByEmail(val).subscribe(dato =>{
        this.listUser = dato;
        this.listUser.forEach(element => {
          this.hide2 = element.permiso;
          this.spinner = false;
        });
        if (!this.hide2){
          this.hide=true;
        }
        else{
          this.hide=false;
        }
      });
    });
    this.storage.get('email').then((val)=>{
      this.apt2.getCampaignByUser(val).subscribe(res=>{
        this.listCenters = res;
      })
    })
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  openWhatsApp(){
    window.open('https://api.whatsapp.com/send?phone=${+50689441001}');
  }

  deleteCampaign(ide:string){
    this.apt2.deleteCampaign(ide);
    this.verSnackBar("Borrado exitosamente","danger");
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
