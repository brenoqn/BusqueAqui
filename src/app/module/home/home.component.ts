import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentCard: number = 0;
  items = [
    {
      title: 'Consulta de CEP',
      description: 'Ao consultar o CEP você fica aberto a novas possibilidades.',
    },
    {
      title: 'Cadastro de Endereço',
      description: 'Você pode cadastrar o endereço para futuras buscas.',
    },
    {
      title: 'Classificação',
      description:
        'Identificar endereços como casa, trabalho, academia, igreja, etc.',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  nextCard() {
    if (this.currentCard < this.items.length - 1) {
      this.currentCard++;
    }
  }

  prevCard() {
    if (this.currentCard > 0) {
      this.currentCard--;
    }
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
