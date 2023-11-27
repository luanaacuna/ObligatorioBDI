import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fecha-carne',
  templateUrl: './fecha-carne.component.html',
  styleUrls: ['./fecha-carne.component.css']
})
export class FechaCarneComponent implements OnInit {
  fechaSeleccionada: Date = new Date();;
  fechaInicio: Date = new Date('2023-11-01');
  fechaFin: Date = new Date('2023-11-29'); //le puse 29 porque si dejaba en 15 no podia verlo, cuando este todo lo cambiamos a 15
  periodoFinalizado: boolean = false;

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
  }
}
