import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TranslateModule
  ],
  exports: [MenuComponent] 
})
export class MenuModule { }
