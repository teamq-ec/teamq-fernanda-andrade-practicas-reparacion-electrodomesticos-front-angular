import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTransferServiceService } from '../../services/data-transfer-service.service';
import { Router } from '@angular/router';
import { PROVINCES_ECUADOR } from 'src/app/constants/constants';
import { ProductConstants } from 'src/app/constants/product.constants';
import { ValidationConstants } from 'src/app/constants/validation.constants';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly dataTransferService: DataTransferServiceService = inject(
    DataTransferServiceService
  );

  urls = ProductConstants;
  public form: FormGroup;
  public imageSrc: string | ArrayBuffer | null = null;
  public files: File[] = [];
  public showAlert: boolean = false;
  public showAlertForm: boolean = false;

  provinces = PROVINCES_ECUADOR;

  constructor() {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      appliance_type: ['', [Validators.required]],
      brand: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.BRAND_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.BRAND_MAX_LENGTH),
        ],
      ],
      problem_details: ['', [Validators.required, Validators.minLength(ValidationConstants.BRAND_MIN_LENGTH)]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.BRAND_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.ADDRESSS_MAX_LENGTH),
        ],
      ],
      service_type: ['', [Validators.required]],
      preferred_contact_method: ['', [Validators.required]],
      phone_number: [],
      damaged_appliance_image: [null, Validators.required],
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
    if (this.form.invalid) {
      this.showAlertForm = true;
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const file = this.files[0];
    const formValueWithFile = {
      ...this.form.value,
      damaged_appliance_image: file ? file.name : null,
    };

    this.dataTransferService.setData(formValueWithFile);
    this.showAlert = true;
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.files = [file];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.form.patchValue({ damaged_appliance_image: file });
      this.form.get('damaged_appliance_image')?.updateValueAndValidity();
    }
  }

  public getFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  onAlertClosed() {
    this.showAlertForm = false;
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
      this.handleFile(file);
    }
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private handleFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result || null;
    };
    reader.readAsDataURL(file);
    this.files = [file];
    this.form.patchValue({ damaged_appliance_image: file.name });
    this.form.get('damaged_appliance_image')?.updateValueAndValidity();
  }

  public removeImage(): void {
    this.imageSrc = null;
    this.files = [];
    this.form.get('damaged_appliance_image')?.reset();
  }
}

