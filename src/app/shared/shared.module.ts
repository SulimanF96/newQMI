import { SearchByImageComponent } from './components/search-by-image/search-by-image.component';
import { SearchByBarcodeComponent } from './components/search-by-barcode/search-by-barcode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';


@NgModule({
  declarations: [ SearchByImageComponent, SearchByBarcodeComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SearchByImageComponent,
    SearchByBarcodeComponent,
    ClickOutsideDirective
  ],
  entryComponents: []
})
export class SharedModule { }
