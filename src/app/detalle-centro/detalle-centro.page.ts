import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../tablas/usuarios/usuario.service';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import { ToastController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-detalle-centro',
  templateUrl: './detalle-centro.page.html',
  styleUrls: ['./detalle-centro.page.scss'],
})
export class DetalleCentroPage implements OnInit {
  noEncontrado:boolean;
  encontrado = false;
  ide: string;
  usuario: any;
  puntosUsuario: any;
  plastico: number;
  aluminio:number;
  papel:number;
  tetra:number;
  vidrio:number;
  bateria:number;
  texto = '';
  image = "https://image.flaticon.com/icons/svg/1177/1177568.svg";

  constructor(private activatedRoute: ActivatedRoute,private apt: UsuarioService,
    public route:Router,public viewer: PhotoViewer,public toastCtrl: ToastController,
    private navCtrl: NavController) {
    this.noEncontrado = false;
    this.plastico = 0;
    this.aluminio = 0;
    this.papel = 0;
    this.tetra = 0;
    this.vidrio = 0;
    this.bateria = 0;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>{
      this.ide = res["id"];
    });
  }

  buscar(event){
    this.texto = event.detail.value;
    this.apt.getUserById(parseInt(this.texto)).subscribe(val=>{
      if (val.length>0){
        this.encontrado = true;
        this.noEncontrado = false;
        this.usuario = val[0];
        if (this.usuario.urlFoto === "null"){
          this.usuario.urlFoto = this.image;
        }
        this.apt.getUserByIdForPoints(parseInt(this.texto)).subscribe(res=>{
          if (res.length>0){
            this.puntosUsuario = res[0];
          }
          else{
            this.apt.createPointsForUser(parseInt(this.texto));
            this.apt.getUserByIdForPoints(parseInt(this.texto)).subscribe(val=>{
              this.puntosUsuario = val[0];
            });
          }
        });
      }
      else{
        this.encontrado = false;
        this.noEncontrado = true;
      }
    });
  }

  openImage(url:string){
    var photoUrl = url;
    var title = "Imagen de perfil";
    this.viewer.show(photoUrl,title);
  }

  updateData(list:any,encontrado:boolean){
    if (encontrado){
      if (this.sumatory()>0){
        var plastico = list.cantPlastico+this.plastico;
        var alumino = list.cantAluminio+this.aluminio;
        var papel = list.cantPaper+this.papel;
        var tetra = list.cantTetra+this.tetra;
        var vidrio = list.cantVidrio+this.vidrio;
        var bateria = list.cantBateria+this.bateria;
        var total = (this.plastico+this.aluminio+this.papel+this.tetra+this.vidrio+this.bateria)+list.acumulado;
        var lista = {
          id: list.id,
          cantPlastico: plastico,
          cantAluminio: alumino,
          cantPaper: papel,
          cantTetra: tetra,
          cantVidrio: vidrio,
          cantBateria: bateria,
          acumulado: total
        }
        this.apt.getUserById(parseInt(this.texto)).subscribe(res=>{
          var usuario={
            id: res[0].id,
            nombre: res[0].nombre,
            apellido: res[0].apellido,
            email: res[0].email,
            contra: res[0].contra,
            urlFoto: res[0].urlFoto,
            permiso: res[0].permiso,
            reciclado: total
          }
          this.apt.updateUser(usuario,res[0].key);
        });
        this.apt.updatePointForUser(list.key,lista);
        this.presentSnackBar("Realizado","success");
        this.route.navigate(['/pagina-centros']);
      }
      else{
        this.presentSnackBar("Sin cambios","dark");
      }
    }
    else{
      this.presentSnackBar("Noha escogido el usuario","danger");
    }
  }

  async presentSnackBar(msj,tColor){
    let toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      color: tColor
    });
    toast.present();
  }

  sumatory(){
    return this.plastico+this.aluminio+this.papel+this.tetra+this.vidrio+this.bateria;
  }
}
