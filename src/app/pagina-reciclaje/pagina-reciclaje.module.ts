import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaReciclajePageRoutingModule } from './pagina-reciclaje-routing.module';

import { PaginaReciclajePage } from './pagina-reciclaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaReciclajePageRoutingModule
  ],
  declarations: [PaginaReciclajePage]
})
export class PaginaReciclajePageModule {}
