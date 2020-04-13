import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentanaMapaPageRoutingModule } from './ventana-mapa-routing.module';

import { VentanaMapaPage } from './ventana-mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentanaMapaPageRoutingModule
  ],
  declarations: [VentanaMapaPage]
})
export class VentanaMapaPageModule {}
