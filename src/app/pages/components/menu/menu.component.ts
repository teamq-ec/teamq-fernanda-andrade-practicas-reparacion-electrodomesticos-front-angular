import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/service/auth.service';
import { ImageConstants } from 'src/app/constants/images.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslationService } from '../../services/translation.service';
import { LanguageConstants } from 'src/app/constants/language-constants';
import { RoutesConstants } from 'src/app/constants/routes.constants';

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
  showMenuI: boolean = false;
  currentLanguage: 'en' | 'es' = 'es';
  languages = LanguageConstants;
  userId: string | null = localStorage.getItem('userId');
  paymentId: string | undefined;

  constructor(private translationService: TranslationService) {
    this.avatar = ImageConstants.avatar;
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleMenuI(): void {
    this.showMenuI = !this.showMenuI;
  }

  closeMenu(): void {
    this.showMenuI = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLastName');
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  changeLanguage(language: 'en' | 'es', event: Event): void {
    event.preventDefault();
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.closeMenu();
  }

  getFlagUrl(language: 'en' | 'es'): string {
    return LanguageConstants[language];
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

  goToHome(): string[] {
    if (this.userId) {
      return [RoutesConstants.home];
    } else {
      return [RoutesConstants.home];
    }
  }
}
