import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-manually',
  templateUrl: './search-manually.page.html',
  styleUrls: ['./search-manually.page.scss'],
})
export class SearchManuallyPage implements OnInit {

  public medicationName: FormControl;

  constructor() { }

  ngOnInit() {
    this.medicationName = new FormControl('', Validators.required);
  }

  searchForMedication() {
    console.log(this.medicationName.value);
  }

}
