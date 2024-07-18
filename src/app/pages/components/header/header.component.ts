import { Component } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isOpen = false;
  urls = UrlsConstants;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

}
