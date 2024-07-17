import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { AlertLoginRegisterComponent } from './components/alert-login-register/alert-login-register.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    AuthRoutingModule,
    HttpClientModule,
    LoginModule
  ]
})
export class AuthModule { }
