import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.page.html',
  styleUrls: ['./medication-details.page.scss'],
})
export class MedicationDetailsPage implements OnInit {

  private medicationName: string;
  public selectedSegment = 'basic-details';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.medicationName = params.get('medicationName');
    });
  }

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

}
