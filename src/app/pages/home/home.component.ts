import { Component } from '@angular/core';
import { ImageConstants } from 'src/app/constants/images.constants';
import { RoutesConstants } from 'src/app/constants/routes.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userName: string | null = '';
  userLastName: string | null = '';
  public homepages: String;
  public avatar: String;
  isOpen = false;
  RoutesConstants = RoutesConstants;

  constructor() {
    this.homepages = ImageConstants.homepages;
    this.avatar = ImageConstants.avatar;
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
