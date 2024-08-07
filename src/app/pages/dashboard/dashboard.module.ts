import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FooterModule } from '../components/footer/footer.module';
import { HeaderModule } from '../components/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CarruselModule } from "../components/carrusel/carrusel.module";
import { ApplianceRegistrationModule } from '../appliance-registration/appliance-registration.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FooterModule,
    HeaderModule,
    TranslateModule,
    CarruselModule,
    ApplianceRegistrationModule
],
  exports: [DashboardComponent] 
})
export class DashboardModule { }
