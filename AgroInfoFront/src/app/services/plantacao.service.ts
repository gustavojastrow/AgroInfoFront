import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantacaoService {
  private apiUrl = 'https://localhost:7144/Plantacao'

  constructor(private http: HttpClient) { }

  buscarPlantacaoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscarPlantacao/${id}`);
  }

  registrarPlantacao(formData: FormData): Observable<any> {
    const endpoint = '/registrarPlantacao'; 
    return this.http.post(this.apiUrl + endpoint, formData);
  }

  buscarPlantacoesAtivas(): Observable<any[]> {
    const endpoint = '/buscarPlantacoesAtivas'; 
    return this.http.get<any[]>(this.apiUrl + endpoint);
  }

  buscarPlantacoesFinalizadas(): Observable<any[]> {
    const endpoint = '/buscarPlantacoesFinalizadas';
    return this.http.get<any[]>(this.apiUrl + endpoint);
  }
  atualizarPlantacao(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/atualizarPlantacao/${id}`, formData);
  }

  excluirPlantacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/excluirPlantacao/${id}`);
  }

}
