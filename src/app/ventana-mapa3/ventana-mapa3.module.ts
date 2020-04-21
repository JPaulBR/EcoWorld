import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentanaMapa3PageRoutingModule } from './ventana-mapa3-routing.module';

import { VentanaMapa3Page } from './ventana-mapa3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentanaMapa3PageRoutingModule
  ],
  declarations: [VentanaMapa3Page]
})
export class VentanaMapa3PageModule {}
