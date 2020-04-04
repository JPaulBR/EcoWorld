import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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
  houses=[
    {lugar:"San Blas, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico"},
    {lugar:"Paraiso, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"},
    {lugar:"Taras, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"},
    {lugar:"Turrialba, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"},
    {lugar:"El Carmen, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"}
  ]

  constructor(private menuCtrl:MenuController, private storage: Storage, private apt: UsuarioService, private apt2: CentrosService) {}

  ngOnInit() {
    this.hide=true;
    this.hide2=false;
    this.storage.get('email').then((val) => {
      this.apt.getUserByEmail2(val).subscribe(dato =>{
        this.listUser = dato;
        this.listUser.forEach(element => {
          this.hide2 = element.permiso;
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

}
