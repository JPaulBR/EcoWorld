import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaEnviarPageRoutingModule } from './pagina-enviar-routing.module';

import { PaginaEnviarPage } from './pagina-enviar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaEnviarPageRoutingModule
  ],
  declarations: [PaginaEnviarPage]
})
export class PaginaEnviarPageModule {}
