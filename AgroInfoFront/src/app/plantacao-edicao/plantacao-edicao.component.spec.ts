import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantacaoEdicaoComponent } from './plantacao-edicao.component';

describe('PlantacaoEdicaoComponent', () => {
  let component: PlantacaoEdicaoComponent;
  let fixture: ComponentFixture<PlantacaoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantacaoEdicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantacaoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
