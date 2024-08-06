import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilMenuComponent } from './mobil-menu.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [MobilMenuComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [ MobilMenuComponent]
})
export class MobilMenuModule { }
