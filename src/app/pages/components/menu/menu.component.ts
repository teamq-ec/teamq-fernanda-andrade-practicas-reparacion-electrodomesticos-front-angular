import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/service/auth.service';
import { ImageConstants } from 'src/app/constants/images.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslationService } from '../../services/translation.service';

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

  constructor(private translationService: TranslationService) {
    this.avatar = ImageConstants.avatar;
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLastName');
    this.router.navigate(['']);
  }

  changeLanguage(language: string) {
    this.translationService.setLanguage(language);
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
