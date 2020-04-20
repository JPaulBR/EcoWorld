import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  watch=false;
  constructor(private storage: Storage,private navCtrl: NavController) { }

  ngOnInit() {
    this.storage.get("init").then(res=>{
      if (res!=null){
        this.navCtrl.navigateRoot("/home");
        this.watch = false;
      }
      else{
        this.watch = true;
      }
    })
  }

  click(){
    this.storage.set("init",1).then(res=>{
      this.navCtrl.navigateRoot("/home");
    });
  }

}
