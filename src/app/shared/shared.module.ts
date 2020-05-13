import { SearchByImageComponent } from './components/search-by-image/search-by-image.component';
import { SearchByBarcodeComponent } from './components/search-by-barcode/search-by-barcode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ SearchByImageComponent, SearchByBarcodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SearchByImageComponent,
    SearchByBarcodeComponent
  ],
  entryComponents: []
})
export class SharedModule { }
