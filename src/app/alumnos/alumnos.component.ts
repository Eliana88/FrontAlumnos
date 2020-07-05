import { Component, OnInit } from '@angular/core';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import swal from "sweetalert2";
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos: Alumno[];
  paginador: any;
  

  constructor(private alumnoService: AlumnoService,
              public authService: AuthService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(
      params => {
        let page: number = +params.get('page');

        if(!page){
          page = 0;
        }

        this.alumnoService.getAlumnos(page).subscribe(
          response =>{
            this.alumnos = response.content as Alumno[];
            this.paginador = response;

          } 
        );
      }
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
              `Alumno eliminado con éxito.`,
              'success'
            )
            this.activatedRoute.paramMap.subscribe(
              params => {
                let page: number = +params.get('page');

                page = 0;
        
                this.alumnoService.getAlumnos(page).subscribe(
                  response =>{
                    this.alumnos = response.content as Alumno[];
                    this.paginador = response;
        
                  } 
                );
              }
            );


          }
        )

      }
    })
  }


}
