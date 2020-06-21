import { Component, OnInit } from '@angular/core';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[];

  constructor(private alumnoService: AlumnoService ) { }

  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe(
      alumnos => this.alumnos = alumnos
    );
  }

  delete(alumno: Alumno): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al alumno ${alumno.nombre} ${alumno.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.alumnoService.delete(alumno.id).subscribe(
          response => {
            this.alumnos = this.alumnos.filter(alu => alu !== alumno)
            swal(
              'Alumno Eliminado!',
              `Alumno ${alumno.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }


}
