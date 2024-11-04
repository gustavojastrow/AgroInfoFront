import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../services/clima.service';
import { AlertaService } from '../services/alerta.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  climaData: any;
  previsaoData: { list: any[] } = { list: [] };
  messageAlerta: string = '';
  alertaTipo: string = 'sem-alerta';

  private climaDataCarregado = false;
  private previsaoDataCarregado = false;

  constructor(private climaService: ClimaService, private alertaService: AlertaService) { }

  ngOnInit() {
    this.climaService.clima$.subscribe(data => {
      this.climaData = data;
      this.climaDataCarregado = true;
      this.verificarDadosCarregados();
    });

    this.climaService.previsao$.subscribe(data => {
      this.previsaoData = data;
      this.previsaoDataCarregado = true;
      this.verificarDadosCarregados();
    });

    this.climaService.alerta$.subscribe(alerta => {
      this.messageAlerta = alerta;
    });

    this.climaService.alertaTipo$.subscribe(tipo => {
      this.alertaTipo = tipo;
    });
  }

  verificarDadosCarregados(): void {
    // Só executa `checarAlertas()` se ambos os dados estiverem carregados
    if (this.climaDataCarregado && this.previsaoDataCarregado) {
      this.checarAlertas();
    }
  }

  checarAlertas(): void {
    if (!this.climaData || !this.previsaoData || !this.previsaoData.list || !this.previsaoData.list.length) {
      console.warn('Dados de previsão de clima estão indisponíveis ou incompletos.');
      return;
    }

    const temp = this.climaData?.main.temp;
    const condicaoAtual = this.climaData?.weather[0].main.toLowerCase();

    const previsaoChuva = this.previsaoData.list.some(forecast =>
      forecast.weather.some((w: any) => w.main.toLowerCase().includes('rain')) ||
      (forecast.pop && forecast.pop >= 0.5) 
    );

    const primeiraPrevisaoChuva = this.previsaoData.list.find(forecast =>
      forecast.weather.some((w: any) => w.main.toLowerCase().includes('rain')) ||
      (forecast.pop && forecast.pop >= 0.5)
    );

    if (condicaoAtual?.includes('rain') || previsaoChuva) {
      const horarioPrevisao = primeiraPrevisaoChuva
        ? new Date(primeiraPrevisaoChuva.dt * 1000).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'atualmente';

      const tempPrevisao = primeiraPrevisaoChuva ? primeiraPrevisaoChuva.main.temp : temp;
      const condicaoPrevisao = primeiraPrevisaoChuva
        ? (primeiraPrevisaoChuva.weather[0].description + `: ${(primeiraPrevisaoChuva.pop * 100).toFixed(0)}% de chance`)
        : 'chuva';

      this.messageAlerta = `Alerta: Previsão de ${condicaoPrevisao} em ${horarioPrevisao}. Temperatura prevista: ${tempPrevisao}°C.`;
      this.alertaTipo = 'chuva';
    } else if (temp >= 35) {
      this.messageAlerta = 'Alerta: Onda de calor! Tome medidas para proteger as plantações.';
      this.alertaTipo = 'calor';
    } else if (temp <= 5) {
      this.messageAlerta = 'Alerta: Frio intenso! Proteja suas plantações contra baixas temperaturas.';
      this.alertaTipo = 'frio';
    } else {
      this.messageAlerta = 'Não há alertas climáticos no momento.';
      this.alertaTipo = 'sem-alerta';
    }

    // Atualiza o alerta na interface
    this.climaService.atualizarAlerta(this.messageAlerta, this.alertaTipo);

    // Envia o alerta via WhatsApp se houver uma condição relevante
    if (this.alertaTipo !== 'sem-alerta') {
      this.alertaService.enviarAlerta('+5527997998439', this.messageAlerta).subscribe({
        next: () => console.log('Alerta enviado com sucesso!'),
        error: (error) => console.error('Erro ao enviar alerta:', error)
      });
    }
  }
}
