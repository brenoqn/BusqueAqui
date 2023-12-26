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
  sucess: boolean = false;

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
      categoria: [''],
    });
  }

  buscarEndereco() {
    const cep = this.enderecoForm.get('cep')?.value;
    if (this.enderecoForm.get('cep')?.valid) {
      this.service.getCep(cep).subscribe({
        next: (res: Enderecos) => {
          this.endereco = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  salvarEndereco() {
    if (this.enderecoForm.valid) {
      let numero = this.enderecoForm.get('numero')?.value;
      let complemento = this.enderecoForm.get('complemento')?.value;
      let categoria = this.enderecoForm.get('categoria')?.value;

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
        categoria: categoria || '',
      };

      this.enderecoService.postEndereco(novoEndereco).subscribe({
        next: () => {
          this.sucess = true;
          setTimeout(() => {
            this.router.navigate(['/lista']);
          }, 3000);
        },
        error: (err) => {
          console.error('Erro ao adicionar endereço:', err);
        },
      });
    }
  }
}
