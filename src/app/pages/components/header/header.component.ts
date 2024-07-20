import { Component } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isOpen = false;
  urls = UrlsConstants;

  constructor(private translationService: TranslationService) {}

  changeLanguage(language: string) {
    this.translationService.setLanguage(language);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  getFlagUrl(language: string): string {
    switch (language) {
      case 'en':
        return 'https://alicante.salesianos.edu/colegio/wp-content/uploads/sites/2/2017/10/plurilinguismo_bandera_ingles-min.png';
      case 'es':
        return 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5IZAt5eY5pr6hVl8AWydSB_Es70Dib6y7mi4vTq9o9ShULUD9yl7-5nOc6FHT7L6VghMTgWB3Eb9HXBTWIdUaG0etAuj492_z1ozloh0C9io0ErpBBajE9TfO_l9ELHtXFglb_9FCueU/s1600/LISA.png" alt="" class="block h-auto w-5 flex-shrink-0'; // URL de la bandera en español
      default:
        return ''; 
    }
  }
}
