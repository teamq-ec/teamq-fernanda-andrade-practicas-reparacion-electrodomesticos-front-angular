import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alert-confirmation',
  templateUrl: './alert-confirmation.component.html',
  styleUrls: ['./alert-confirmation.component.css'],
})
export class AlertConfirmationComponent {
  private userId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this.userId = +userId;
    }
    console.log('User ID:', this.userId);
  }

  closeAlert() {
    if (this.userId) {
      this.router.navigate(['/pages', this.userId, 'product']);
    } else {
      console.error('User ID is not defined.');
    }
  }
}
