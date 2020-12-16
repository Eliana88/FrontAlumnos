import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor( private authService: AuthService,
    private router: Router){
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authService.isAuthenticated()){
        this.router.navigate(['/presencial/login']);
        return false;
      }

      let role = next.data['role'] as string;
      if(this.authService.hasRole(role)){
        if(this.isTokenExperidado()){
          this.authService.logout();
          this.router.navigate(['presencial/login']);
          return false;
        }
        return true;
      }
      swal('Acceso denegado', `${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/presencial']);
      return false;
  }

  isTokenExperidado(): boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;

    if(payload.exp < now){
      return true;
    }
    return false;


  }
  
}
