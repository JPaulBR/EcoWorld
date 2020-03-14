import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCentroPage } from './detalle-centro.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCentroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCentroPageRoutingModule {}
