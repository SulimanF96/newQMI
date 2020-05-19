import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import * as Tesseract from 'tesseract.js';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-by-image',
  templateUrl: './search-by-image.component.html',
  styleUrls: ['./search-by-image.component.scss'],
})
export class SearchByImageComponent implements OnInit {

  private selectedImage: string;
  private extractedText: string;

  constructor(private actionSheetController: ActionSheetController, private camera: Camera, private router: Router, private loadingController: LoadingController, private translateService: TranslateService) { }

  ngOnInit() { }

  async selectSource() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('SEARCH_BY_IMAGE.IMAGE_SOURCE'),
      mode: 'ios',
      buttons: [
        {
          text: this.translateService.instant('SEARCH_BY_IMAGE.USE_LIBRARY'),
          handler: () => {
            this.fetchPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: this.translateService.instant('SEARCH_BY_IMAGE.CAPTURE_IMAGE'),
          handler: () => {
            this.fetchPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: this.translateService.instant('CANCEL'),
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
      message: this.translateService.instant('SEARCH_BY_IMAGE.EXTRACTING_MESSAGE'),
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
