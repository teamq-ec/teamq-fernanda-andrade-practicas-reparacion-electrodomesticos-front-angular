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
  @Output() alertClosed = new EventEmitter<void>(); // Evento para notificar cuando el modal se cierra
  product: Product | null = null;
  user: User | null = null;
  isOpen = true;

  constructor(private productModalService: ProductModalService) {}

  ngOnInit(): void {
    this.productModalService.currentProduct.subscribe(product => {
      this.product = product;
    });
    this.productModalService.currentUser.subscribe(user => {
      this.user = user;
      if (this.user && this.product) {
        this.openModal();
      }
    });
  }

  openModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.style.display = 'block'; // Mostrar el modal
    }
  }

  closeModal() {
    this.alertClosed.emit(); // Emitir evento cuando el modal se cierra
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.style.display = 'none'; // Ocultar el modal
    }
    this.productModalService.closeModal(); // Cerrar modal en el servicio
  }
}
