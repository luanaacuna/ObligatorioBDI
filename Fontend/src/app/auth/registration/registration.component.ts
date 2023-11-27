// registration.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.formBuilder.group({
    // Otros campos del formulario
    cedula: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fechaNac: ['', Validators.required],
    fechaVencimiento: [{ value: '', disabled: true }, Validators.required],
    comprobante: [{ value: '', disabled: true }, Validators.required],
    tieneCarneSalud: [null, Validators.required],
    domicilio: ['', Validators.required],
    correoElectronico: ['', [Validators.required, Validators.email]],
    telefonoContacto: ['', Validators.required],
    contraseña: ['', Validators.required],
  });

  logIdCounter = 0;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  get fechaVencimiento() {
    return this.registrationForm.controls.fechaVencimiento;
  }

  get comprobante() {
    return this.registrationForm.controls.comprobante;
  }

  get tieneCarneSalud() {
    return this.registrationForm.controls.tieneCarneSalud;
  }

  register() {
    if (this.registrationForm.valid) {
      const datosFuncionario = {
        ci: this.registrationForm.get('cedula')?.value,
        nombre: this.registrationForm.get('nombre')?.value,
        apellido: this.registrationForm.get('apellido')?.value,
        fecha_nac: this.registrationForm.get('fechaNac')?.value,
        direccion: this.registrationForm.get('domicilio')?.value,
        telefono: this.registrationForm.get('telefonoContacto')?.value,
        email: this.registrationForm.get('correoElectronico')?.value,
        logId: this.logIdCounter,
      };
      console.log('checkpoint 1', datosFuncionario);
      const datosLogin = {
        logId: this.logIdCounter,
        password: this.registrationForm.get('contraseña')?.value,
      };
      console.log('checkpoint 2', datosLogin);
      this.logIdCounter++;
      this.registerService
        .register(datosFuncionario, datosLogin)
        .subscribe((respuesta) => {
          console.log(
            'Registro exitoso y checkpoint 6',
            this.registrationForm.value,
            respuesta
          );
        });
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
