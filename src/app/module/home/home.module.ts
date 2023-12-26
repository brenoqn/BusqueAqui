import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedButtonModule } from 'src/app/components/shared-button/shared-button.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedButtonModule],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
