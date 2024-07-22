import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FooterModule } from '../components/footer/footer.module';
import { FormProductModule } from '../components/form-product/form-product.module';
import { HeaderModule } from '../components/header/header.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FooterModule,
    FormProductModule,
    HeaderModule,
    TranslateModule
  ],
  exports: [DashboardComponent] 
})
export class DashboardModule { }
