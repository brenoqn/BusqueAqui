import { Component, OnInit } from '@angular/core';
import { Enderecos } from 'src/app/services/enderecos';
import { EnderecosService } from 'src/app/services/enderecos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  enderecos: Enderecos[] = [];

  constructor(private service: EnderecosService) {}

  ngOnInit() {
    this.enderecos = [
      {
        bairro: 'Vigilato Pereira',
        cep: '38408-628',
        complemento: '',
        ddd: '34',
        gia: '',
        ibge: '3170206',
        localidade: 'Uberlândia',
        logradouro: 'Rua Pedro Formoso',
        siafi: '5403',
        uf: 'MG',
        numero: '435',
        categoria: 'Casa'
      },
      {
        cep: '38412-192',
        logradouro: 'Rua dos Alecrins',
        complemento: 'Fundos',
        bairro: 'Cidade Jardim',
        localidade: 'Uberlândia',
        uf: 'MG',
        ibge: '3170206',
        gia: '',
        ddd: '34',
        siafi: '5403',
        numero: '268',
        categoria: 'Casa'
      },
    ];
    console.log('this.enderecos', this.enderecos);
    // this.service.getEnderecos().subscribe({
    //   next: (res: any) => {},
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
  }


  apagarEndereco(endereco: Enderecos) {
    // Implemente a lógica para apagar o endereço
    console.log('Apagar endereço:', endereco);
  }

  editarEndereco(endereco: Enderecos) {
    endereco.editando = true;
  }

  alternarModoEdicao(index: number) {
    this.enderecos[index].editando = !this.enderecos[index].editando;
  }

  cancelarEdicao(index: number) {
    this.enderecos[index].editando = false;
  }

  salvarEdicao(endereco: Enderecos) {
    console.log('Salvar endereço:', endereco);
    endereco.editando = false;
  }
}
