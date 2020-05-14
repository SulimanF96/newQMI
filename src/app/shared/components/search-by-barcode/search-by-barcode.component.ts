import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-by-barcode',
  templateUrl: './search-by-barcode.component.html',
  styleUrls: ['./search-by-barcode.component.scss'],
})
export class SearchByBarcodeComponent implements OnInit {


  constructor(private actionSheetController: ActionSheetController, private barcodeScanner: BarcodeScanner, private router: Router) { }

  ngOnInit() { }

  async confirmOpeningCameraForBarcode() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Do you want to open your camera ?',
      mode: 'ios',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.scanBarcode();
        }
      }, {
        text: 'No',
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
