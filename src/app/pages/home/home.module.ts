import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobilMenuModule } from '../components/mobil-menu/mobil-menu.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenuModule,
    FooterModule,
    TranslateModule,
    MobilMenuModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
