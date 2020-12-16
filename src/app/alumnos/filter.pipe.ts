import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultAlumnos = [];
    for(const alumno of value){
      if(alumno.apellido.indexOf(arg) > -1){
        resultAlumnos.push(alumno);
      };
    };
    return resultAlumnos;
  }

}
