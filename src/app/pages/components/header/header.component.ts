import { Component, inject } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslationService } from '../../services/translation.service';
import { LanguageConstants } from 'src/app/constants/language-constants';
import { ImageConstants } from 'src/app/constants/images.constants';
import { AuthService } from 'src/app/components/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private readonly router: Router = inject(Router);
  isOpen = false;
  urls = UrlsConstants;
  showMenuI: boolean = false;
  currentLanguage: 'en' | 'es' = 'es';
  languages = LanguageConstants;
  userName: string | null = '';
  userLastName: string | null = '';
  avatar: String | null = '';
  showMenu: boolean = false;

  constructor(
    private translationService: TranslationService,
    private authService: AuthService
  ) {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    if (this.authService.isLoggedIn()) {
      this.avatar = ImageConstants.avatar;
      this.userName = localStorage.getItem('userName');
      this.userLastName = localStorage.getItem('userLastName');
    }
  }

  changeLanguage(language: 'en' | 'es', event: Event) {
    event.preventDefault();
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  toggleMenuA(): void {
    this.showMenu = !this.showMenu;
  }

  toggleMenuI(): void {
    this.showMenuI = !this.showMenuI;
  }

  closeMenu(): void {
    this.showMenuI = false;
  }

  getFlagUrl(language: 'en' | 'es'): string {
    return LanguageConstants[language];
  }
}
