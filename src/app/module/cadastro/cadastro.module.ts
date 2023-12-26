import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SharedButtonModule } from 'src/app/components/shared-button/shared-button.module';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CadastroRoutingModule,
    NavbarModule,
    SharedButtonModule,
  ],
  declarations: [CadastroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CadastroModule {}
