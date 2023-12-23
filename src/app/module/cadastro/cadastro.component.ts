import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViaCepService } from 'src/app/services/via-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  enderecoForm!: FormGroup;
  endereco: any = {};

  constructor(private fb: FormBuilder, private service: ViaCepService) {}

  ngOnInit() {
    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    });
  }

  buscarEndereco() {
    if (this.enderecoForm.valid) {
      const cep = this.enderecoForm.get('cep')?.value;
      this.service.getCep(cep).subscribe({
        next: (res: any) => {
          this.endereco = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      console.log('Formulário inválido. Preencha corretamente.');
    }
  }
}
