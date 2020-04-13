import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentanaMapa2PageRoutingModule } from './ventana-mapa2-routing.module';

import { VentanaMapa2Page } from './ventana-mapa2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentanaMapa2PageRoutingModule
  ],
  declarations: [VentanaMapa2Page]
})
export class VentanaMapa2PageModule {}
