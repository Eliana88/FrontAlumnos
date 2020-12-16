import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title:string = "IRSO Presencial";

  constructor(public authService: AuthService, public router: Router){
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal('Hasta pronto', `Adios ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['presencial/login']);
  }

}
