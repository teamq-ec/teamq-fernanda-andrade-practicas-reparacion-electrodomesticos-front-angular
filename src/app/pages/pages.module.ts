import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormProductModule } from './components/form-product/form-product.module';

import { TranslateModule } from '@ngx-translate/core';
import { CarruselComponent } from './components/carrusel/carrusel.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslateModule,
  ],
})
export class PagesModule {}
