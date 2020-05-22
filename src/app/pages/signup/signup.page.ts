import { TranslationService } from './../../shared/services/translation.service';
import { UserProfileService } from './../../shared/services/user-profile.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public credentials: FormGroup;
  public errorMessage: string;
  public loading = false;
  public language = 'en';

  constructor(private authService: AuthService, private router: Router, private userProfileService: UserProfileService, private toast: ToastController, private translationService: TranslationService, private translateService: TranslateService) { }

  ngOnInit() {
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.translationService.language$.subscribe( language =>  {
      this.language = language;
    });
  }

  ionViewDidLeave() {
    this.credentials.reset();
    this.errorMessage = '';
  }

  signUp() {
    this.loading = true;
    this.authService.createUser(this.credentials.value).then(user => {
      console.log(user);
      this.createUserProfile(user.user.uid, user.user.email);
      this.presentToast(user.user.email.substring(0, user.user.email.indexOf('@')));
      this.loading = false;
      this.credentials.reset();
      this.router.navigate(['tabs/home']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
      this.errorMessage = error.message;
      if (this.errorMessage.includes('email')) {
        this.credentials.reset();
      } else {
        this.credentials.get('password').reset();
      }
    });
  }

  createUserProfile(userID: string, email: string) {
    this.userProfileService.createUserProfile(userID, email).then(res => {
      console.log(res);
      this.userProfileService.userID$.next(userID);
    }).catch(error => {
      console.log(error);
    });
  }

  async presentToast(username: string) {
    const toast = await this.toast.create({
      position: 'top',
      cssClass: 'toast',
      message: this.translateService.instant('SIGNUP.SIGNUP_MESSAGE') + ' ' + username,
      duration: 2000
    });
    toast.present();
  }

}
