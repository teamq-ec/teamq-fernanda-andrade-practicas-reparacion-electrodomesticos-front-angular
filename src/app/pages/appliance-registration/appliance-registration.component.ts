import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PROVINCES_ECUADOR } from 'src/app/constants/constants';
import { DataTransferServiceService } from '../services/data-transfer-service.service';
import { ProductService } from '../services/product.service';

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
    this.getLocalStorageData();
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      appliance_type: ['', [Validators.required]],
      brand: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      problem_details: ['', [Validators.required, Validators.minLength(5)]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      service_type: ['', [Validators.required]],
      preferred_contact_method: ['', [Validators.required]],
      phone_number: [''],
      damaged_appliance_image: [null, Validators.required],
      state: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      application_date: [''],
    });
  }

  private setTodayDate(): void {
    const today = new Date().toISOString().split('T')[0];
    this.form.get('application_date')?.setValue(today);
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
    if (this.form.invalid) {
      this.showAlertForm = true;
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const formData = new FormData();
    formData.append('user_id', this.userId ?? '');
    formData.append('first_name', this.form.value.first_name);
    formData.append('last_name', this.form.value.last_name);
    formData.append('email', this.form.value.email);
    formData.append('appliance_type', this.form.value.appliance_type);
    formData.append('brand', this.form.value.brand);
    formData.append('problem_details', this.form.value.problem_details);
    formData.append('address', this.form.value.address);
    formData.append('service_type', this.form.value.service_type);
    formData.append(
      'preferred_contact_method',
      this.form.value.preferred_contact_method
    );
    formData.append('phone_number', this.form.value.phone_number);
    if (this.files.length > 0) {
      formData.append('damaged_appliance_image', this.files[0]);
    }
    formData.append('state', this.form.value.state);
    formData.append('application_date', this.form.value.application_date);

    this.productService.registerProduct(formData).subscribe({
      next: (response) => {
        this.showAlert = true;
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

  onAlertClosed() : void{
    this.showAlert = false;
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

  getLocalStorageData(): void {
    const formData = this.dataTransferService.getData();
    if (formData) {
      this.form.patchValue(formData);

      if (formData.damaged_appliance_image) {
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(
          formData.damaged_appliance_image
        );
      }
    }
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
}
