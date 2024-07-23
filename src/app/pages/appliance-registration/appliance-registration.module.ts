import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplianceRegistrationRoutingModule } from './appliance-registration-routing.module';

import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { ApplianceRegistrationComponent } from './appliance-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertFormModule } from '../components/alert-form/alert-form.module';
import { AlertConfirmationModule } from '../components/alert-confirmation/alert-confirmation.module';

@NgModule({
  declarations: [ApplianceRegistrationComponent],
  imports: [
    CommonModule,
    ApplianceRegistrationRoutingModule,
    MenuModule,
    ReactiveFormsModule,
    FooterModule,
    TranslateModule,
    AlertConfirmationModule,
  ],
  exports: [],
})
export class ApplianceRegistrationModule {}
