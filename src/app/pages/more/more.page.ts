import { Component, OnInit } from '@angular/core';
import { UserProfile } from './../../models/user-profile';
import { UserProfileService } from './../../shared/services/user-profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslationService } from './../../shared/services/translation.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  public userIsLoggedIn = false;
  public userProfile: UserProfile;
  private username: string;
  public language = 'en';

  constructor(private angularFireAuth: AngularFireAuth, private userProfileService: UserProfileService, private authService: AuthService, private router: Router, private toast: ToastController, private translationService: TranslationService, private translateService: TranslateService) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userIsLoggedIn = true;
        this.username = user.email.substring(0, user.email.indexOf('@'));
      } else {
        this.userIsLoggedIn = false;
      }
    });

    this.userProfileService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
    });

    this.translationService.language$.subscribe( language => {
      this.language = language;
    });
  }

  logout() {
    this.authService.logout().then(res => {
      console.log('user was logged out', res);
      this.userProfileService.userProfile$.next(null);
      this.userProfileService.userID$.next(null);
      this.presentToast(this.username);
      this.router.navigate(['tabs/home']);
    }).catch(error => {
      console.log('user was not logged out', error);
    });
  }

  async presentToast(username: string) {
    const toast = await this.toast.create({
      position: 'top',
      cssClass: 'toast',
      message: this.translateService.instant('MORE.LOGOUT_MESSAGE') + username,
      duration: 2000
    });
    toast.present();
  }

}
