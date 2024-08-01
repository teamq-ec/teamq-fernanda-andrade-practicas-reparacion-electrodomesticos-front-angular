import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Payment } from 'src/app/models/payment';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  paymentForm: FormGroup;
  userId: number | undefined;
  productId: number | undefined;
  product: Product | null = null;
  currentDate: string = new Date().toLocaleDateString();

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {
    this.getid();
    this.paymentForm = this.buildForm();
    this.getProductFromLocalStorage();

    this.paymentForm.valueChanges.subscribe((values) => {
      this.updateTicket();
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      user_id: [this.userId, Validators.required],
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      card_type: ['', Validators.required],
      card_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      security_code: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{3,4}$')],
      ],
      amount_payable: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
      product_id: [this.productId, Validators.required],
    });
  }

  private getProductFromLocalStorage(): void {
    const storedProduct = localStorage.getItem('currentProduct');
    if (storedProduct) {
      try {
        this.product = JSON.parse(storedProduct) as Product;
      } catch (error) {
        console.error('Error parsing stored product:', error);
      }
    }
  }

  private updateTicket(): void {
    this.currentDate = new Date().toLocaleDateString();
  }

  getid() {
    return this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('userId');
      const productIdParam = params.get('id');

      this.userId = userIdParam ? +userIdParam : undefined;
      this.productId = productIdParam ? +productIdParam : undefined;

      if (!isNaN(this.userId!) && !isNaN(this.productId!)) {
        this.paymentForm.patchValue({
          user_id: this.userId,
          product_id: this.productId,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentData: Payment = this.paymentForm.value;
      this.paymentService.registerPayment(paymentData).subscribe((response) => {
        if (response) {
          alert('Pago registrado correctamente');
        } else {
          alert('Error al registrar el pago');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
