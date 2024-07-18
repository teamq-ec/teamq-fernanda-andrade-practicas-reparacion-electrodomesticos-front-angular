import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenuModule } from '../components/menu/menu.module';
import { FooterModule } from '../components/footer/footer.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, 
    HomeRoutingModule,
    MenuModule,
    FooterModule,
  ],
  exports: [HomeComponent] 
})
export class HomeModule {}
