import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';

@NgModule({
  imports: [CommonModule, ListaRoutingModule],
  declarations: [ListaComponent],
})
export class ListaModule {}
