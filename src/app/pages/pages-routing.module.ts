import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplianceRegistrationComponent } from './appliance-registration/appliance-registration.component';
import { ProductComponent } from './product/product.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'form',
    component: ApplianceRegistrationComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'payment/:id',
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
