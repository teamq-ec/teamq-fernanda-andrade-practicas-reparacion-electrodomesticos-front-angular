import { Component, inject, OnInit } from '@angular/core';
import { UrlsConstants } from 'src/app/constants/urls.constants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/components/service/auth.service';
import { RoutesConstants } from 'src/app/constants/routes.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  urls = UrlsConstants;
  userId: string | null = localStorage.getItem('userId');
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  goToHome(): string[] {
    if (this.userId) {
      return [RoutesConstants.dashboard.replace(':userId', this.userId)];
    } else {
      return [RoutesConstants.home];
    }
  }
}
