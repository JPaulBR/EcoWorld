import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCentroPageRoutingModule } from './detalle-centro-routing.module';

import { DetalleCentroPage } from './detalle-centro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCentroPageRoutingModule
  ],
  declarations: [DetalleCentroPage]
})
export class DetalleCentroPageModule {}
