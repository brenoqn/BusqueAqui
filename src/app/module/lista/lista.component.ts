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
    this.service.getEnderecos().subscribe({
      next: (res: any) => {
        this.enderecos = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  apagarEndereco(endereco: Enderecos) {
    this.service.apagarEndereco(endereco.id).subscribe({
      next: () => {
        this.enderecos = this.enderecos.filter(
          (item) => item.id !== endereco.id
        );
      },
      error: (err) => {
        console.error('Erro ao apagar endereço:', err);
      },
    });
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
    endereco.editando = false;
    this.service.atualizarEndereco(endereco).subscribe({
      next: () => {
        console.log('Endereço atualizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao atualizar endereço:', err);
      },
    });
  }
}
