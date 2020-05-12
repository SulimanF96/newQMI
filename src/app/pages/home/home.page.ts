import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public medicationID: string;

  constructor(private alertController: AlertController, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  async confirmOpeningCameraForBarcode() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you want to open the camera ?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.scanBarcode();
          }
        }
      ]
    });

    await alert.present();
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
