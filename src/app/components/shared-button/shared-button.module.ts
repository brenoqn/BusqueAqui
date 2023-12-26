import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedButtonComponent } from './shared-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedButtonComponent],
  exports: [SharedButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedButtonModule {}
