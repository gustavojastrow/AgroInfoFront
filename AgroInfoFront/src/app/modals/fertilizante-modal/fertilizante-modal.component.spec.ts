import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizanteModalComponent } from './fertilizante-modal.component';

describe('FertilizanteModalComponent', () => {
  let component: FertilizanteModalComponent;
  let fixture: ComponentFixture<FertilizanteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FertilizanteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FertilizanteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
