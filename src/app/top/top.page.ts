import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {

  users=[
    {nombre:"Alejadro Ramírez",lugar:"1 place",img:"https://randomuser.me/api/portraits/men/1.jpg"},
    {nombre:"Steve Mcmanaman",lugar:"2 place",img:"https://randomuser.me/api/portraits/men/2.jpg"},
    {nombre:"Lass Diarra",lugar:"3 place",img:"https://randomuser.me/api/portraits/men/3.jpg"},
    {nombre:"Gerald Pique",lugar:"4 place",img:"https://randomuser.me/api/portraits/men/4.jpg"},
    {nombre:"Keylor Navas",lugar:"5 place",img:"https://randomuser.me/api/portraits/men/5.jpg"},
    {nombre:"Ashley Cole",lugar:"6 place",img:"https://randomuser.me/api/portraits/men/6.jpg"},
    {nombre:"Alexander Pato",lugar:"7 place",img:"https://randomuser.me/api/portraits/men/7.jpg"},
    {nombre:"Andrea Pirlo",lugar:"8 place",img:"https://randomuser.me/api/portraits/men/8.jpg"},
  ]

  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
