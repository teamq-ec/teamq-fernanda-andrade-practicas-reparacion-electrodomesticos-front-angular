import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor( private router: Router) {
  }

  getUserIdFromRoute(): string {
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.indexOf('pages') + 1];
  }
  goToHome(): void {
    const userId = this.getUserIdFromRoute();
    this.router.navigate([`/pages/${userId}/home`]);
  }

}
