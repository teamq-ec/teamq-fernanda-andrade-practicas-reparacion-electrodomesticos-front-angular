import { Component } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';

@Component({
  selector: 'app-mobil-menu',
  templateUrl: './mobil-menu.component.html',
  styleUrls: ['./mobil-menu.component.css']
})
export class MobilMenuComponent {
  urls = UrlsConstants;

}
