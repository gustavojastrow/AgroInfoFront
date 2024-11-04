import { Component, OnInit } from '@angular/core';
import { PlantacaoService } from '../services/plantacao.service';

@Component({
  selector: 'app-plantacoesFinalizadas',
  templateUrl: './plantacoesFinalizadas.component.html',
  styleUrls: ['./plantacoesFinalizadas.component.css']
})
export class PlantacoesFinalizadasComponent implements OnInit {
  plantacoes: any[] = []; 

  constructor(
    private plantacaoService: PlantacaoService,
  ) { }

  ngOnInit(): void {
    this.carregarPlantacoes();
  }

  carregarPlantacoes() {

    this.plantacaoService.buscarPlantacoesFinalizadas().subscribe(data => {
      const baseUrl = 'http://localhost:5296';
      this.plantacoes = data.map((plantacao: any) => ({
        ...plantacao,
        imagemInicio: `${baseUrl}${plantacao.imagemInicio}`,
        imagemMeio: `${baseUrl}${plantacao.imagemMeio}`,
        imagemFim: `${baseUrl}${plantacao.imagemFim}`,
      }));
    });
  }

  mostrarDetalhes(index: number) {
    const plantacao = this.plantacoes[index];
    plantacao.showSubFields = !plantacao.showSubFields; 
  }
}
