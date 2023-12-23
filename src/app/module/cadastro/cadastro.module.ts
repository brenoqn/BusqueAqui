import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  imports: [CommonModule, CadastroRoutingModule],
  declarations: [CadastroComponent],
})
export class CadastroModule {}
