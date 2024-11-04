import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cadastroPlantacaoComponent } from './cadastroPlantacao.component';

describe('PrincipalComponent', () => {
  let component: cadastroPlantacaoComponent;
  let fixture: ComponentFixture<cadastroPlantacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [cadastroPlantacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cadastroPlantacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
