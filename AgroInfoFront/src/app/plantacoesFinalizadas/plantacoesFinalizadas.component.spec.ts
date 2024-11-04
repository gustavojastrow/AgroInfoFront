import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantacoesFinalizadasComponent } from './plantacoesFinalizadas.component';

describe('PlantacoesFinalizadasComponent', () => {
  let component: PlantacoesFinalizadasComponent;
  let fixture: ComponentFixture<PlantacoesFinalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantacoesFinalizadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantacoesFinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
