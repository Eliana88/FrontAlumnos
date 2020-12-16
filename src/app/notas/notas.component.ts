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
  notas2: any;
 
  private current_mail: string;
  
  
  constructor(private notaService: NotaService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    this.current_mail = this.authService.usuario.email;
    this.getAlumnoIDByEmail(this.current_mail);  
    
   
   //this.notas.push(new Nota(21,'nombre',21,10));
    //console.log(this.notas);
    
  }
  

  getAlumnoIDByEmail(email: string){
    {     
      this.notaService.getAlumnoIDByEmail(email).subscribe(
        res => { 
        //console.log('en el metodo' + res);
        //this.alumnoID=res;
        //console.log('alumno id :' + res);
        sessionStorage.setItem('alumnoid', res);
        let nombremateria=sessionStorage.getItem("nombremateria");
        if (nombremateria)
          this.getNombreMateriaByAlumnoID();
        else
          this.getnotaMateriabyAlumnoID(res);
      });
             
    }
  }


  getFilterNotaMateria(nombremateria:string){
    //console.log('aca llega el id buscado:' + id)
    if (nombremateria!='')
      {
        sessionStorage.setItem("nombremateria",nombremateria);
        this.redirectTo();
      }
  }




  getnotaMateriabyAlumnoID(id:string){
    //console.log('aca llega el id buscado:' + id)
    this.notas=[];
    this.notaService.getnotaMateriabyAlumnoID(id).subscribe(
    response=>{
      if (response==null)
      this.notas=[];
    else{
      let vec:Nota[];
      vec=response as Nota[];
      if (vec.length>1) {
        this.notas =  response as Nota[];
      } else {
        let notamateriabuscada= response as Nota;
        this.notas=[];
        this.notas.push(notamateriabuscada);
      }
    }
    })
  }

  //Filtra el resultado de notas por Nombre de materia
  getNombreMateriaByAlumnoID(){
    //console.log('aca llega el id buscado:' + id)
    let alumno_id=parseInt(sessionStorage.getItem('alumnoid'))
    let nombremateria=sessionStorage.getItem('nombremateria')
    this.notas=[];
    this.notaService.getNombreMateriaByAlumnoID(nombremateria,alumno_id).subscribe(
    response=>{
    if (response==null)
      this.notas=[];
    else{
      let vec:Nota[];
      vec=response as Nota[];
      if (vec.length>1) {
        this.notas =  response as Nota[];
      } else {
        let notamateriabuscada= response as Nota;
        this.notas=[];
        this.notas.push(notamateriabuscada);
      }
    }

      //this.notas =  response as Nota[];

      sessionStorage.removeItem("nombremateria");
    })
  }


  delete(nota: Nota): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la nota ${nota.nombremateria}?`,
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
        //console.log('vienr po aca')
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