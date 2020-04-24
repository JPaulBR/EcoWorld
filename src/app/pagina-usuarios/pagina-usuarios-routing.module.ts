import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaUsuariosPage } from './pagina-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaUsuariosPageRoutingModule {}
