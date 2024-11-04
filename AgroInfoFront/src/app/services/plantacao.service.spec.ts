import { TestBed } from '@angular/core/testing';
import { PlantacaoService } from './plantacao.service';


describe('PlantacaoService', () => {
  let service: PlantacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
