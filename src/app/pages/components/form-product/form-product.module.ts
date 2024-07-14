import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormProductRoutingModule } from './form-product-routing.module';
import { FormProductComponent } from './form-product.component';


@NgModule({
  declarations: [FormProductComponent],
  imports: [
    CommonModule,
    FormProductRoutingModule
  ],
  exports: [FormProductComponent] 
})
export class FormProductModule { }
