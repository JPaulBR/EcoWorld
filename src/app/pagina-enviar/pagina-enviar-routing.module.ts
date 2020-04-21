import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaEnviarPage } from './pagina-enviar.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaEnviarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaEnviarPageRoutingModule {}
