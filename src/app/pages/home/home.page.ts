import { SearchByImageComponent } from './../../shared/components/search-by-image/search-by-image.component';
import { SearchByBarcodeComponent } from './../../shared/components/search-by-barcode/search-by-barcode.component';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(SearchByBarcodeComponent, { static: true }) searchBybarcodeComponent: SearchByBarcodeComponent;
  @ViewChild(SearchByImageComponent, { static: true }) searchByImageComponent: SearchByImageComponent;

  constructor() { }

  ngOnInit() {
  }

  openImageSearchDialog() {
    this.searchByImageComponent.selectSource();
  }

  openBarcodeScannerDialog() {
    this.searchBybarcodeComponent.confirmOpeningCameraForBarcode();
  }
}
