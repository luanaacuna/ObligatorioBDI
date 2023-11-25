import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'app-out-of-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './out-of-date.component.html',
  styleUrls: ['./out-of-date.component.css']
})
export class OutOfDateComponent {
    fechaNueva :any;

    constructor(private fechaService: FechaService) {}

    async ngOnInit(): Promise<void>{
      this.fechaNueva = await (await this.fechaService.getFecha())
    }
    
}