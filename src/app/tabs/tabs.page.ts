import { SearchByBarcodeComponent } from './../shared/components/search-by-barcode/search-by-barcode.component';
import { SearchByImageComponent } from './../shared/components/search-by-image/search-by-image.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild(SearchByBarcodeComponent, { static: true }) searchBybarcodeComponent: SearchByBarcodeComponent;
  @ViewChild(SearchByImageComponent, { static: true }) searchByImageComponent: SearchByImageComponent;

  constructor() { }

  openImageSearchDialog() {
    this.searchByImageComponent.selectSource();
  }

  openBarcodeScannerDialog() {
    this.searchBybarcodeComponent.confirmOpeningCameraForBarcode();
  }

}
