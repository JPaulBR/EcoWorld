import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-enviar',
  templateUrl: './pagina-enviar.page.html',
  styleUrls: ['./pagina-enviar.page.scss'],
})
export class PaginaEnviarPage implements OnInit {

  radioE:boolean=false;
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
    var num = 0; 
    for (var i = 0; i<this.form.length; i++){
      if (this.form[i].isChecked){
        num++;
      }
    }
    if (num===0){
      this.presentAlert("Ingrese al menos un tipo de material.");
    }
    else if (!this.radioE){
      this.presentAlert("Seleccione el método de pago.");
    }
    else{
      this.navCtrl.navigateRoot("/pagina-cargar");
    }
  }

  click(){
    if (this.radioE){
      this.radioE = false;
    }
    else{
      this.radioE = true;
    }
  }

}
