import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductModalService } from '../../services/product-modal.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  @Output() alertClosed = new EventEmitter<void>();
  product: Product | null = null;
  user: User | null = null;
  isOpenModal = false;

  constructor(private productModalService: ProductModalService) {}

  ngOnInit(): void {
    this.productModalService.currentProduct.subscribe(product => {
      this.product = product;
    });
    this.productModalService.currentUser.subscribe(user => {
      this.user = user;
      if (this.user && this.product) {
        this.isOpenModal = true;
      }
    });
  }

  closeModal() {
    this.alertClosed.emit();
    this.isOpenModal = false;
    this.productModalService.closeModal();
  }
}
