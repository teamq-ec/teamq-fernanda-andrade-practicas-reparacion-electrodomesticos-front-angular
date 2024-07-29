import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductComponent } from './product.component';
import { ModalProductModule } from '../components/modal-product/modal-product.module';


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MenuModule,
    FooterModule,
    TranslateModule,
    ModalProductModule
  ],
  exports: [ProductComponent] 
})
export class ProductModule { }
