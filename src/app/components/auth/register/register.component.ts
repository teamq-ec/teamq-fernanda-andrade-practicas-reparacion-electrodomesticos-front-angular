import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { RegexConstants } from 'src/app/constants/regex.constants';
import { ImageConstants } from 'src/app/constants/images.constants';
import { RoutesConstants } from 'src/app/constants/routes.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';

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
  public kitchenImage: String;
  public kitchenImageTwo: String;
  urls = UrlsConstants;

  constructor() {
    this.form = this.buildForm();
    this.kitchenImage = ImageConstants.kitchen;
    this.kitchenImageTwo = ImageConstants.kitchenTwo;
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
            Validators.pattern(RegexConstants.email),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(RegexConstants.password),
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

  onSubmit() : void{
    this.authService.register(this.form.value).subscribe(
      (response: User) => {
        this.showAlert = true;
      },
      (error) => {
        alert('Register failed');
      }
    );
  }

  goToLogin() : void{
    this.router.navigate([RoutesConstants.login]);
  }
}
