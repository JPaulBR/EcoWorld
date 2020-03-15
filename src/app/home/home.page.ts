import { Component, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: string;
  pass: string; 

  constructor(public route:Router) {
    console.log("App started");
  }

  login(){
    console.log("User: "+this.user);
    console.log("pass: "+this.pass);
    this.route.navigate(['/pagina-principal']);
  }

  register(){
    this.route.navigate(['/pagina-registrar']);
  }
  

}
