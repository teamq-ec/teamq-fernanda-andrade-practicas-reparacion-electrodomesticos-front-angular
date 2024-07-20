import { Component, inject } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  urls = UrlsConstants;
}
