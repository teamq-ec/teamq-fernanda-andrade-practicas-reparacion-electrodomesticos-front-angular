import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalProductRoutingModule } from './modal-product-routing.module';
import { ModalProductComponent } from './modal-product.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ModalProductComponent],
  imports: [
    CommonModule,
    ModalProductRoutingModule,
    TranslateModule
  ],
  exports: [ModalProductComponent] 
})
export class ModalProductModule { }
