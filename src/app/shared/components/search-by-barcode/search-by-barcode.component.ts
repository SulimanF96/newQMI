import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-search-by-barcode',
  templateUrl: './search-by-barcode.component.html',
  styleUrls: ['./search-by-barcode.component.scss'],
})
export class SearchByBarcodeComponent implements OnInit {

  private medicationID: string;

  constructor(private actionSheetController: ActionSheetController, private barcodeScanner: BarcodeScanner) { }

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
      this.medicationID = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
