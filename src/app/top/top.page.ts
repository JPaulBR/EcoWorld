import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from '../tablas/usuarios/usuario.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.page.html',
  styleUrls: ['./top.page.scss'],
})
export class TopPage implements OnInit {

  listUsers: any;

  constructor(private menuCtrl:MenuController,private apt: UsuarioService) { }

  ngOnInit() {
    this.apt.getUserByOrder().subscribe(res=>{
      this.listUsers = res;
    });
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
