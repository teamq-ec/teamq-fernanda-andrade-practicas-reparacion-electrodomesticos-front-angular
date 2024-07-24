import { Component } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslationService } from '../../services/translation.service';
import { LanguageConstants } from 'src/app/constants/language-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isOpen = false;
  urls = UrlsConstants;
  showMenuI: boolean = false;
  currentLanguage: 'en' | 'es' = 'es';
  languages = LanguageConstants;

  constructor(private translationService: TranslationService) {}

  changeLanguage(language: 'en' | 'es', event: Event) {
    event.preventDefault(); 
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.closeMenu();
  }

  toggleMenu() : void{
    this.isOpen = !this.isOpen;
  }

  toggleMenuI(): void {
    this.showMenuI = !this.showMenuI;
  }

  closeMenu() : void{
    this.showMenuI = false;
  }

  getFlagUrl(language: 'en' | 'es'): string {
    return LanguageConstants[language];
  }
}
