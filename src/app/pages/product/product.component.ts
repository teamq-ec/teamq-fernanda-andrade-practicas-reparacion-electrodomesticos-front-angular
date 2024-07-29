import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplianceServiceService } from '../services/appliance-service.service';
import { ProductConstants } from 'src/app/constants/product.constants';
import { IconsConstants } from 'src/app/constants/icons.constants';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/models/product';
import { ProductModalService } from '../services/product-modal.service';
import { User } from 'src/app/models/user';

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
  selectedType: string | null = null;
  private userId?: number;
  appliances: any[] = [];
  user: User | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;

  modalProduct: boolean = false;

  products: Product[] = [
    /* lista de productos */
  ];

  timerMessage: string = ''; // Asegúrate de definir esto en el componente
  timerInterval: any; // Para almacenar el intervalo del temporizador

  constructor(
    private activatedRoute: ActivatedRoute,
    private productModalService: ProductModalService,
    private router: Router
  ) {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this.userId = +userId;
    }
    console.log('User ID:', this.userId);

    if (this.userId !== undefined) {
      this.loadUserAppliances(this.currentPage);
    }
  }

  loadUserAppliances(page: number = 1): void {
    console.log('Loading page:', page);
    this.applianceService.getUserAppliances(this.userId!, page).subscribe(
      (response) => {
        console.log('Data received:', response);
        this.appliances = response.data;
        this.user = response.data.user;
        this.currentPage = response.meta.current_page;
        this.totalPages = response.meta.last_page;
        this.totalItems = response.meta.total;
      },
      (error) => {
        console.error('Error fetching appliances:', error);
      }
    );
  }

  goToHome(): void {
    const userId = this.getUserIdFromRoute();
    this.router.navigate([`/pages/${userId}/home`]);
  }
  getUserIdFromRoute(): string {
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.indexOf('pages') + 1];
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      const nextPage = this.currentPage + 1;
      console.log('Moving to next page:', nextPage);
      this.loadUserAppliances(nextPage);
    }
  }

  openProductModal(appliance: Product, user: User) {
    console.log('esto es delmodalloque envia', appliance, user);
    this.modalProduct = true;
    this.productModalService.openModal(appliance, user);
  }

  onAlertClosed() {
    this.modalProduct = false;
  }
  previousPage() {
    if (this.currentPage > 1) {
      const previousPage = this.currentPage - 1;
      console.log('Moving to previous page:', previousPage);
      this.loadUserAppliances(previousPage);
    }
  }

  onClickType(type: string) {
    this.translate
      .get(`APPLIANCE_TYPE_${type.toUpperCase()}`)
      .subscribe((translatedType: string) => {
        console.log(`Original Type: ${type}`);
        console.log(`Translated Type: ${translatedType}`);

        if (type !== 'all') {
          this.selectedType = translatedType;
          console.log('Selected Type:', this.selectedType);
          this.applianceService.setSelectedType(translatedType);
          this.loadUserAppliances();
        } else {
          this.selectedType = type;
          console.log('Selected Type: All');
          this.applianceService.setSelectedType(null);
          this.loadUserAppliances();
        }
      });
  }

  showTimer(appliance: any): void {
    if (!appliance.application_date) {
      this.timerMessage = 'Fecha de aplicación no válida.';
      return;
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    const startTime = new Date(appliance.application_date).getTime();

    let duration = 0;

    // Determinar la duración en milisegundos según el tipo de servicio
    if (appliance.service_type === 'maintenance') {
      duration = 7 * 24 * 60 * 60 * 1000; // 1 semana en milisegundos
    } else if (appliance.service_type === 'repair') {
      duration = 15 * 24 * 60 * 60 * 1000; // 15 días en milisegundos
    } else {
      this.timerMessage = 'Tipo de servicio no válido.';
      return;
    }

    const endTime = startTime + duration;

    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(this.timerInterval);
        this.timerMessage = 'La reparación/mantenimiento está completo.';
        return;
      }

      // Calcular días, horas, minutos y segundos restantes
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Actualizar el mensaje del temporizador
      this.timerMessage = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }
}
