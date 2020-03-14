import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-centro',
  templateUrl: './agregar-centro.page.html',
  styleUrls: ['./agregar-centro.page.scss'],
})
export class AgregarCentroPage implements OnInit {

  items= [
    {valor:"Plastic",img:"https://image.flaticon.com/icons/svg/2636/2636407.svg"},
    {valor:"Aluminum",img:"https://image.flaticon.com/icons/svg/542/542003.svg"},
    {valor:"Paper",img:"https://image.flaticon.com/icons/svg/876/876158.svg"},
    {valor:"Tetra pack",img:"https://image.flaticon.com/icons/svg/723/723447.svg"},
    {valor:"Glass",img:"https://image.flaticon.com/icons/svg/1855/1855765.svg"},
    {valor:"Battery",img:"https://image.flaticon.com/icons/svg/349/349767.svg"},
  ]

  constructor() { }

  ngOnInit() {
  }

  ver(){
    console.log("Abrir mapa");
  }

}
