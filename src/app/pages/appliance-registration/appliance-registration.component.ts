import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PROVINCES_ECUADOR } from 'src/app/constants/constants';
import { DataTransferServiceService } from '../services/data-transfer-service.service';
import { ProductService } from '../services/product.service';
import { ValidationConstants } from 'src/app/constants/validation.constants';

@Component({
  selector: 'app-appliance-registration',
  templateUrl: './appliance-registration.component.html',
  styleUrls: ['./appliance-registration.component.css'],
})
export class ApplianceRegistrationComponent implements OnInit {
  private readonly productService: ProductService = inject(ProductService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  public form: FormGroup;

  public imageSrc: SafeUrl | null = null;
  public files: File[] = [];

  public showAlert: boolean = false;
  public showAlertForm: boolean = false;
  showAlertLogin: boolean = false;

  provinces = PROVINCES_ECUADOR;
  userId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataTransferService: DataTransferServiceService,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.form.patchValue(JSON.parse(localStorage.getItem('user') || '{}'));
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      brand: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.BRAND_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.BRAND_MAX_LENGTH),
        ],
      ],
      problem_details: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.BRAND_MIN_LENGTH),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.BRAND_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.ADDRESSS_MAX_LENGTH),
        ],
      ],
      appliance_type: ['', [Validators.required]],
      preferred_contact_method: ['', [Validators.required]],
      damaged_appliance_image: [null],
      phone_number: [],
      state: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.BRAND_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.ADDRESSS_MAX_LENGTH),
        ],
      ],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field) ?? {
      invalid: false,
      dirty: false,
      touched: false,
    };
    return control.invalid && (control.dirty || control.touched);
  }

  public onSubmit(): void {
    if (!this.userId) {
      this.showAlert = false;
      this.showAlertForm = false;
      this.showAlertLogin = true;
      return;
    }
    if (this.form.invalid) {
      this.showAlertForm = true;
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const formData = new FormData();
    formData.append('user_id', this.userId ?? '');
    formData.append('appliance_type', this.form.value.appliance_type);
    formData.append('brand', this.form.value.brand);
    formData.append('problem_details', this.form.value.problem_details);
    formData.append('collection_address', this.form.value.address);

    formData.append(
      'preferred_contact_method',
      this.form.value.preferred_contact_method
    );

    if (this.files.length > 0) {
      formData.append(
        'damaged_appliance_image',
        this.files[0],
        this.files[0].name
      );
    }


    this.productService.registerProduct(formData).subscribe({
      next: (response) => {
        this.showAlertForm = false;
        this.showAlert = true;
      },
      error: () => {
        this.showAlertForm = false;
        this.showAlert = false;
      },
    });
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.files = [file];
      this.handleFile(file);
    }
  }

  onAlertClosed(): void {
    this.showAlert = false;
    this.form.reset();
  }

  onAlertFormClosed(): void {
    this.showAlertForm = false;
  }

  private handleFile(file: File): void {
    this.convertToBase64(file).then((base64Image: string) => {
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(base64Image);
    });
  }

  public removeImage(): void {
    this.imageSrc = null;
    this.files = [];
    this.form.get('damaged_appliance_image')?.reset();
  }

  public chooseFile(): void {
    const inputElement = document.getElementById(
      'damaged-appliance-image'
    ) as HTMLInputElement;
    inputElement?.click();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.files = [file];
      this.handleFile(file);
    }
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public getFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  goToHome(): void {
    const userId = this.getUserIdFromRoute();
    this.router.navigate([`/pages/${userId}/home`]);
  }

  getUserIdFromRoute(): string {
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.indexOf('pages') + 1];
  }

  cancel(): void {
    this.form.reset();
  }
}
