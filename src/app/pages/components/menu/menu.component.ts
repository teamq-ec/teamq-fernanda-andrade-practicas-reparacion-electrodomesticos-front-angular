import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/service/auth.service';
import { ImageConstants } from 'src/app/constants/images.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslationService } from '../../services/translation.service';
import { LanguageConstants } from 'src/app/constants/language-constants';

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

  constructor(private translationService: TranslationService) {
    this.avatar = ImageConstants.avatar;
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleMenuI() {
    this.showMenuI = !this.showMenuI;
  }

  closeMenu() {
    this.showMenuI = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLastName');
    this.router.navigate(['']);
  }

  changeLanguage(language: 'en' | 'es', event: Event) {
    event.preventDefault(); 
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.closeMenu();
  }

  getFlagUrl(language: 'en' | 'es'): string {
    return LanguageConstants[language];
  }
}
