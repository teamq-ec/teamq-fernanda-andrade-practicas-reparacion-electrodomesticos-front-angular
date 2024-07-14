import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormProductComponent } from './components/form-product/form-product.component';
import { FormProductModule } from './components/form-product/form-product.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormProductModule
  ]
})
export class PagesModule { }
