import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleNoticiasPageRoutingModule } from './detalle-noticias-routing.module';

import { DetalleNoticiasPage } from './detalle-noticias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleNoticiasPageRoutingModule
  ],
  declarations: [DetalleNoticiasPage]
})
export class DetalleNoticiasPageModule {}
