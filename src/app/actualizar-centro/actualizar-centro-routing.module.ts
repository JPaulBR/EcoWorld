import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarCentroPage } from './actualizar-centro.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarCentroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarCentroPageRoutingModule {}
