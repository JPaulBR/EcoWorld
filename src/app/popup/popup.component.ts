import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {

  constructor(private popOverCtrl: PopoverController) { }

  ngOnInit() {}

  eventoClick(valor:number){
    this.popOverCtrl.dismiss({
      item: valor
    });
  }
  

}
