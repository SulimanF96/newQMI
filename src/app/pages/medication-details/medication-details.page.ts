import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.page.html',
  styleUrls: ['./medication-details.page.scss'],
})
export class MedicationDetailsPage implements OnInit {

  private medicationName: string;
  public data = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.medicationName = params.get('medicationName');
    });
    setTimeout(() => {
      this.data = true;
    }, 1000);
  }
}
