import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public credentials: FormGroup;

  constructor() { }

  ngOnInit() {
    this.credentials = new FormGroup({
      user_email: new FormControl('', Validators.required),
      user_password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    console.log(this.credentials.value);
  }

}
