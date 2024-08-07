import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    MenuModule,
    FooterModule,
    TranslateModule
  ],
  exports: [ProductComponent]
})
export class ProductModule { }
