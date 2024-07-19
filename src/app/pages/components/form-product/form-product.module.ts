import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormProductRoutingModule } from './form-product-routing.module';
import { FormProductComponent } from './form-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertLoginRegisterModule } from 'src/app/components/auth/components/alert-login-register/alert-login-register.module';
import { AlertFormModule } from '../alert-form/alert-form.module';


@NgModule({
  declarations: [FormProductComponent],
  imports: [
    CommonModule,
    FormProductRoutingModule,
    ReactiveFormsModule,
    AlertLoginRegisterModule,
    AlertFormModule
  ],
  exports: [FormProductComponent] 
})
export class FormProductModule { }
