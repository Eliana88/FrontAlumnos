import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, observable, ObjectUnsubscribedError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Nota } from './nota';
import { AuthService } from '../usuarios/auth.service'; 
//id
import { URL_BACKEND } from '../config/config';
import { URL_BACKEND_NOTAMATERIAS } from '../config/config';
import swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { collectExternalReferences } from '@angular/compiler';



@Injectable()
export class NotaService {

  //URL de prueba para mostrar un listado
  //private urlEndPointNotaMateria:string = 'http://127.0.0.1:5000/' + 'alumnos';
  private urlEndPointNotaMateria:string = URL_BACKEND_NOTAMATERIAS + 'alumnos'

  //URL api alumnos
  private urlEndPointUsuario:string = URL_BACKEND + 'api/usuarios';

  
  
  constructor(private http: HttpClient, 
              private router: Router) { }


  //----- metodos http-----------//

  getnotaMateriabyAlumnoID(id: string): Observable<any>{
    return this.http.get<any>(`${this.urlEndPointNotaMateria}/${id}/notas`).pipe(
       catchError(e => {
          this.router.navigate(['/presencial/notas']);
          //console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(e);
      })
    )
  }

  //filtrar por nombre
  getNombreMateriaByAlumnoID(nombremateria:string,alumno_id:number): Observable<any>{
    return this.http.get<any>(`${this.urlEndPointNotaMateria}/` + alumno_id + `/notas?nombremateria=` + nombremateria).pipe(
       catchError(e => {
          this.router.navigate(['/presencial/notas']);
          //console.error(e.error.message);
          //swal(e.error.message, e.error.error, 'error');
          sessionStorage.removeItem("nombremateria");
          return throwError(e.error);
      })
    )
  }

  //Medoto para buscar y realizar el update
  getnotaMateriaIDbyAlumnoID(alumno_id: number,notamateria_id:number): Observable<Nota>{
    return this.http.get<Nota>(`${this.urlEndPointNotaMateria}/` + alumno_id + `/notas/` + notamateria_id).pipe(
       catchError(e => {
          this.router.navigate(['/presencial/alumnos/notas']);
          //console.error(e.error.message);
          //swal(e.error.message, e.error.error, 'error');
          return throwError(e);
      })
    )
  }





/*
  getAlumno(id: number): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.urlEndPoint}/${id}`).pipe(
       catchError(e => {    
          this.router.navigate(['/presencial']);
          console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(e);
      })
    )
  }
*/

  getAlumnoIDByEmail(email: string): Observable<any>{
    return this.http.get<any>(`${this.urlEndPointUsuario}?email=${email}`).pipe(
       catchError(e => {
          this.router.navigate(['/presencial/notas']);
          //console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(e);
      })
    )
  }

  delete(alumnoid: number,notamateriaid:number): Observable<Nota> {
    return this.http.delete<Nota>(`${this.urlEndPointNotaMateria}/${alumnoid}/notas/${notamateriaid}`).pipe(
      catchError(e => {
        //console.error(e.error.message);
        swal(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  create(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.urlEndPointNotaMateria}/${nota.alumno_id}/notas`, nota)
      .pipe(
        map((response: any) => response.nota as Nota),
        catchError(e => {
          //console.error(e.error.cod_interno);
          swal(e.error.mensaje_interno + ' Código de error ' + e.error.cod_interno + '.',  e.error.Detalle , 'error');
          return throwError(e);
        })
      )
  }



  update(nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.urlEndPointNotaMateria}/` + nota.alumno_id + '/notas/' + nota.notamateria_id, nota)
      .pipe(
        map((response: any) => response.nota as Nota),
        catchError(e => {
          //console.error(e.error.message);
          //swal('Código de error ' + e.error.cod_interno + '. ' + e.error.mensaje_interno, e.error.Detalle, 'error');
          swal(e.error.mensaje_interno + ' Código de error ' + e.error.cod_interno + '.',  e.error.Detalle , 'error');
          return throwError(e);
        })
      )
  }

  
  

}


