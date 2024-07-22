import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplianceRegistrationRoutingModule } from './appliance-registration-routing.module';

import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { ApplianceRegistrationComponent } from './appliance-registration.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ApplianceRegistrationComponent],
  imports: [
    CommonModule,
    ApplianceRegistrationRoutingModule,
    MenuModule,
    ReactiveFormsModule,
    FooterModule,
    TranslateModule,
  ],
  exports: [],
})
export class ApplianceRegistrationModule {}
