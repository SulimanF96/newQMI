import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UserProfileService } from './../../shared/services/user-profile.service';
import { TranslationService } from './../../shared/services/translation.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public language = 'en';
  public favorites = [];


  constructor(private translationService: TranslationService, private userProfileService: UserProfileService, private router: Router, public alertController: AlertController, private translateService: TranslateService) { }

  ngOnInit() {
    this.translationService.language$.subscribe(language => {
      this.language = language;
    });
    this.userProfileService.userProfile$.subscribe(userProfile => {
      if (userProfile.favorites !== undefined) {
        this.favorites = userProfile.favorites;
      }
    });
  }

  ionViewWillEnter() {
    this.userProfileService.userProfile$.subscribe(userProfile => {
      if (userProfile.favorites !== undefined) {
        this.favorites = userProfile.favorites;
      }
    });
  }

  searchForMedication(medicationName: string) {
    this.router.navigate(['/tabs/medication-details', { medicationName: medicationName, medicationID: null }]);
  }

  deleteFromFavorites(medicationName: string) {
    this.userProfileService.deleteFromFavorites(medicationName).then( res => {
      console.log(medicationName, 'was removed from favs');
      delete this.favorites[this.favorites.indexOf(medicationName)];
    }).catch( error => {
      console.log(error);
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('FAVORITES.CONFIRMATION'),
      message: this.translateService.instant('FAVORITES.CONFIRMATION_MESSAGE'),
      buttons: [
        {
          text: this.translateService.instant('FAVORITES.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translateService.instant('FAVORITES.YES'),
          handler: () => {
            this.clearFavorites();
          }
        }
      ]
    });

    await alert.present();
  }

  clearFavorites() {
    this.userProfileService.clearFavorites().then( res => {
      this.favorites = [];
      console.log('favs cleared');
    }).catch( error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.favorites = [];
  }

}
