import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertFormRoutingModule } from './alert-form-routing.module';
import { AlertFormComponent } from './alert-form.component';


@NgModule({
  declarations: [AlertFormComponent],
  imports: [
    CommonModule,
    AlertFormRoutingModule
  ],
  exports: [AlertFormComponent] 
})
export class AlertFormModule { }
