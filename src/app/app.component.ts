import { Router } from '@angular/router';
import { UserProfileService } from './shared/services/user-profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private angularFireAuth: AngularFireAuth,
    private userProfileService: UserProfileService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.statusBar.styleDefault();
      // this.statusBar.backgroundColorByName('black');
      // this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      this.router.navigateByUrl('/splash');
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          this.userProfileService.getUserProfile(user.uid).then(userProfile => {
            userProfile.forEach((userProfile) => {
              this.userProfileService.userProfile$.next(userProfile.val());
              this.userProfileService.userID$.next(user.uid);
            });
          }).catch(error => {
            console.log(error);
          });
          console.log('profile is fetched', user.uid);
        } else {
          console.log('no user so no profile', user);
        }
      });
    });
  }
}
