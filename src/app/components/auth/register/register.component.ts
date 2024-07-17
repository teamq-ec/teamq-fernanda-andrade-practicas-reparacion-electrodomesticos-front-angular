import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/pages/services/data-transfer-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private readonly dataTransferService: DataTransferServiceService = inject(
    DataTransferServiceService
  );
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public form: FormGroup;
  public showAlert: boolean = false;
  public formData: any;

  constructor() {
    this.form = this.buildForm();

    this.getLocalStorageData();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group(
      {
        first_name: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(40),
          ],
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(40),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
            ),
          ],
        ],
        confirm_password: ['', Validators.required],
        phone_number: ['', Validators.required],
        address: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  getLocalStorageData(): void {
    const formData = this.dataTransferService.getData();
    if (formData) {
      this.form.patchValue(formData);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control?.invalid && (control.dirty || control.touched)
      ? true
      : false;
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    if (form.get('password')?.value !== form.get('confirm_password')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    this.authService.register(this.form.value).subscribe(
      (response: User) => {
        this.showAlert = true;
      },
      (error) => {
        alert('Register failed');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
