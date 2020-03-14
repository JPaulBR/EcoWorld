import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaCentrosPage } from './pagina-centros.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaCentrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaCentrosPageRoutingModule {}
