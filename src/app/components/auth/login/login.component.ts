import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { DataTransferServiceService } from 'src/app/pages/services/data-transfer-service.service';

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

  constructor() {
    this.loginForm = this.buildForm();

    this.getLocalStorageData();
  }

  buildForm(): FormGroup {
    return (this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.required]],
    }));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login Response:', response);
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

  navigate() {
    this.router.navigate(['/pages/register']);
  }

  goToHome() {
    this.router.navigate(['/pages/home']);
  }
}
