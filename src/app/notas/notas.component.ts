import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nota } from './nota';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../usuarios/auth.service';
import { strict } from 'assert';
import { NotaService } from './nota.service';
import swal from "sweetalert2";
import { Router } from '@angular/router';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})

export class NotasComponent implements OnInit {

  notas: Nota[];
  alumnoID:any;
  private current_mail: string;
  
  
  constructor(private notaService: NotaService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    this.current_mail = this.authService.usuario.email;
    this.getAlumnoIDByEmail(this.current_mail);  
    
  }
  

  getAlumnoIDByEmail(email: string){
    {     
      this.notaService.getAlumnoIDByEmail(email).subscribe(
        res => { console.log('en el metodo' + res);
        //this.alumnoID=res;
        console.log('alumno id :' + res);
        sessionStorage.setItem('alumnoid', res);
        this.getnotaMateriabyAlumnoID(res);
      });
             
    }
  }

  getnotaMateriabyAlumnoID(id:string){
    //console.log('aca llega el id buscado:' + id)
    this.notaService.getnotaMateriabyAlumnoID(id).subscribe(
    response=>{console.log(response);
      this.notas =  response as Nota[];
    })
  }


  delete(nota: Nota): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la nota ${nota.nombremateria} ${nota.notafinal}?`,
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
        this.notaService.delete(nota.alumno_id,nota.notamateria_id).subscribe(
          response => {
            this.getnotaMateriabyAlumnoID((nota.alumno_id).toString());
            swal(
              'Nota Eliminada!',
              `Nota eliminada con éxito.`,
              'success'
            )
            this.redirectTo()
          }
          
        )
        
      

      }
      else
      {
        console.log('vienr po aca')
        this.router.navigate(['presencial/notas'])
      }
      
    }
    

    )
  }


  redirectTo(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['presencial/notas']));
 }



 
}