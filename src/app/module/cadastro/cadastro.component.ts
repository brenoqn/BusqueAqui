import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Enderecos } from 'src/app/services/enderecos';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { ViaCepService } from 'src/app/services/via-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  enderecoForm!: FormGroup;
  endereco: Enderecos = {};

  constructor(
    private fb: FormBuilder,
    private service: ViaCepService,
    private enderecoService: EnderecosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      numero: [''],
      complemento: [''],
      categoria: ['casa'],
      outraCategoria: [''],
    });
    this.listenCategoriaChanges();
  }

  listenCategoriaChanges() {
    this.enderecoForm.get('categoria')?.valueChanges.subscribe((categoria) => {
      if (categoria === 'outros') {
        this.enderecoForm.get('outraCategoria');
      } else {
        this.enderecoForm.get('outraCategoria')?.clearValidators();
      }
      this.enderecoForm.get('outraCategoria')?.updateValueAndValidity();
    });
  }

  buscarEndereco() {
    const cep = this.enderecoForm.get('cep')?.value;
    this.limparCamposEndereco();
    if (this.enderecoForm.get('cep')?.valid) {
      this.service.getCep(cep).subscribe({
        next: (res: Enderecos) => {
          this.endereco = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      console.log('CEP inválido. Preencha corretamente.');
    }
  }

  salvarEndereco() {
    if (this.enderecoForm.valid) {
      const numero = this.enderecoForm.get('numero')?.value;
      const complemento = this.enderecoForm.get('complemento')?.value;

      const novoEndereco: Enderecos = {
        logradouro: this.endereco.logradouro || '',
        localidade: this.endereco.localidade || '',
        uf: this.endereco.uf || '',
        numero: numero || '',
        bairro: this.endereco.bairro || '',
        cep: this.endereco.cep || '',
        complemento: complemento || '',
        ddd: this.endereco.ddd || '',
        gia: this.endereco.gia || '',
        ibge: this.endereco.ibge || '',
        siafi: this.endereco.siafi || '',
      };

      this.enderecoService.postEndereco(novoEndereco).subscribe({
        next: (res) => {
          console.log('Endereço adicionado com sucesso!', res);
          this.router.navigate(['/lista']);
        },
        error: (err) => {
          console.error('Erro ao adicionar endereço:', err);
        },
      });
    } else {
      console.log('Formulário inválido. Preencha corretamente.');
    }
  }

  limparCamposEndereco() {
    this.endereco = {};
  }
}
