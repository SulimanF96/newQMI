import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-by-barcode',
  templateUrl: './search-by-barcode.component.html',
  styleUrls: ['./search-by-barcode.component.scss'],
})
export class SearchByBarcodeComponent implements OnInit {


  constructor(private actionSheetController: ActionSheetController, private barcodeScanner: BarcodeScanner, private router: Router, private translateService: TranslateService) { }

  ngOnInit() { }

  async confirmOpeningCameraForBarcode() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('SEARCH_BY_BARCODE.BARCODE_AUTH_MESSAGE'),
      mode: 'ios',
      buttons: [{
        text: this.translateService.instant('SEARCH_BY_BARCODE.YES'),
        handler: () => {
          this.scanBarcode();
        }
      }, {
        text: this.translateService.instant('SEARCH_BY_BARCODE.NO'),
        cssClass: 'red',
        handler: () => {
          actionSheet.dismiss();
        }
      }]
    });
    await actionSheet.present();
  }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.searchForMedication(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  searchForMedication(medicationID: string) {
    this.router.navigate(['/tabs/medication-details', { medicationName: null, medicationID: medicationID }]);
  }

}
