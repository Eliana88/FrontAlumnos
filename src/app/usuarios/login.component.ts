import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import  swal  from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Inicie Sesión"
  usuario: Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal('Login', `Hola ${this.authService.usuario.username}, ya estás autenticad@`, 'info');
      this.router.navigate(['/presencial'])
    }
  }

  login():void {
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal('Error Login', 'Username o Password vacías!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/presencial']);
      swal('Login', `Hola ${usuario.username}, iniciaste sesión`, 'success');
    }, error =>{
      if(error.status == 400){
        swal('Error Login', 'Credenciales inválidas', 'error');
      }
    })

  }

}
