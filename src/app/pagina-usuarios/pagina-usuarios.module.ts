import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaginaUsuariosPageRoutingModule } from './pagina-usuarios-routing.module';
import { PaginaUsuariosPage } from './pagina-usuarios.page';
import {PipesModule} from '../pipes/pipes.module'

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaUsuariosPageRoutingModule
  ],
  declarations: [PaginaUsuariosPage]
})
export class PaginaUsuariosPageModule {}
