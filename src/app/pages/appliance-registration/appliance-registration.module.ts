import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplianceRegistrationRoutingModule } from './appliance-registration-routing.module';
import { ApplianceRegistrationComponent } from './appliance-registration.component';
import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';


@NgModule({
  declarations: [ApplianceRegistrationComponent],
  imports: [
    CommonModule,
    ApplianceRegistrationRoutingModule,
    MenuModule,
    FooterModule,
  ],
  exports: [ApplianceRegistrationComponent] 
})
export class ApplianceRegistrationModule { }
