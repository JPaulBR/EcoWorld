import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-centros',
  templateUrl: './pagina-centros.page.html',
  styleUrls: ['./pagina-centros.page.scss'],
})
export class PaginaCentrosPage implements OnInit {

  hide=false;
  hide2=true;
  houses=[
    {lugar:"San Blas, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"},
    {lugar:"Paraiso, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"},
    {lugar:"Taras, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"},
    {lugar:"Turrialba, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"},
    {lugar:"El Carmen, Cartago", horario:"Lunes a Jueves 9:30-15:00", material:"Plástico", img:"https://image.flaticon.com/icons/svg/967/967811.svg"}
  ]

  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
