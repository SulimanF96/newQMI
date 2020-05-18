import { TranslationService } from './../../shared/services/translation.service';
import { UserProfileService } from './../../shared/services/user-profile.service';
import { AuthService } from './../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public credentials: FormGroup;
  public errorMessage: string;
  public loading = false;
  public language = 'en';

  constructor(private authService: AuthService, private router: Router, private userProfileService: UserProfileService, private toast: ToastController, private translationService: TranslationService) { }

  ngOnInit() {
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.translationService.language$.subscribe( language => {
      this.language = language;
    })
  }

  ionViewDidLeave() {
    this.credentials.reset();
    this.errorMessage = '';
  }

  login() {
    console.log(this.credentials.value);
    this.loading = true;
    this.authService.login(this.credentials.value).then(user => {
      this.getUserProfile(user.user.uid);
      this.credentials.reset();
      this.errorMessage = '';
      this.loading = false;
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

  getUserProfile(userID: string) {
    this.userProfileService.getUserProfile(userID).then(userProfile => {
      userProfile.forEach((userProfile) => {
        console.log(userProfile.val());
        this.presentToast(userProfile.val().username);
        this.userProfileService.userProfile$.next(userProfile.val());
      });
    }).catch(error => {
      console.log(error);
    });
  }

  async presentToast(username: string) {
    const toast = await this.toast.create({
      position: 'top',
      cssClass: 'toast',
      message: `${username} was logged in successfully.`,
      duration: 2000
    });
    toast.present();
  }

}
