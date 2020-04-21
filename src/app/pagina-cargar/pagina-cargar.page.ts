import { Component, OnInit } from '@angular/core';
import { analytics } from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-cargar',
  templateUrl: './pagina-cargar.page.html',
  styleUrls: ['./pagina-cargar.page.scss'],
})
export class PaginaCargarPage implements OnInit {

  phrases = [
    {txt: "Gracias por confiar en nosotros..."},
    {txt: "Uno a uno hacemos el cambio..."},
    {txt: "Hagamos la diferencia..."},
    {txt: "Por favor espere..."},
    {txt: "Gracias por preferirnos"}
  ];
  txt:string;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.delay(1500).then(res=>{
      this.txt = this.phrases[0].txt;
      this.delay(1500).then(res1=>{
        this.txt = this.phrases[1].txt;
        this.delay(1500).then(res2=>{
          this.txt = this.phrases[2].txt;
          this.delay(1500).then(res3=>{
            this.txt = this.phrases[3].txt;
            this.delay(1500).then(res4=>{
              this.txt = this.phrases[4].txt;
              this.delay(1000).then(res5=>{
                this.navCtrl.navigateRoot("/ventana-mapa3");
              });
            });
          });
        });
      });
    });
    
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
