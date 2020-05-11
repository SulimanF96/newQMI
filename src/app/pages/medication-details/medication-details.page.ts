import { MedicationService } from './../../services/medication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.page.html',
  styleUrls: ['./medication-details.page.scss'],
})
export class MedicationDetailsPage implements OnInit {

  public medicationName: string;
  public dataStatus = 'loading';
  public medicationDetails = {};

  constructor(private route: ActivatedRoute, private medicationService: MedicationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.medicationName = params.get('medicationName');
    });
    this.serachForMedication(this.medicationName);
    this.medicationService.getAllMedications().valueChanges().subscribe(res => {
      console.log(res);
    });
  }

  serachForMedication(medicationName: string) {
    this.medicationService.searchForMedication(medicationName).then((medicationDetails) => {
      console.log(medicationDetails.val());
      this.medicationDetails = medicationDetails.val();
      this.dataStatus = 'found';
    }).catch((error) => {
      this.dataStatus = 'not found';
    });
  }

  searchAgain() {
    // this.dataStatus = 'loading';
    // searchForMedication();
  }
}
