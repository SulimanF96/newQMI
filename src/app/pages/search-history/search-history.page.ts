import { Router } from '@angular/router';
import { UserProfileService } from './../../shared/services/user-profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from './../../shared/services/translation.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.page.html',
  styleUrls: ['./search-history.page.scss'],
})
export class SearchHistoryPage implements OnInit, OnDestroy {

  public language = 'en';
  public searchHistory = [];

  constructor(private translationService: TranslationService, private userProfileService: UserProfileService, private router: Router) { }

  ngOnInit() {
    this.translationService.language$.subscribe(language => {
      this.language = language;
    });
    this.userProfileService.userProfile$.subscribe(userProfile => {
      if (userProfile.history !== undefined) {
        this.searchHistory = userProfile.history;
      }
    });
  }

  ionViewWillEnter() {
    this.userProfileService.userProfile$.subscribe(userProfile => {
      if (userProfile.history !== undefined) {
        this.searchHistory = userProfile.history;
      }
    });
  }

  searchForMedication(medicationName: string) {
    this.router.navigate(['/tabs/medication-details', { medicationName: medicationName, medicationID: null }]);
  }

  ngOnDestroy() {
    this.searchHistory = [];
  }

}
