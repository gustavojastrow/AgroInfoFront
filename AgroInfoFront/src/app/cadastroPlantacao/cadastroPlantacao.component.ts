import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { PlantacaoService } from '../services/plantacao.service';

@Component({
  selector: 'app-principal',
  templateUrl: './cadastroPlantacao.component.html',
  styleUrls: ['./cadastroPlantacao.component.css']
})
export class cadastroPlantacaoComponent implements OnInit {
  plantacaoForm: FormGroup;
  agrotoxicoForm: FormGroup;
  isAgrotoxicoModalOpen: boolean = false;
  isFertilizanteModalOpen: boolean = false;
  imagePreview: { [key: string]: string } = {
    inicio: '',
    meio: '',
    fim: ''
  };
  constructor(private fb: FormBuilder, private plantacaoService: PlantacaoService) {
    this.plantacaoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      imagemInicio: [null],
      imagemMeio: [null],
      imagemFim: [null],
      agrotoxicos: this.fb.array([]),
      fertilizantes: this.fb.array([]),
      irrigacoes: this.fb.array([]),
    });

    this.agrotoxicoForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    const formData = new FormData();

    for (const key of Object.keys(this.plantacaoForm.value)) {
      const value = this.plantacaoForm.value[key];

      if (key.startsWith('imagem') && value) {
        formData.append(key, value, value.name);
      } else if (Array.isArray(value)) {
        value.forEach((item: any) => formData.append(key, JSON.stringify(item)));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    this.plantacaoService.registrarPlantacao(formData).pipe(
      catchError(error => {
        console.error('Erro ao registrar plantação', error);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        console.log('Plantação registrada com sucesso!', response);
        this.plantacaoForm.reset();
      }
    });
  }


  selecionarArquivo(event: Event, type: string) {
    const fileInput = event.target as HTMLInputElement;
    const previewTypeMap: { [key: string]: 'inicio' | 'meio' | 'fim' } = {
      imagemInicio: 'inicio',
      imagemMeio: 'meio',
      imagemFim: 'fim'
    };
    const previewType = previewTypeMap[type];

    if (fileInput.files && fileInput.files[0] && previewType) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview[previewType] = reader.result as string;
      };

      reader.readAsDataURL(file);
      this.plantacaoForm.patchValue({ [type]: file });
    }
  }

  // Agrotóxicos
  agrotoxicos(): FormArray {
    return this.plantacaoForm.get('agrotoxicos') as FormArray;
  }

  adicionarAgrotoxico(agrotoxicoForm: FormGroup) {
    const novoAgrotoxico = this.fb.group({
      nome: agrotoxicoForm.get('nome')?.value,
      objetivo: agrotoxicoForm.get('objetivo')?.value,
      dataAplicacao: agrotoxicoForm.get('dataAplicacao')?.value,
      dosagem: agrotoxicoForm.get('dosagem')?.value,
      descricao: agrotoxicoForm.get('descricao')?.value,
      notaResultado: agrotoxicoForm.get('notaResultado')?.value,
      tipo: agrotoxicoForm.get('tipo')?.value,
    });
    this.agrotoxicos().push(novoAgrotoxico);
    this.fecharAgrotoxicoModal();
  }

  removerAgrotoxico(index: number) {
    this.agrotoxicos().removeAt(index);
  }

  abrirAgrotoxicoModal() {
    this.isAgrotoxicoModalOpen = true;
  }

  fecharAgrotoxicoModal() {
    this.isAgrotoxicoModalOpen = false;
  }

  // Fertilizantes
  fertilizantes(): FormArray {
    return this.plantacaoForm.get('fertilizantes') as FormArray;
  }

  abrirFertilizanteModal() {
    this.isFertilizanteModalOpen = true;
  }

  fecharFertilizanteModal() {
    this.isFertilizanteModalOpen = false;
  }

  adicionarFertilizante(fertilizanteForm: FormGroup) {
    const novoFertilizante = this.fb.group({
      nome: fertilizanteForm.get('nome')?.value,
      objetivo: fertilizanteForm.get('objetivo')?.value,
      dataAplicacao: fertilizanteForm.get('dataAplicacao')?.value,
      quantidade: fertilizanteForm.get('quantidade')?.value,
      descricao: fertilizanteForm.get('descricao')?.value,
      notaResultado: fertilizanteForm.get('notaResultado')?.value,
      tipo: fertilizanteForm.get('tipo')?.value,
    });
    this.fertilizantes().push(novoFertilizante);
    this.fecharFertilizanteModal();
  }

  removerFertilizante(index: number) {
    this.fertilizantes().removeAt(index);
  }
}
