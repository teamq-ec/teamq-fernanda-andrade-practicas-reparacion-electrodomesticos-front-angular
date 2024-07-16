import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertLoginRegisterRoutingModule } from './alert-login-register-routing.module';
import { AlertLoginRegisterComponent } from './alert-login-register.component';


@NgModule({
  declarations: [AlertLoginRegisterComponent],
  imports: [
    CommonModule,
    AlertLoginRegisterRoutingModule
  ],
  exports: [AlertLoginRegisterComponent] 
})
export class AlertLoginRegisterModule { }
