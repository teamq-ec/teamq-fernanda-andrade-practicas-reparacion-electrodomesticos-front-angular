import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  userId: string | null = localStorage.getItem('userId');

  constructor(private activatedRoute: ActivatedRoute) {
    this.homepages = ImageConstants.homepages;
    this.avatar = ImageConstants.avatar;
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  getFormRoute(): string[] {
    if (this.userId) {
      return [RoutesConstants.form.replace(':userId', this.userId)];
    } else {
      return [RoutesConstants.home];
    }
  }

  goProduct(): string[] {
    if (this.userId) {
      return [RoutesConstants.product.replace(':userId', this.userId)];
    } else {
      return [RoutesConstants.home];
    }
  }
}
