import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { MenuModule } from './pages/components/menu/menu.module';
import { FooterModule } from './pages/components/footer/footer.module';

import { HomeModule } from './pages/home/home.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { ApplianceRegistrationModule } from './pages/appliance-registration/appliance-registration.module';
import { AlertConfirmationModule } from './pages/components/alert-confirmation/alert-confirmation.module';
import { ProductModule } from './pages/product/product.module';
import { ModalProductModule } from './pages/components/modal-product/modal-product.module';
import { PaymentModule } from './pages/payment/payment.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    DashboardModule,
    ProductModule,
    PaymentModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
