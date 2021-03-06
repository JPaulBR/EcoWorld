import { Component, OnInit } from '@angular/core';
import {MenuController, AlertController} from '@ionic/angular';
import {NoticiasService} from './../tablas/noticias/noticias.service';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {

  opcion:string = "Todas las noticias";
  public listNews: any = [];
  spinner: boolean;
  hide:boolean = false;
  listaNoticias = [
    {imagenEmpresa:"data:image/jpeg;base64,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",nombreEmpresa:"elmundo.cr",fecha:"Jan 03, 2020",img:"https://www.elmundo.cr/wp-content/uploads/2016/10/Estaciones-de-Tetra-Pak_-San-Rafael-Heredia_006-1024x683.jpg",titulo:"Instalan 13 estaciones públicas de reciclaje en comunidades",descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices."},
    {imagenEmpresa:"https://lh3.googleusercontent.com/2CwLVwhf_2-p3xPpP1JaYTlkA9WrogaLvk3sKSptiN_zy6bbcOJTwnBcN2iAtX4YP3NR",nombreEmpresa:"Teletica",fecha:"Dec 10, 2019",img:"https://t1.ev.ltmcdn.com/es/posts/3/0/3/como_ensenar_a_los_ninos_a_reciclar_la_basura_1303_600.jpg",titulo:"Ambientados regresa de nuevo",descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices."},
    {imagenEmpresa:"https://pbs.twimg.com/profile_images/1196210449492119552/zfD5mHRN_400x400.jpg",nombreEmpresa:"CAME",fecha:"Jul 16, 2019",img:"https://www.maquituls.es/noticias/wp-content/uploads/2017/06/reci.jpg",titulo:"Gran concurso para el ambiente",descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices."}
                  ]

  constructor(private menuCtrl: MenuController,private apt:NoticiasService,public alertController: AlertController,
    private activeRouted: ActivatedRoute,private iab: InAppBrowser,private storage: Storage) {
  }

  ngOnInit() {
    this.spinner = true;
    this.allNews()
    this.storage.get('email').then(res=>{
      if (res==="jpaulbr97@gmail.com"){
        this.hide = true;
      }
    });
  }

  allNews(){
    this.listNews = null;
    this.apt.getNews().subscribe(dato =>{
      this.listNews = dato;
      this.spinner=false;
    });
  }

  filterNews(value:string){
    this.listNews = null;
    this.spinner = true;
    if (value==="All"){
      this.allNews();
      this.opcion = "Todas las noticias"
    }
    else{
      this.apt.searchNew(value).subscribe(dato=>{
        this.listNews = dato;
        this.spinner = false;
        this.opcion = value;
      });
    }
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  eventoClick(titulo){
    console.log("Click en: "+titulo);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  goToPage(page:string){
    this.iab.create(page,"_blank");
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Agregar noticia',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título'
        },
        {
          name: 'fecha',
          type: 'text',
          placeholder: 'Fecha'
        },
        // multiline input.
        {
          name: 'nombreEmpresa',
          type: 'text',
          placeholder: 'Empresa'
        },
        {
          name: 'fotoEmpresa',
          type: 'text',
          placeholder: 'Foto empresa url'
        },
        // input date with min & max
        {
          name: 'fotoNoticia',
          type: 'text',
          placeholder: 'Foto noticia url'
        },
        // input date without min nor max
        {
          name: 'miniDescripcion',
          type: 'textarea',
          placeholder: 'Mini descripción'
        },
        {
          name: 'fuente',
          type: 'text',
          placeholder: 'Fuente url'
        },
        {
          name: 'fechaA',
          type: 'date',
          placeholder: 'Fecha de post'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: data => {
            var lista= {
              fecha: data.fecha,
              fechaA: data.fechaA,
              fotoEmpresa: data.fotoEmpresa,
              fotoNoticia: data.fotoNoticia,
              fuente: data.fuente,
              miniDescripcion: data.miniDescripcion,
              nombreEmpresa: data.nombreEmpresa,
              titulo: data.titulo
            }
            this.apt.addNew(lista).then(res=>{
              console.log("done");
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
