import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaCargarPageRoutingModule } from './pagina-cargar-routing.module';

import { PaginaCargarPage } from './pagina-cargar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaCargarPageRoutingModule
  ],
  declarations: [PaginaCargarPage]
})
export class PaginaCargarPageModule {}
