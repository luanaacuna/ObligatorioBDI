import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FechaService {
  puerto = 3000;

  constructor(private http: HttpClient) {}

  async getFecha(): Promise<Observable<Date>> {
    const url = `http://localhost:${this.puerto}/fecha`;
    return this.http.get<Date>(url);
  }
}
