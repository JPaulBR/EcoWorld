import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaReciclajePage } from './pagina-reciclaje.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: PaginaReciclajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),IonicModule],
  exports: [RouterModule],
})
export class PaginaReciclajePageRoutingModule {}
