// registration.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.formBuilder.group({
    // Otros campos del formulario
    cedula: ['',Validators.required],
    nombreCompleto: ['',Validators.required],
    fechaNac: ['',Validators.required],
    fechaVencimiento: [{ value: '', disabled: true }, Validators.required],   
    comprobante: [{ value: '', disabled: true }, Validators.required],
    tieneCarneSalud: [null,Validators.required],
    domicilio: ['', Validators.required], 
    correoElectronico: ['', [Validators.required, Validators.email]], 
    telefonoContacto: ['', Validators.required] 

  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }
  


  get fechaVencimiento(){
    return this.registrationForm.controls.fechaVencimiento;
  }

  get comprobante(){
    return this.registrationForm.controls.comprobante;
  }

  get tieneCarneSalud(){
    return this.registrationForm.controls.tieneCarneSalud;
  }

  register() {
    if (this.registrationForm.valid) {
      // Lógica de registro aquí
      console.log('Registro exitoso', this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }

  toggleFechaVencimiento() {
    const tieneCarneSaludControl = this.registrationForm.get('tieneCarneSalud');
  
    if (tieneCarneSaludControl && tieneCarneSaludControl.value) {
      this.fechaVencimiento.enable();
      this.comprobante.enable();
    } else {
      this.fechaVencimiento.disable();
      this.comprobante.disable();
    }
  }

}
