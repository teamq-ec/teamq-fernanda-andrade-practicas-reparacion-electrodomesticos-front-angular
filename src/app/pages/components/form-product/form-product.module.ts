import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormProductRoutingModule } from './form-product-routing.module';
import { FormProductComponent } from './form-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertLoginRegisterModule } from 'src/app/components/auth/components/alert-login-register/alert-login-register.module';
import { AlertFormModule } from '../alert-form/alert-form.module';
import { TranslateModule } from '@ngx-translate/core';
import { AlertConfirmationModule } from '../alert-confirmation/alert-confirmation.module';


@NgModule({
  declarations: [FormProductComponent],
  imports: [
    CommonModule,
    FormProductRoutingModule,
    ReactiveFormsModule,
    AlertLoginRegisterModule,
    AlertFormModule,
    TranslateModule,
    AlertConfirmationModule,
  ],
  exports: [FormProductComponent] 
})
export class FormProductModule { }
