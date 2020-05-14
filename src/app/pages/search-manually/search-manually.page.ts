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

  constructor(private router: Router) { }

  ngOnInit() {
    this.medicationName = new FormControl('', Validators.required);
  }

  searchForMedication() {
    this.router.navigate(['/tabs/medication-details', { medicationName: this.medicationName.value.trim(), medicationID: null }]);
    this.medicationName.setValue('');
  }

}
