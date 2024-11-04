import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlantacoesComponent } from './plantacoes/plantacoes.component';
import { WeatherComponent } from './weather/weather.component';
import { PlantacoesFinalizadasComponent } from './plantacoesFinalizadas/plantacoesFinalizadas.component';
import { cadastroPlantacaoComponent } from './cadastroPlantacao/cadastroPlantacao.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AgrotoxicoModalComponent } from './modals/agrotoxico-modal/agrotoxico-modal.component';
import { FertilizanteModalComponent } from './modals/fertilizante-modal/fertilizante-modal.component';
import { PlantacaoEdicaoComponent } from './plantacao-edicao/plantacao-edicao.component';

@NgModule({
  declarations: [
    AppComponent,
    cadastroPlantacaoComponent,
    PlantacoesComponent,
    WeatherComponent,
    PlantacoesFinalizadasComponent,
    NavbarComponent,
    AgrotoxicoModalComponent,
    FertilizanteModalComponent,
    PlantacaoEdicaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
