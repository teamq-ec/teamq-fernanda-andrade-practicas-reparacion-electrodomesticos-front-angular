import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplianceServiceService } from '../services/appliance-service.service';
import { ProductService } from '../services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  private readonly productService: ProductService = inject(ProductService);

  userId: number | undefined;
  productId: number | undefined;

  product: Product | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.getid();
  }

  getid() {
    return this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('userId');
      const productIdParam = params.get('id');

      this.userId = userIdParam ? +userIdParam : undefined;
      this.productId = productIdParam ? +productIdParam : undefined;

      if (this.productId) {
        this.loadUserProduct(this.productId);
      }
    });
  }

  loadUserProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe((response) => {
      this.product = response.data;
    });
  }

  getUserIdFromRoute(): string {
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.indexOf('pages') + 1];
  }
  goToHome(): void {
    const userId = this.getUserIdFromRoute();
    this.router.navigate([`/pages/${userId}/home`]);
  }
}
