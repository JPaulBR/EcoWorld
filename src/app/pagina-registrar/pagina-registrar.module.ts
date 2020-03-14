import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaRegistrarPageRoutingModule } from './pagina-registrar-routing.module';

import { PaginaRegistrarPage } from './pagina-registrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaRegistrarPageRoutingModule
  ],
  declarations: [PaginaRegistrarPage]
})
export class PaginaRegistrarPageModule {}
