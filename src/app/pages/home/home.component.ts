import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userName: string | null = '';
  userLastName: string | null = '';
  isOpen = false;

  constructor(){
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

}
