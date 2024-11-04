import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey: string = 'fc083b1fcb9719681f4c65c449edb8f1';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  private climaSubject = new BehaviorSubject<any>(null);
  clima$ = this.climaSubject.asObservable();

  private previsaoSubject = new BehaviorSubject<any>(null);
  previsao$ = this.previsaoSubject.asObservable();

  private alertaSubject = new BehaviorSubject<string>('Nenhum alerta no momento');
  alerta$ = this.alertaSubject.asObservable();

  private alertaTipoSubject = new BehaviorSubject<string>('sem-alerta');
  alertaTipo$ = this.alertaTipoSubject.asObservable();

  constructor(private http: HttpClient) { }

  buscarClimaLocalizacao(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`;
    return this.http.get(url).pipe(
      tap(data => {
        this.climaSubject.next(data);
        this.gerarAlerta(); // Atualiza o alerta quando o clima é carregado
      })
    );
  }

  buscarPrevisao3hrs(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`;
    return this.http.get(url).pipe(
      tap(data => {
        this.previsaoSubject.next(data);
        this.gerarAlerta(); // Atualiza o alerta quando a previsão é carregada
      })
    );
  }

  atualizarAlerta(mensagem: string, tipo: string): void {
    this.alertaSubject.next(mensagem);
    this.alertaTipoSubject.next(tipo);
  }

  gerarAlerta(): void {
    const climaData = this.climaSubject.getValue();
    const previsaoData = this.previsaoSubject.getValue();

    if (!climaData || !previsaoData || !previsaoData.list || !previsaoData.list.length) {
      this.atualizarAlerta('Nenhum alerta no momento', 'sem-alerta');
      return;
    }

    const temp = climaData.main.temp;
    const condicaoAtual = climaData.weather[0].main.toLowerCase();

    const previsaoChuva = previsaoData.list.some((forecast: any) =>
      forecast.weather.some((w: any) => w.main.toLowerCase().includes('rain')) ||
      (forecast.pop && forecast.pop >= 0.5) // 50% ou mais de chance de chuva
    );

    const primeiraPrevisaoChuva = previsaoData.list.find((forecast: any) =>
      forecast.weather.some((w: any) => w.main.toLowerCase().includes('rain')) ||
      (forecast.pop && forecast.pop >= 0.5)
    );


    if (condicaoAtual.includes('rain') || previsaoChuva) {
      const horarioPrevisao = primeiraPrevisaoChuva
        ? new Date(primeiraPrevisaoChuva.dt * 1000).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'atualmente';

      const tempPrevisao = primeiraPrevisaoChuva ? primeiraPrevisaoChuva.main.temp : temp;
      const condicaoPrevisao = primeiraPrevisaoChuva
        ? (primeiraPrevisaoChuva.weather[0].description + `: ${(primeiraPrevisaoChuva.pop * 100).toFixed(0)}% de chance`)
        : 'chuva';

      this.atualizarAlerta(`Alerta: Previsão de ${condicaoPrevisao} em ${horarioPrevisao}. Temperatura prevista: ${tempPrevisao}°C.`, 'chuva');
    } else if (temp >= 35) {
      this.atualizarAlerta('Alerta: Onda de calor! Tome medidas para proteger as plantações.', 'calor');
    } else if (temp <= 5) {
      this.atualizarAlerta('Alerta: Frio intenso! Proteja suas plantações contra baixas temperaturas.', 'frio');
    } else {
      this.atualizarAlerta('Nenhum alerta no momento', 'sem-alerta');
    }
  }
}
