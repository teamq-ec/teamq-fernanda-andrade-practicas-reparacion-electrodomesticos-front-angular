import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageConstants } from 'src/app/constants/images.constants';
import { PaginationConstants } from 'src/app/constants/pagination.constants';
import { ProductConstants } from 'src/app/constants/product.constants';
import { RoutesConstants } from 'src/app/constants/routes.constants';
import { ApplianceServiceService } from '../services/appliance-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private readonly applianceService: ApplianceServiceService = inject(
    ApplianceServiceService
  );

  userName: string | null = '';
  userLastName: string | null = '';
  public homepages: String;
  public avatar: String;
  isOpen = false;
  RoutesConstants = RoutesConstants;
  userId: string | null = localStorage.getItem('userId');
  appliances: any[] = [];

  initialPage = ProductConstants.INITIAL_PAGE;
  initialTotalPages = ProductConstants.INITIAL_TOTAL_PAGES;
  initialTotalItems = ProductConstants.INITIAL_TOTAL_ITEMS;
  
  currentPage: number = this.initialPage;
  totalPages: number = this.initialTotalPages;
  totalItems: number = this.initialTotalItems;
  PaginationConstants = PaginationConstants;



  constructor(private activatedRoute: ActivatedRoute) {
    this.homepages = ImageConstants.homepages;
    this.avatar = ImageConstants.avatar;
    this.userName = localStorage.getItem('userName');
    this.userLastName = localStorage.getItem('userLastName');
    this.loadUserAppliances();
  }

  loadUserAppliances(page: number = this.initialPage): void {
    const userIdNumber = this.userId !== null ? Number(this.userId) : 0;
    this.applianceService
      .getUserAppliances(userIdNumber, page)
      .subscribe((response) => {
        this.appliances = response.data;
        this.currentPage = response.meta.current_page;
        this.totalPages = response.meta.last_page;
        this.totalItems = response.meta.total;
      });
}
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  getFormRoute(): string[] {
    if (this.userId) {
      return [RoutesConstants.form.replace(':userId', this.userId)];
    } else {
      return [RoutesConstants.home];
    }
  }

  goProduct(): string[] {
    if (this.userId) {
      return [RoutesConstants.product.replace(':userId', this.userId)];
    } else {
      return [RoutesConstants.home];
    }
  }
}
