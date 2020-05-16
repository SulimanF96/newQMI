import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { UserProfileService } from './../../shared/services/user-profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild(LanguageSwitcherComponent, { static: true }) languageSwitcher: LanguageSwitcherComponent;
  @ViewChild(ThemeSwitcherComponent, { static: true }) themeSwitcher: ThemeSwitcherComponent;
  public userIsLoggedIn = false;
  public language = 'en';
  public color = '#69bb7bff';
  private username: string;

  constructor(public authService: AuthService,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private userProfileService: UserProfileService,
    private toast: ToastController) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userIsLoggedIn = true;
        this.username = user.email.substring(0, user.email.indexOf('@'));
      } else {
        this.userIsLoggedIn = false;
      }
    });
  }

  openLanguageSwitcherDialog() {
    this.languageSwitcher.presentActionSheetForLanguage();
  }

  openThemeSwitcherDialog() {
    this.themeSwitcher.presentActionSheetForChangingTheme();
  }

  logout() {
    this.authService.logout().then(res => {
      console.log('user was logged out', res);
      this.userProfileService.userProfile$.next(null);
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
      message: `${username} was logged out successfully.`,
      duration: 2000
    });
    toast.present();
  }
}
