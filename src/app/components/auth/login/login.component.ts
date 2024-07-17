import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { RegexConstants } from 'src/app/constants/regex.constants';
import { ImageConstants } from 'src/app/constants/images.constants';
import { RoutesConstants } from 'src/app/constants/routes.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  public kitchenImage: String;
  public kitchenImageTwo: String;

  constructor() {
    this.loginForm = this.buildForm();
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

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
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

  navigate() {
    this.router.navigate([RoutesConstants.register]);
  }

  goToHome() {
    this.router.navigate([RoutesConstants.home]);
  }
}
