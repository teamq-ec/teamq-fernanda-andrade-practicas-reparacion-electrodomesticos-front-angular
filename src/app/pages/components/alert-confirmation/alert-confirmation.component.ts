import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-confirmation',
  templateUrl: './alert-confirmation.component.html',
  styleUrls: ['./alert-confirmation.component.css'],
})
export class AlertConfirmationComponent {
  @Output() alertClosed = new EventEmitter<void>();
  isOpen = true;

  closeAlert() {
    this.alertClosed.emit();
  }
}
