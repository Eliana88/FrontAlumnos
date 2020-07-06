import { Injectable } from '@angular/core';
import { Alumno } from './alumno';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { URL_BACKEND } from '../config/config';


@Injectable()
export class AlumnoService {

  //URL DESA
  //private urlEndPoint:string = 'http://localhost:8080/api/alumnos';
  
  //URL PROD
  private urlEndPoint:string = URL_BACKEND + 'api/alumnos';
  
  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }


//Se eliminó este método ya que la cabeceras se envian con INTERCEPTOR

 //con los guards verifica que este autenticado antes de llamar al back
//se crea además la clase interceptora para estos codigos: 401, 403.


  //----- metodos http-----------//

  listarAlumnos(page: string, size: string): Observable<any>{
    const params = new HttpParams() //inmutable
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(this.urlEndPoint, {params: params});
  }

  create(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.urlEndPoint, alumno)
      .pipe(
        map((response: any) => response.alumno as Alumno),
        catchError(e => {

          console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(e);
        })
      )
  }

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


  update(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.urlEndPoint}/${alumno.id}`, alumno)
      .pipe(
        map((response: any) => response.alumno as Alumno),
        catchError(e => {

          console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(e);

        })
      )
  }

  delete(id: number): Observable<Alumno> {
    return this.http.delete<Alumno>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        console.error(e.error.message);
        swal(e.error.message, e.error.error, 'error');
        return throwError(e);

      })
    );
  }

}
