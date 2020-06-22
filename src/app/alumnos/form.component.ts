import { Component, OnInit } from '@angular/core';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
  public alumno: Alumno = new Alumno()
  public titulo:string = "Alumno";

  constructor(private alumnoService: AlumnoService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarAlumno();
  }

  cargarAlumno(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.alumnoService.getAlumno(id).subscribe(
          (alumno) => this.alumno = alumno)
      }
    })
  }

  create(): void{
    console.log("Clicked");
    console.log(this.alumno);
    this.alumnoService.create(this.alumno)
    .subscribe(alumno => {
      this.router.navigate(['/presencial'])
      swal('Nuevo Alumno',`Alumno creado con exito!`, 'success')
    }
  )
  }

  update():void{
    this.alumnoService.update(this.alumno)
    .subscribe(alumno => {
      this.router.navigate(['/presencial'])
      swal('Alumno Actualizado','Alumno actualizado con exito!', 'success')
    })
  }

}
