import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(users: any, text: string): any {
    if (text.length===0){
      return users;
    }
    text = text.toLocaleLowerCase();
    return users.filter(user=>{
      return user.nombre.toLocaleLowerCase().includes(text);
    }); 
  }

}
