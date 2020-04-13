import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentanaMapa2Page } from './ventana-mapa2.page';

const routes: Routes = [
  {
    path: '',
    component: VentanaMapa2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentanaMapa2PageRoutingModule {}
