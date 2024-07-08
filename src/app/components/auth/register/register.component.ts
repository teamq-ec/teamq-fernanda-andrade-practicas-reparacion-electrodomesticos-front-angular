import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public form: FormGroup;
  public showAlert: boolean = false;

  constructor() {
    this.form = this.buildForm();
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
        console.error(error);
      }
    );
  }
}
