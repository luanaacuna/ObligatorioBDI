import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  verFechaVenc : boolean = false;

  loginError:string="";
  loginForm=this.formBuilder.group({
    cedula: ['',Validators.required],
    nombreCompleto: ['',Validators.required],
    fechaNac: ['',Validators.required],
    fechaVencimiento: [{ value: '', disabled: true }, Validators.required],   
    tieneCarneSalud: [null,Validators.required],
    comprobante: [{ value: '', disabled: true }, Validators.required],
   // email:['',[Validators.required,Validators.email]],
    //password: ['',Validators.required],

  })

  
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm.get('tieneCarneSalud')?.valueChanges.subscribe((value) => {

    
    });
  }

  get cedula(){
    return this.loginForm.controls.cedula;
  }

  get nombreCompleto(){
    return this.loginForm.controls.nombreCompleto;
  }

  get fechaNac(){
    return this.loginForm.controls.fechaNac;
  }

  get fechaVencimiento(){
    return this.loginForm.controls.fechaVencimiento;
  }

  get comprobante(){
    return this.loginForm.controls.comprobante;
  }

  get tieneCarneSalud(){
    return this.loginForm.controls.tieneCarneSalud;
  }

 /* get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }*/

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({

        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        /*complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/registrar');
          this.loginForm.reset();
        }*/
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

 // toggleFechaVencimiento() {}

 toggleFechaVencimiento() {
  const tieneCarneSaludControl = this.loginForm.get('tieneCarneSalud');

  if (tieneCarneSaludControl && tieneCarneSaludControl.value) {
    this.fechaVencimiento.enable();
    this.comprobante.enable();
  } else {
    this.fechaVencimiento.disable();
    this.comprobante.disable();
  }
}



}
