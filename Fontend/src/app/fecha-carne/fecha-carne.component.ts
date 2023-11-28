import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fecha-carne',
  templateUrl: './fecha-carne.component.html',
  styleUrls: ['./fecha-carne.component.css'],
})
export class FechaCarneComponent implements OnInit {
  fechaSeleccionada: Date = new Date();
  fechaInicio: Date = new Date('2023-11-01');
  fechaFin: Date = new Date('2023-11-29');
  periodoFinalizado: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.verificarPeriodo();
  }

  verificarPeriodo() {
    const fechaActual = new Date();
    if (fechaActual < this.fechaInicio || fechaActual > this.fechaFin) {
      this.periodoFinalizado = true;
    }
  }

  agendar() {

    console.log('Fecha Agendada:', this.fechaSeleccionada);
    this.router.navigate(['/registro-exitoso']);

    // Navegar a la página de registro exitoso con la fecha de registro
    
  }
  
}
