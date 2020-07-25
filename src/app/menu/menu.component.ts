import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private storage:Storage,private navCtrl: NavController) {}

  ngOnInit() {}

  click(page:string){
    this.navCtrl.navigateRoot(page);
  }

}
