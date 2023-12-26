import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  templateUrl: './shared-button.component.html',
  styleUrls: ['./shared-button.component.scss']
})
export class SharedButtonComponent {
  @Input() buttonText: string = '';
  @Output() buttonClick = new EventEmitter<void>();
  @Input() icon: string = '';

  onButtonClick() {
    this.buttonClick.emit();
  }
}
