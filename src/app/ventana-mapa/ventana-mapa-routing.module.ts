import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentanaMapaPage } from './ventana-mapa.page';

const routes: Routes = [
  {
    path: '',
    component: VentanaMapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentanaMapaPageRoutingModule {}
