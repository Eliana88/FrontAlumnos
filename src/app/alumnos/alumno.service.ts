import { Injectable } from '@angular/core';
import { Alumno } from './alumno';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable()
export class AlumnoService {

  private urlEndPoint:string = 'http://localhost:8080/presencial/alumnos';
  //private urlEndPoint:string = 'https://app-alumnos-irso.herokuapp.com/presencial/alumnos';
  private urlEndPointEmail:string = 'http://localhost:8080/presencial/alumnos/emails';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
      }
    return this.httpHeaders;
  }


  private isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/presencial/login']);
      return true;
    }

    if (e.status == 403) {
      swal('Acceso denegado', `${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/presencial']);
      return true;
    }
    return false;
  }

  getAlumnos(): Observable<Alumno[]>{
  //  return of(ALUMNOS);
    return this.http.get<Alumno[]>(this.urlEndPoint);
  }

  create(alumno: Alumno): Observable<Alumno>{
    return this.http.post<Alumno>(this.urlEndPoint, alumno,
      {headers: this.agregarAuthorizationHeader()})
        .pipe(
            map((response: any) => response.alumno as Alumno),
              catchError(e => {
                  if(this.isNoAutorizado(e)){
                      return throwError(e);
                    }
                    if(e.status == 400){
                      return throwError(e);
                    }
                    console.error(e.error.mensaje);
                    swal(e.error.mensaje, e.error.error, 'error');
                    return throwError(e);
                  })
                )
              }

  getAlumno(id): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.urlEndPoint}/id=${id}`,
      {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/presencial']);
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getAlumnoByEmail(email): Observable<Alumno>{
    return this.http.get<Alumno>(`${this.urlEndPointEmail}/email=${email}`,
      {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(e);
          }
        this.router.navigate(['/presencial']);
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  update(alumno: Alumno): Observable<Alumno>{
    return this.http.put<Alumno>(`${this.urlEndPoint}/${alumno.id}`, alumno,
      {headers: this.agregarAuthorizationHeader()}).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(e);
        }
        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Alumno> {
    return this.http.delete<Alumno>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
