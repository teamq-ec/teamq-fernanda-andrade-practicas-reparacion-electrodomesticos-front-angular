import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { DataTransferServiceService } from 'src/app/pages/services/data-transfer-service.service';
import { RoutesConstants } from 'src/app/constants/routes.constants';
import { RegexConstants } from 'src/app/constants/regex.constants';
import { ImageConstants } from 'src/app/constants/images.constants';
import { UrlsConstants } from 'src/app/constants/urls.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly dataTransferService: DataTransferServiceService = inject(
    DataTransferServiceService
  );
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  public kitchenImage: String;
  public kitchenImageTwo: String;
  urls = UrlsConstants;
  public showPassword: boolean = false;

  constructor() {
    this.loginForm = this.buildForm();
    this.getLocalStorageData();
    this.kitchenImage = ImageConstants.kitchen;
    this.kitchenImageTwo = ImageConstants.kitchenTwo;
  }

  buildForm(): FormGroup {
    return (this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(RegexConstants.email)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(RegexConstants.password)],
      ],
    }));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('userName', response.user.first_name);
          localStorage.setItem('userLastName', response.user.last_name);
          this.goToHome();
        },
        (error) => {
          alert('Login failed');
        }
      );
    } else {
      alert('Login failed');
    }
  }

  getLocalStorageData(): void {
    const formData = this.dataTransferService.getData();
    if (formData) {
      this.loginForm.patchValue(formData);
    }
  }

  navigate(): void {
    this.router.navigate([RoutesConstants.register]);
  }

  goToHome(): void {
    this.router.navigate([RoutesConstants.home]);
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control?.invalid && (control.dirty || control.touched);
  }
}

