import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.page.html',
  styleUrls: ['./user-guide.page.scss'],
})
export class UserGuidePage implements OnInit {

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    centeredSlides: true
  };

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
  }

  async finish() {
    await this.storage.set('userGuideCompleted', true);
    this.router.navigate(['tabs/home']);
  }

  next() {
    this.slides.slideNext();
  }

}
