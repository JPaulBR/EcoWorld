import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCentroPage } from './agregar-centro.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCentroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarCentroPageRoutingModule {}
