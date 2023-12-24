import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  imports: [CommonModule, ListaRoutingModule, NavbarModule],
  declarations: [ListaComponent],
})
export class ListaModule {}
