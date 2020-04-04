import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarCentroPageRoutingModule } from './actualizar-centro-routing.module';

import { ActualizarCentroPage } from './actualizar-centro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarCentroPageRoutingModule
  ],
  declarations: [ActualizarCentroPage]
})
export class ActualizarCentroPageModule {}
