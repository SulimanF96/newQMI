import { UserProfile } from './../../models/user-profile';
import { UserProfileService } from './../../shared/services/user-profile.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SearchByImageComponent } from './../../shared/components/search-by-image/search-by-image.component';
import { SearchByBarcodeComponent } from './../../shared/components/search-by-barcode/search-by-barcode.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(SearchByBarcodeComponent, { static: true }) searchBybarcodeComponent: SearchByBarcodeComponent;
  @ViewChild(SearchByImageComponent, { static: true }) searchByImageComponent: SearchByImageComponent;
  public userIsLoggedIn = false;
  public userProfile: UserProfile;

  constructor(private angularFireAuth: AngularFireAuth, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userIsLoggedIn = true;
      } else {
        this.userIsLoggedIn = false;
      }
    });

    this.userProfileService.userProfile$.subscribe(userProfile => {
      console.log(userProfile);
      this.userProfile = userProfile;
    });
  }

  openImageSearchDialog() {
    this.searchByImageComponent.selectSource();
  }

  openBarcodeScannerDialog() {
    this.searchBybarcodeComponent.confirmOpeningCameraForBarcode();
  }
}
