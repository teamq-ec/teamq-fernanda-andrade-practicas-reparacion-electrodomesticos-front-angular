import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterModule } from './register/register.module';
import { MobilMenuModule } from './components/mobil-menu/mobil-menu.module';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslateModule,
    RegisterModule,
    MobilMenuModule,
  ],
})
export class PagesModule {}
