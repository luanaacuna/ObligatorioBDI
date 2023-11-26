import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InicioComponent } from './auth/inicio/inicio.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { OutOfDateComponent } from './pages/out-of-date/out-of-date.component';

/*const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {path:'inicio',component:DashboardComponent},
  { path: 'inicio', component: LoginComponent },
  { path: 'registrar', component: RegistrationComponent },
  { path: 'out-of-date', component: OutOfDateComponent }
];*/

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrationComponent },
  { path: 'out-of-date', component: OutOfDateComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
