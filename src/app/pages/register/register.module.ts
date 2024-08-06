import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';
import { ApplianceRegistrationModule } from '../appliance-registration/appliance-registration.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MenuModule,
    FooterModule,
    ApplianceRegistrationModule
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
