// registro-exitoso.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.component.html',
  styleUrls: ['./registro-exitoso.component.css'],
})
export class RegistroExitosoComponent implements OnInit {
  fechaRegistro: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.fechaRegistro = new Date(params['fechaRegistro']).toISOString();
    });
    
  }
}
