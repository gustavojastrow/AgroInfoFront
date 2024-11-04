import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClimaService } from './services/clima.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AgroInfo';
  private intervaloAtualizacao: any;

  constructor(private climaService: ClimaService) { }

  ngOnInit() {
    this.usarLocalizacao();

    this.intervaloAtualizacao = setInterval(() => {
      this.usarLocalizacao();
    }, 3 * 60 * 60 * 1000); // 3 horas = 10800000 ms
  }

  usarLocalizacao(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.climaService.buscarClimaLocalizacao(latitude, longitude).subscribe();
          this.climaService.buscarPrevisao3hrs(latitude, longitude).subscribe();
        },
        (error) => {
          console.error('Erro ao obter localização: ', error);
        }
      );
    } else {
      console.error('Geolocalização não é suportada neste navegador.');
    }
  }

  ngOnDestroy() {
    // Limpa o intervalo ao destruir o componente para evitar vazamentos de memória
    if (this.intervaloAtualizacao) {
      clearInterval(this.intervaloAtualizacao);
    }
  }
}
