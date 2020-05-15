import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public credentials: FormGroup;

  constructor() { }

  ngOnInit() {
    this.credentials = new FormGroup({
      user_email: new FormControl('', Validators.required),
      user_password: new FormControl('', Validators.required),
    });
  }

  login() {
    console.log(this.credentials.value);
  }

}
