import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductModalService } from '../../services/product-modal.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
})
export class ModalProductComponent implements OnInit {
  private readonly router: Router = inject(Router);
  @Output() alertClosed = new EventEmitter<void>();
  product: Product | null = null;
  user: User | null = null;
  isOpenModal = false;

  constructor(private productModalService: ProductModalService) {}

  ngOnInit(): void {
    this.productModalService.currentProduct.subscribe((product) => {
      this.product = product;
      if (this.product) {
        localStorage.setItem('currentProduct', JSON.stringify(this.product));
      }
    });
  }

  closeModal(): void {
    this.alertClosed.emit();
    this.isOpenModal = false;
    this.productModalService.closeModal();
  }

  navigateToPayment(userId: number, productId: number): void {
    this.router.navigate([`/pages/${userId}/payment/${productId}`]);
  }
}
