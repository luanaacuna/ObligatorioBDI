// inicio.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
    inicioForm = this.formBuilder.group({
    // Otros campos del formulario
    username: ['',Validators.required],
     password: ['',Validators.required],

  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
  }
  


  get username(){
    return this.inicioForm.controls.username;
  }

  get password(){
    return this.inicioForm.controls.password;
  }


  inicio() {
    if (this.inicioForm.valid) {   
      this.router.navigate(['/dashboard']); // Update the path accordingly
    } else {
      this.inicioForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }
  



}
