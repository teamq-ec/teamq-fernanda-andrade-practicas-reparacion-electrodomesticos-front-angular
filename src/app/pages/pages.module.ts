import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormProductModule } from './components/form-product/form-product.module';

import { TranslateModule } from '@ngx-translate/core';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { RegisterModule } from './register/register.module';
import { MobilMenuModule } from './components/mobil-menu/mobil-menu.module';



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslateModule,
    RegisterModule,
    MobilMenuModule

  ],
})
export class PagesModule {}
