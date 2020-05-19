import { Component, OnInit } from '@angular/core';
import { TranslationService } from './../../shared/services/translation.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.page.html',
  styleUrls: ['./search-history.page.scss'],
})
export class SearchHistoryPage implements OnInit {

  public language = 'en';

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.translationService.language$.subscribe( language => {
      this.language = language;
    });
  }

}
