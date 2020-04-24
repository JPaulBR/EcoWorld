import { NgModule } from '@angular/core';
import { FiltrosPipe } from './filtros.pipe';



@NgModule({
  declarations: [FiltrosPipe],
  exports:[FiltrosPipe],
})
export class PipesModule { }
