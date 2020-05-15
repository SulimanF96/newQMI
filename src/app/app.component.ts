import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private angularFireAuth: AngularFireAuth
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
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          // fetch user profile
          console.log('profile is fetched', user);
        } else {
          console.log('no user so no profile', user);
        }
      });
    });
  }
}
