import { UserProfileService } from './../../shared/services/user-profile.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public credentials: FormGroup;
  public errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    this.authService.createUser(this.credentials.value).then(user => {
      console.log(user);
      this.createUserProfile(user.user.uid, user.user.email);
      this.router.navigate(['tabs/home']);
    }).catch(error => {
      console.log(error);
      this.errorMessage = error.message;
    });
  }

  createUserProfile(userID: string, email: string) {
    this.userProfileService.createUserProfile(userID, email).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }

}
