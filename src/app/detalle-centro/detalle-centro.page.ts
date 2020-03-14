import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-centro',
  templateUrl: './detalle-centro.page.html',
  styleUrls: ['./detalle-centro.page.scss'],
})
export class DetalleCentroPage implements OnInit {
  noEncontrado = true;
  encontrado = false;
  texto = '';
  items= [
    {valor:"Plastic",img:"https://image.flaticon.com/icons/svg/2636/2636407.svg",cant:"0.85 kg"},
    {valor:"Aluminum",img:"https://image.flaticon.com/icons/svg/542/542003.svg",cant:"1.69 kg"},
    {valor:"Paper",img:"https://image.flaticon.com/icons/svg/876/876158.svg", cant: "2.12 kg"},
    {valor:"Tetra pack",img:"https://image.flaticon.com/icons/svg/723/723447.svg",cant: "0 kg"},
    {valor:"Glass",img:"https://image.flaticon.com/icons/svg/1855/1855765.svg", cant:"5.41 kg"},
    {valor:"Battery",img:"https://image.flaticon.com/icons/svg/349/349767.svg",cant:"10 kg"},
  ];

  constructor() { }

  ngOnInit() {
  }

  buscar(event){
    this.texto = event.detail.value;
    if (this.texto === "702550647"){
      this.encontrado = true;
      this.noEncontrado = false;
    }
    else{
      this.encontrado = false;
      this.noEncontrado = true;
    }
  }

}
