import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agrotoxico-modal',
  templateUrl: './agrotoxico-modal.component.html',
  styleUrls: ['./agrotoxico-modal.component.css']
})
export class AgrotoxicoModalComponent implements OnChanges {

  @Input() agrotoxicoData: FormGroup | null = null;
  @Output() save = new EventEmitter<FormGroup>();
  @Output() close = new EventEmitter<void>();

  agrotoxicoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.agrotoxicoForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      objetivo: [''],
      dataAplicacao: [null],
      dosagem: [''],
      descricao: [''],
      notaResultado: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agrotoxicoData'] && this.agrotoxicoData) {
      this.agrotoxicoForm.patchValue(this.agrotoxicoData.value);
    }
  }

  salvar() {
    this.save.emit(this.agrotoxicoForm);
    this.agrotoxicoForm.reset();
  }

  fechar() {
    this.close.emit();
  }
}
