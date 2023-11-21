import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrationComponent } from './auth/registration/registration.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
 // {path:'inicio',component:DashboardComponent},
  {path:'inicio',component:LoginComponent},
  { path: 'registrar', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
