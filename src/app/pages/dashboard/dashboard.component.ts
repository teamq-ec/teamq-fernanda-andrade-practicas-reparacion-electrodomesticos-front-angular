import { Component } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  urls = UrlsConstants;
}
