import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../services/clima.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  alerta: string = '';
  alertaTipo: string = 'sem-alerta';

  constructor(private climaService: ClimaService) { }

  ngOnInit() {
    this.climaService.alerta$.subscribe(alerta => {
      this.alerta = alerta;
    });

    this.climaService.alertaTipo$.subscribe(tipo => {
      this.alertaTipo = tipo;
    });
  }
}
