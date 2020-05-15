import { Storage } from '@ionic/storage';
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

  constructor(private authService: AuthService, private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    this.authService.createUser(this.credentials.value).then( user => {
      console.log(user);
      // create user profile
      this.storage.set('isLoggedIn', true);
      this.router.navigate(['tabs/home']);
    }).catch( error => {
      console.log(error);
      this.errorMessage = error.message;
    });
  }

}
