import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaCentrosPageRoutingModule } from './pagina-centros-routing.module';

import { PaginaCentrosPage } from './pagina-centros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaCentrosPageRoutingModule
  ],
  declarations: [PaginaCentrosPage]
})
export class PaginaCentrosPageModule {}
