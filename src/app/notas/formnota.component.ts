import { Component, OnInit } from '@angular/core';
import { Nota } from './nota';
import { NotaService } from './nota.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from "sweetalert2";
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './formnota.component.html'
})

export class FormNotaComponent implements OnInit {
  public nota: Nota = new Nota()
  public titulo:string = "Nota";
  private current_mail: string;
  public listamaterias;

  constructor(private notaService: NotaService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  public authService: AuthService) { }

  ngOnInit(): void {
    this.cargarNota();
    this.listamaterias =[
     'Algoritmo',
     'Etica profesional',
     'Estadística',
     'Sistemas administrativos',
     'Taller 6'

  ];
  
    //this.current_mail = this.authService.usuario.email;
    //this.getAlumnoIDByEmail(this.current_mail); 
  }

  
  cargarNota(): void{
    this.activatedRoute.params.subscribe(params => {
      let alumno_id = parseInt(params['alumno_id'])
      let notamateria_id = parseInt(params['notamateria_id'])
      if(alumno_id){
        this.notaService.getnotaMateriaIDbyAlumnoID(alumno_id,notamateria_id).subscribe(
          (nota) => this.nota = nota)
      }
    })
  }

  create(): void{
    console.log("Clicked");
    this.nota.alumno_id=parseInt(sessionStorage.getItem('alumnoid'))
    this.notaService.create(this.nota)
    .subscribe(nota => {
      this.router.navigate(['presencial/notas'])
      swal('Nueva nota',`Nota creada con exito!`, 'success')
    }
  )
  }


  update():void{
    this.notaService.update(this.nota)
    .subscribe(nota => {
      this.router.navigate(['presencial/notas'])
      swal('Nota Actualizada','Nota actualizada con exito!', 'success')
    })
  }

}
