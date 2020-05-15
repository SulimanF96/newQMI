import { Storage } from '@ionic/storage';
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

  constructor(private authService: AuthService, private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    console.log(this.credentials.value);
    this.authService.login(this.credentials.value).then(user => {
      // fetch profile with id
      this.storage.set('isLoggedIn', true);
      this.credentials.reset();
      this.router.navigate(['tabs/home']);
    }).catch(error => {
      console.log(error);
      this.errorMessage = error.message;
    });
  }

}
