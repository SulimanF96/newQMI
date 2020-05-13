import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-search-by-image',
  templateUrl: './search-by-image.component.html',
  styleUrls: ['./search-by-image.component.scss'],
})
export class SearchByImageComponent implements OnInit {

  private selectedImage: string;

  constructor(private actionSheetController: ActionSheetController, private camera: Camera) { }

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
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: false
    }
    this.camera.getPicture(options).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      //this.recognizeImage();
    });
  }

  // recognizeImage() {
  //   const loading = this.load.create({
  //     content: 'Extracting medication name....'
  //   });
  //   loading.present();
  //   Tesseract.recognize(this.selectedImage)
  //   .catch(err => console.log("error"))
  //   .then(result => {
  //     this.imageText = result.text.trim();
  //     loading.dismiss();
  //   })
  //   .finally(resultOrError => {
  //    // this.progress.complete();
  //     this.searchResultPage();
  //   });
  //   //console.log("bashbfhvdhaf");
  // }

}
