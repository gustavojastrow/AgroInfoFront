import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { cadastroPlantacaoComponent } from './cadastroPlantacao/cadastroPlantacao.component';
import { PlantacoesComponent } from './plantacoes/plantacoes.component';
import { WeatherComponent } from './weather/weather.component';
import { PlantacoesFinalizadasComponent } from './plantacoesFinalizadas/plantacoesFinalizadas.component';
import { PlantacaoEdicaoComponent } from './plantacao-edicao/plantacao-edicao.component';

const routes: Routes = [
  { path: 'criarPlantacao', component: cadastroPlantacaoComponent },
  { path: 'plantacaoAtiva', component: PlantacoesComponent },
  { path: 'plantacaoEditar/:id', component: PlantacaoEdicaoComponent },
  { path: 'plantacaoFinalizada', component: PlantacoesFinalizadasComponent },
  { path: 'previsaoTempo', component: WeatherComponent }, 

  { path: '', redirectTo: '/plantacaoAtiva', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
