import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantacaoService } from '../services/plantacao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plantacao-edicao',
  templateUrl: './plantacao-edicao.component.html',
  styleUrls: ['./plantacao-edicao.component.css']
})
export class PlantacaoEdicaoComponent implements OnInit {
  plantacaoForm: FormGroup;
  isAgrotoxicoModalOpen: boolean = false;
  isFertilizanteModalOpen: boolean = false;
  imagePreview: { [key: string]: string } = { inicio: '', meio: '', fim: '' };
  plantacoes: any[] = [];
  plantacaoId: any;
  isFinalizarModalOpen: boolean = false;
  dataConclusao: string = '';
  quantidadeObtida: number = 0;
  selectedFertilizanteIndex: number | null = null;
  selectedAgrotoxicoIndex: number | null = null;
  constructor(private fb: FormBuilder, private plantacaoService: PlantacaoService, private route: ActivatedRoute) {
    this.plantacaoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      imagemInicio: [null],
      imagemMeio: [null],
      imagemFim: [null],
      agrotoxicos: this.fb.array([]),
      fertilizantes: this.fb.array([]),
      status: [null],
      dataConclusao: [null],
      quantidadeObtida: [null]
    });
  }
  ngOnInit(): void {
    this.plantacaoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.plantacaoId) {
      this.carregarDadosPlantacao();
    }
  }

  carregarDadosPlantacao() {
    this.plantacaoService.buscarPlantacaoPorId(this.plantacaoId).subscribe(data => {
      this.plantacaoForm.patchValue({
        nome: data.nome,
        descricao: data.descricao,
        imagemInicio: data.imagemInicio,
        imagemMeio: data.imagemMeio,
        imagemFim: data.imagemFim
      });

      this.imagePreview['inicio'] = data.imagemInicio ? `http://localhost:5296${data.imagemInicio}` : '';
      this.imagePreview['meio'] = data.imagemMeio ? `http://localhost:5296${data.imagemMeio}` : '';
      this.imagePreview['fim'] = data.imagemFim ? `http://localhost:5296${data.imagemFim}` : '';

      this.setFormArray('agrotoxicos', data.agrotoxicos);
      this.setFormArray('fertilizantes', data.fertilizantes);
    });
  }

  private async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }



  private setFormArray(field: string, items: any[]) {
    const formArray = this.plantacaoForm.get(field) as FormArray;
    formArray.clear();  

    items.forEach(item => {
      if (field === 'agrotoxicos') {
        formArray.push(this.fb.group({
          nome: [item.nome],
          objetivo: [item.objetivo],
          dataAplicacao: [item.dataAplicacao],
          dosagem: [item.dosagem],  
          descricao: [item.descricao],
          notaResultado: [item.notaResultado],
          tipo: [item.tipo]
        }));
      } else if (field === 'fertilizantes') {
        formArray.push(this.fb.group({
          nome: [item.nome],
          objetivo: [item.objetivo],
          dataAplicacao: [item.dataAplicacao],
          quantidade: [item.quantidade],
          descricao: [item.descricao],
          notaResultado: [item.notaResultado],
          tipo: [item.tipo]
        }));
      }
    });
  }


  addFertilizante(fertilizanteForm: FormGroup) {
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
    this.closeFertilizanteModal();
  }


  removeFertilizante(index: number) {
    this.fertilizantes().removeAt(index);
  }



  addAgrotoxico(agrotoxicoForm: FormGroup) {
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
    this.closeAgrotoxicoModal();
  }

  removeAgrotoxico(index: number) {
    this.agrotoxicos().removeAt(index);
  }



  onFileSelected(event: Event, type: string) {
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

  agrotoxicos(): FormArray { return this.plantacaoForm.get('agrotoxicos') as FormArray; }
  fertilizantes(): FormArray { return this.plantacaoForm.get('fertilizantes') as FormArray; }

  openFertilizanteModal(index: number | null = null) {
    this.selectedFertilizanteIndex = index;
    this.isFertilizanteModalOpen = true;
  }

  openAgrotoxicoModal(index: number | null = null) {
    this.selectedAgrotoxicoIndex = index;
    this.isAgrotoxicoModalOpen = true;
  }

  addOrUpdateFertilizante(fertilizanteForm: FormGroup) {
    if (this.selectedFertilizanteIndex !== null) {
      this.fertilizantes().at(this.selectedFertilizanteIndex).patchValue(fertilizanteForm.value);
    } else {
      this.fertilizantes().push(this.fb.group(fertilizanteForm.value));
    }
    this.closeFertilizanteModal();
  }

  // Adiciona ou atualiza o agrotóxico
  addOrUpdateAgrotoxico(agrotoxicoForm: FormGroup) {
    if (this.selectedAgrotoxicoIndex !== null) {
      this.agrotoxicos().at(this.selectedAgrotoxicoIndex).patchValue(agrotoxicoForm.value);
    } else {
      this.agrotoxicos().push(this.fb.group(agrotoxicoForm.value));
    }
    this.closeAgrotoxicoModal();
  }

  closeFertilizanteModal() {
    this.isFertilizanteModalOpen = false;
    this.selectedFertilizanteIndex = null;
  }

  closeAgrotoxicoModal() {
    this.isAgrotoxicoModalOpen = false;
    this.selectedAgrotoxicoIndex = null;
  }
  onSubmit() {
    const formData = new FormData();

    for (const key of Object.keys(this.plantacaoForm.value)) {
      const value = this.plantacaoForm.value[key];

      if (key.startsWith('imagem') && value instanceof File) {
        formData.append(key, value, value.name); 
      } else if (key.startsWith('imagem') && typeof value === 'string') {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item: any) => formData.append(key, JSON.stringify(item)));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    if (this.plantacaoId) {
      this.plantacaoService.atualizarPlantacao(this.plantacaoId, formData).subscribe(
        response => {
          console.log('Plantação atualizada com sucesso!', response);
        },
        error => {
          console.error('Erro ao atualizar plantação:', error);
        }
      );
    } else {
      this.plantacaoService.registrarPlantacao(formData).subscribe(
        response => {
          console.log('Plantação registrada com sucesso!', response);
          this.plantacaoForm.reset();
        },
        error => {
          console.error('Erro ao registrar plantação:', error);
        }
      );
    }

  }

  finalizarPlantacao() {
    this.isFinalizarModalOpen = true;
  }

  fecharFinalizarModal() {
    this.isFinalizarModalOpen = false;
  }

  getFertilizanteFormGroup(index: number): FormGroup | null {
    const control = this.fertilizantes().at(index);
    return control instanceof FormGroup ? control : null;
  }

  confirmarFinalizacao() {
    this.plantacaoForm.patchValue({
      status: 1,
      dataConclusao: this.dataConclusao,
      quantidadeObtida: this.quantidadeObtida
    });

    // Preparar o formData para enviar ao back-end
    const formData = new FormData();
    Object.entries(this.plantacaoForm.value).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, JSON.stringify(item)));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    this.plantacaoService.atualizarPlantacao(this.plantacaoId, formData).subscribe(
      response => {
        console.log('Plantação finalizada com sucesso!', response);
        this.isFinalizarModalOpen = false;
      },
      error => {
        console.error('Erro ao finalizar plantação:', error);
        this.isFinalizarModalOpen = false;
      }
    );
  }
  getAgrotoxicoFormGroup(index: number): FormGroup | null {
    const control = this.agrotoxicos().at(index);
    return control instanceof FormGroup ? control : null;
  }

  }

