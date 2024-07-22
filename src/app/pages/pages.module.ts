import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormProductModule } from './components/form-product/form-product.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';

import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormProductModule,
    TranslateModule

  ]
})
export class PagesModule { }
