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
        console.log('this.enderecos', this.enderecos)
      },
      error: (err) => {
        console.error(err);
      },
    })
  }
}
