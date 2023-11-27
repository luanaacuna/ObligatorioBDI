import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private url = 'http://localhost:3307';

  constructor(private http: HttpClient) {}

  register(datosUsuario: any, datosLogin: any): Observable<any> {
    console.log('checkpoint 3', datosUsuario);
    console.log('checkpoint 4', datosLogin);
    const urlFinal = `${this.url}/funcionarios`;
    return this.http.post<any>(urlFinal, { datosUsuario, datosLogin });
  }
}
