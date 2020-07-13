//componentes
import { AppComponent } from './app.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { LoginComponent } from './usuarios/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ClimaComponent } from './clima/clima.component';
import { FormComponent } from './alumnos/form.component';
//otras cosas
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlumnoService } from './alumnos/alumno.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FilterPipe } from './alumnos/filter.pipe';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'presencial', component: AlumnosComponent},
  {path: 'presencial/page/:page', component: AlumnosComponent},
  {path: 'presencial/alumnos', component: FormComponent, canActivate:[RoleGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'presencial/alumnos/:id', component: FormComponent, canActivate:[RoleGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'presencial/login', component: LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    FormComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ClimaComponent,
    FilterPipe,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatPaginatorModule

  ],
  providers: [AlumnoService,
    {provide:  HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide:  HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
