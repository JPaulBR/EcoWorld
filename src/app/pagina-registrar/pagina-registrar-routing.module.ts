import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaRegistrarPage } from './pagina-registrar.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaRegistrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaRegistrarPageRoutingModule {}
