import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-enviar',
  templateUrl: './pagina-enviar.page.html',
  styleUrls: ['./pagina-enviar.page.scss'],
})
export class PaginaEnviarPage implements OnInit {

  public form = [
    { val: 'Plástico', isChecked: false },
    { val: 'Aluminio', isChecked: false },
    { val: 'Papel', isChecked: false },
    { val: 'Tetra pack', isChecked: false },
    { val: 'Vidrio', isChecked: false },
    { val: 'Batería', isChecked: false }
  ];

  constructor(private menuCtrl:MenuController,public alertController: AlertController,private navCtrl: NavController) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  show(){
    this.presentAlert("Lamentablemente, no disponible.");
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  save(){
    //guardar datos 
    this.navCtrl.navigateRoot("/pagina-cargar");
  }

}
