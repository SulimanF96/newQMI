import { UserProfileService } from './../../shared/services/user-profile.service';
import { AuthService } from './../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public credentials: FormGroup;
  public errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    console.log(this.credentials.value);
    this.authService.login(this.credentials.value).then(user => {
      this.getUserProfile(user.user.uid);
      this.credentials.reset();
      this.router.navigate(['tabs/home']);
    }).catch(error => {
      console.log(error);
      this.errorMessage = error.message;
    });
  }

  getUserProfile(userID: string) {
    this.userProfileService.getUserProfile(userID).then(userProfile => {
      userProfile.forEach((userProfile) => {
        console.log(userProfile.val());
        this.userProfileService.userProfile$.next(userProfile.val());
      });
    }).catch(error => {
      console.log(error);
    });
  }

}
