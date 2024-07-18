import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/service/auth.service';
import { ImageConstants } from 'src/app/constants/images.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  private readonly router: Router = inject(Router);

  userName: string | null = '';
  userLastName: string | null = '';
  showMenu: boolean = false;
  urls = UrlsConstants;
  public avatar: String;

  constructor() {
    this.avatar = ImageConstants.avatar;
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
  }

  toggleMenu() {
    console.log('entroo a toggle');
    this.showMenu = !this.showMenu;
  }

   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLastName');
    this.router.navigate(['']);
  }
}
