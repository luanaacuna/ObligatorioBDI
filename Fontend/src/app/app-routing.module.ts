import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InicioComponent } from './auth/inicio/inicio.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { OutOfDateComponent } from './pages/out-of-date/out-of-date.component';
import { FechaCarneComponent } from './fecha-carne/fecha-carne.component';
import { RegistroExitosoComponent } from './registro-exitoso/registro-exitoso.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrationComponent },
  { path: 'out-of-date', component: OutOfDateComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'fecha', component: FechaCarneComponent },
  { path: 'registro-exitoso', component: RegistroExitosoComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
