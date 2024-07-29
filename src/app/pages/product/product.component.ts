import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplianceServiceService } from '../services/appliance-service.service';
import { ProductConstants } from 'src/app/constants/product.constants';
import { IconsConstants } from 'src/app/constants/icons.constants';
import { TranslateService } from '@ngx-translate/core';
import { TimeConstants } from 'src/app/constants/time.constants';
import { PaginationConstants } from 'src/app/constants/pagination.constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  private readonly applianceService: ApplianceServiceService = inject(
    ApplianceServiceService
  );
  private readonly translate: TranslateService = inject(TranslateService);

  urls = ProductConstants;
  icons = IconsConstants;

  initialPage = ProductConstants.INITIAL_PAGE;
  initialTotalPages = ProductConstants.INITIAL_TOTAL_PAGES;
  initialTotalItems = ProductConstants.INITIAL_TOTAL_ITEMS;

  selectedType: string | null = null;
  private userId?: number;
  appliances: any[] = [];

  currentPage: number = this.initialPage;
  totalPages: number = this.initialTotalPages;
  totalItems: number = this.initialTotalItems;
  PaginationConstants = PaginationConstants;

  timerMessage: string = '';
  timerInterval: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.initializeUserId();
    if (this.userId !== undefined) {
      this.loadUserAppliances(this.currentPage);
    }
  }

  private initializeUserId() {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this.userId = +userId;
    }
    console.log('User ID:', this.userId);
  }

  loadUserAppliances(page: number = this.initialPage): void {
    this.applianceService
      .getUserAppliances(this.userId!, page)
      .subscribe((response) => {
        this.appliances = response.data;
        this.currentPage = response.meta.current_page;
        this.totalPages = response.meta.last_page;
        this.totalItems = response.meta.total;
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      const nextPage = this.currentPage + 1;
      this.loadUserAppliances(nextPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      const previousPage = this.currentPage - 1;
      this.loadUserAppliances(previousPage);
    }
  }

  onClickType(type: string) {
    this.translate
      .get(`APPLIANCE_TYPE_${type.toUpperCase()}`)
      .subscribe((translatedType: string) => {
        if (type !== ProductConstants.APPLIANCE_TYPE_ALL) {
          this.selectedType = translatedType;
          this.applianceService.setSelectedType(translatedType);
          this.loadUserAppliances();
        } else {
          this.selectedType = type;
          this.applianceService.setSelectedType(null);
          this.loadUserAppliances();
        }
      });
  }

  showTimer(appliance: any): void {
    if (!appliance.application_date) {
      this.translate
        .get('INVALID_APPLICATION_DATE')
        .subscribe((msg: string) => {
          this.timerMessage = msg;
        });
      return;
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const startTime = new Date(appliance.application_date).getTime();
    let duration = 0;

    if (appliance.service_type === ProductConstants.MAINTENANCE) {
      duration = ProductConstants.MAINTENANCE_DURATION;
    } else if (appliance.service_type === ProductConstants.REPAIR) {
      duration = ProductConstants.REPAIR_DURATION;
    } else {
      this.translate.get('INVALID_SERVICE_TYPE').subscribe((msg: string) => {
        this.timerMessage = msg;
      });
      return;
    }

    const endTime = startTime + duration;

    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(this.timerInterval);
        this.translate.get('SERVICE_COMPLETED').subscribe((msg: string) => {
          this.timerMessage = msg;
        });
        return;
      }

      const days = Math.floor(
        distance /
          (TimeConstants.MILLISECONDS_PER_SECOND *
            TimeConstants.SECONDS_PER_MINUTE *
            TimeConstants.MINUTES_PER_HOUR *
            TimeConstants.HOURS_PER_DAY)
      );
      const hours = Math.floor(
        (distance %
          (TimeConstants.MILLISECONDS_PER_SECOND *
            TimeConstants.SECONDS_PER_MINUTE *
            TimeConstants.MINUTES_PER_HOUR *
            TimeConstants.HOURS_PER_DAY)) /
          (TimeConstants.MILLISECONDS_PER_SECOND *
            TimeConstants.SECONDS_PER_MINUTE *
            TimeConstants.MINUTES_PER_HOUR)
      );
      const minutes = Math.floor(
        (distance %
          (TimeConstants.MILLISECONDS_PER_SECOND *
            TimeConstants.SECONDS_PER_MINUTE *
            TimeConstants.MINUTES_PER_HOUR)) /
          (TimeConstants.MILLISECONDS_PER_SECOND *
            TimeConstants.SECONDS_PER_MINUTE)
      );
      const seconds = Math.floor(
        (distance %
          (TimeConstants.MILLISECONDS_PER_SECOND *
            TimeConstants.SECONDS_PER_MINUTE)) /
          TimeConstants.MILLISECONDS_PER_SECOND
      );

      this.translate.get('TIMER_FORMAT').subscribe((format: string) => {
        this.timerMessage = format
          .replace('{{days}}', days.toString())
          .replace('{{hours}}', hours.toString())
          .replace('{{minutes}}', minutes.toString())
          .replace('{{seconds}}', seconds.toString());
      });
    }, 1000);
  }
}
