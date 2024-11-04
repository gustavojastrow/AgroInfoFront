import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private apiUrl = 'https://localhost:7144/Alerta/EnviarAlerta'; 

  constructor(private http: HttpClient) { }

  enviarAlerta(phoneNumber: string, message: string): Observable<any> {
    const body = { phoneNumber, message };
    return this.http.post(this.apiUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
