import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AlertModule } from 'src/app/pages/components/alert/alert.module';
import { AlertFormModule } from 'src/app/pages/components/alert-form/alert-form.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    AlertModule,
    AlertFormModule,
    TranslateModule
  ]
})
export class RegisterModule { }
