import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaCargarPage } from './pagina-cargar.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaCargarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaCargarPageRoutingModule {}
