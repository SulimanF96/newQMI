import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import * as Tesseract from 'tesseract.js';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-search-by-image',
  templateUrl: './search-by-image.component.html',
  styleUrls: ['./search-by-image.component.scss'],
})
export class SearchByImageComponent implements OnInit {

  private selectedImage: string;
  private extractedText: string;

  constructor(private actionSheetController: ActionSheetController, private camera: Camera, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() { }

  async selectSource() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Image source',
      mode: 'ios',
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.fetchPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.fetchPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          cssClass: 'red',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  fetchPicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: false
    };
    this.camera.getPicture(options).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      this.extractTextFromImage();
    });
  }

  async extractTextFromImage() {
    const loading = await this.loadingController.create({
      message: 'Extracting...',
    });
    await loading.present();
    Tesseract.recognize(this.selectedImage).then(({ data: { text } }) => {
      loading.dismiss();
      this.extractedText = text.trim();
      this.router.navigate(['/tabs/medication-details', { medicationName: this.extractedText, medicationID: null }]);
    }).catch(err => {
      console.log("error");
    });
  }

}
