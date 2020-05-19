import { TranslationService } from './../../shared/services/translation.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-manually',
  templateUrl: './search-manually.page.html',
  styleUrls: ['./search-manually.page.scss'],
})
export class SearchManuallyPage implements OnInit {

  public medicationName: FormControl;
  public language = 'en';

  constructor(private router: Router, private translationService: TranslationService) { }

  ngOnInit() {
    this.medicationName = new FormControl('', Validators.required);
    this.translationService.language$.subscribe( language => {
      this.language = language;
    });
  }

  searchForMedication() {
    this.router.navigate(['/tabs/medication-details', { medicationName: this.medicationName.value.trim(), medicationID: null }]);
    this.medicationName.setValue('');
  }

}
