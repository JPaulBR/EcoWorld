import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../tablas/usuarios/usuario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  hide:boolean = false;
  comentarios:any;
  constructor(private router: Router,private apt: UsuarioService ) { }

  ngOnInit() {
    this.apt.getComments().subscribe(res=>{
      this.comentarios = res;
    });
  }

  back(){
    this.router.navigate(['/about']);
  }

}
