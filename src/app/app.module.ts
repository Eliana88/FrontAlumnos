//componentes
import { AppComponent } from './app.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { LoginComponent } from './usuarios/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ClimaComponent } from './clima/clima.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormComponent } from './alumnos/form.component';
//otras cosas
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlumnoService } from './alumnos/alumno.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'presencial', component: AlumnosComponent},
  {path: 'presencial/page/:page', component: AlumnosComponent},
  {path: 'presencial/alumnos', component: FormComponent},
  {path: 'presencial/alumnos/:id', component: FormComponent},
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
    PaginatorComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [AlumnoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
