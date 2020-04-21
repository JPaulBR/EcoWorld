import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentanaMapa3Page } from './ventana-mapa3.page';

const routes: Routes = [
  {
    path: '',
    component: VentanaMapa3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentanaMapa3PageRoutingModule {}
