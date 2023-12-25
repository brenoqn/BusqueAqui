import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';

@NgModule({
  imports: [CommonModule, ListaRoutingModule, NavbarModule, FormsModule],
  declarations: [ListaComponent],
})
export class ListaModule {}
