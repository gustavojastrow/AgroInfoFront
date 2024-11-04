import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantacoesComponent } from './plantacoes.component';

describe('PlantacoesComponent', () => {
  let component: PlantacoesComponent;
  let fixture: ComponentFixture<PlantacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
