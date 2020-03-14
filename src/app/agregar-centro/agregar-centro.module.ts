import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarCentroPageRoutingModule } from './agregar-centro-routing.module';

import { AgregarCentroPage } from './agregar-centro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarCentroPageRoutingModule
  ],
  declarations: [AgregarCentroPage]
})
export class AgregarCentroPageModule {}
