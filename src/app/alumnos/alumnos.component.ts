import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import swal from "sweetalert2";
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../usuarios/auth.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})

export class AlumnosComponent implements OnInit {

  alumnos: Alumno[];
  
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 8;
  pageSizeOptions: number [] = [3, 5, 10, 25, 50];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(private alumnoService: AlumnoService,
              public authService: AuthService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void{
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();

  }

  calcularRangos(){

    this.alumnoService.listarAlumnos(this.paginaActual.toString(), this.totalPorPagina.toString())
    .subscribe(p =>
      { 
        this.alumnos = p.content as Alumno[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';

      });
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
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
        this.alumnoService.delete(alumno.id).subscribe(
          response => {
            this.calcularRangos();
            swal(
              'Alumno Eliminado!',
              `Alumno eliminado con éxito.`,
              'success'
            )
            
          }
        )

      }
    })
  }


}
