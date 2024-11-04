import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrotoxicoModalComponent } from './agrotoxico-modal.component';

describe('AgrotoxicoModalComponent', () => {
  let component: AgrotoxicoModalComponent;
  let fixture: ComponentFixture<AgrotoxicoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrotoxicoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrotoxicoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
