import { Component, OnInit } from '@angular/core';
import { PlantacaoService } from '../services/plantacao.service';
import { ClimaService } from '../services/clima.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantacoes',
  templateUrl: './plantacoes.component.html',
  styleUrls: ['./plantacoes.component.css']
})
export class PlantacoesComponent implements OnInit {
  plantacoes: any[] = [];
  currentDate: Date | undefined;

  constructor(private plantacaoService: PlantacaoService, private climaService: ClimaService, private router: Router) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.carregarPlantacoes();

  }

  carregarPlantacoes() {

    this.plantacaoService.buscarPlantacoesAtivas().subscribe(data => {
      const baseUrl = 'http://localhost:5296';
      this.plantacoes = data.map((plantacao: any) => ({
        ...plantacao,
        imagemInicio: `${baseUrl}${plantacao.imagemInicio}`,
        imagemMeio: `${baseUrl}${plantacao.imagemMeio}`,
        imagemFim: `${baseUrl}${plantacao.imagemFim}`,
      }));
    });
  }

  editPlantacao(index: number) {
    const plantacao = this.plantacoes[index];
    console.log('Editando:', plantacao);
    this.router.navigate(['/plantacaoEditar', plantacao.id]);
  }

  deletePlantacao(index: number) {
    const plantacao = this.plantacoes[index];
    if (confirm('Tem certeza que deseja excluir esta plantação?')) {
      this.plantacaoService.excluirPlantacao(plantacao.id).subscribe({
        next: () => {
          this.plantacoes.splice(index, 1);
          console.log('Plantação excluída:', plantacao.id);
        },
        error: (err) => {
          console.error('Erro ao excluir a plantação:', err);
        }
      });
    }
  }


  mostrarDetalhes(index: number) {
    this.plantacoes[index].showSubFields = !this.plantacoes[index].showSubFields;
  }
}
