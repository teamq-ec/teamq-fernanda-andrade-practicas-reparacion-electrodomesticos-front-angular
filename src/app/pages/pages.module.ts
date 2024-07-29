import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormProductModule } from './components/form-product/form-product.module';

import { TranslateModule } from '@ngx-translate/core';
import { ModalProductComponent } from './components/modal-product/modal-product.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormProductModule,
    TranslateModule,
  ],
})
export class PagesModule {}
