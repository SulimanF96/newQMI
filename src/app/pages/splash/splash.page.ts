import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    setTimeout(() => {
      this.angularFireAuth.authState.subscribe(res => {
        if (res) {
          this.router.navigateByUrl('/tabs');
        } else {
          this.router.navigateByUrl('/tabs/login');
        }
      });
    }, 300);
  }

}
