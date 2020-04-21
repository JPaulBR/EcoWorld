import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import {GoogleMapsComponent} from './google-maps/google-maps.component';
//import { RegisterPage } from './register/register.page';

const routes: Routes = [
  {path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  {path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {path: 'pagina-principal',loadChildren: () => import('./pagina-principal/pagina-principal.module').then( m => m.PaginaPrincipalPageModule)},
  {path: 'pagina-reciclaje',loadChildren: () => import('./pagina-reciclaje/pagina-reciclaje.module').then( m => m.PaginaReciclajePageModule)},
  {path: 'pagina-centros',loadChildren: () => import('./pagina-centros/pagina-centros.module').then( m => m.PaginaCentrosPageModule)},
  {path: 'top',loadChildren: () => import('./top/top.module').then( m => m.TopPageModule)},
  {path: 'agregar-centro',loadChildren: () => import('./agregar-centro/agregar-centro.module').then( m => m.AgregarCentroPageModule)},
  {path: 'pagina-registrar',loadChildren: () => import('./pagina-registrar/pagina-registrar.module').then( m => m.PaginaRegistrarPageModule)},
  {path: 'profile',loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)},
  {path: 'detalle-centro',loadChildren: () => import('./detalle-centro/detalle-centro.module').then( m => m.DetalleCentroPageModule)},
  {path: 'detalle-noticias',loadChildren: () => import('./detalle-noticias/detalle-noticias.module').then( m => m.DetalleNoticiasPageModule)},
  {path: 'detalleN/:id',loadChildren: () => import('./detalle-noticias/detalle-noticias.module').then( m => m.DetalleNoticiasPageModule)},
  {path: 'paginaPrincipal/:id',loadChildren: () => import('./pagina-principal/pagina-principal.module').then( m => m.PaginaPrincipalPageModule)},
  {path: 'detalle-centro/:id',loadChildren: () => import('./detalle-centro/detalle-centro.module').then( m => m.DetalleCentroPageModule)},
  {path: 'actualizar-centro',loadChildren: () => import('./actualizar-centro/actualizar-centro.module').then( m => m.ActualizarCentroPageModule)},
  {path: 'actualizarCentro/:id',loadChildren: () => import('./actualizar-centro/actualizar-centro.module').then( m => m.ActualizarCentroPageModule)},
  {path: 'actualizarCentro/:id/:id1',loadChildren: () => import('./actualizar-centro/actualizar-centro.module').then( m => m.ActualizarCentroPageModule)},
  {path: 'about',loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)},
  {path: 'ventana-mapa',loadChildren: () => import('./ventana-mapa/ventana-mapa.module').then( m => m.VentanaMapaPageModule)},
  {path: 'ventana-mapa/:id/:id1',loadChildren: () => import('./ventana-mapa/ventana-mapa.module').then( m => m.VentanaMapaPageModule)},
  {path: 'agregar-centro/:id',loadChildren: () => import('./agregar-centro/agregar-centro.module').then( m => m.AgregarCentroPageModule)},
  {path: 'ventana-mapa2',loadChildren: () => import('./ventana-mapa2/ventana-mapa2.module').then( m => m.VentanaMapa2PageModule)},
  {path: 'ventana-mapa2/:id/:id1',loadChildren: () => import('./ventana-mapa2/ventana-mapa2.module').then( m => m.VentanaMapa2PageModule)},
  {path: 'bienvenida',loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)},
  {path: 'pagina-enviar',loadChildren: () => import('./pagina-enviar/pagina-enviar.module').then( m => m.PaginaEnviarPageModule)},
  {path: 'pagina-cargar',loadChildren: () => import('./pagina-cargar/pagina-cargar.module').then( m => m.PaginaCargarPageModule)},
  {path: 'ventana-mapa3',loadChildren: () => import('./ventana-mapa3/ventana-mapa3.module').then( m => m.VentanaMapa3PageModule)}







];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule,MenuComponent,GoogleMapsComponent],
  declarations:[MenuComponent,GoogleMapsComponent]
})
export class AppRoutingModule { }
