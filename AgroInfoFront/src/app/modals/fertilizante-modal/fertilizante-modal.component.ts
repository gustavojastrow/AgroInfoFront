import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fertilizante-modal',
  templateUrl: './fertilizante-modal.component.html',
  styleUrls: ['./fertilizante-modal.component.css']
})
export class FertilizanteModalComponent implements OnChanges {
  @Input() fertilizanteData: FormGroup | null = null; 
  @Output() save = new EventEmitter<FormGroup>();
  @Output() close = new EventEmitter<void>();

  fertilizanteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fertilizanteForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      objetivo: [''],
      dataAplicacao: [null],
      quantidade: [''],
      resultado: [''],
      notaResultado: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fertilizanteData'] && this.fertilizanteData) {
      this.fertilizanteForm.patchValue(this.fertilizanteData.value);
    }
  }

  salvar() {
    this.save.emit(this.fertilizanteForm);
    this.fertilizanteForm.reset();
  }

  fechar() {
    this.close.emit();
  }
}
