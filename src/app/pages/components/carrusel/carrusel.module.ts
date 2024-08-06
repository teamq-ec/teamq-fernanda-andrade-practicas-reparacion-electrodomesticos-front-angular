import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from './carrusel.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [CarruselComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [CarruselComponent] 
})
export class CarruselModule { }
