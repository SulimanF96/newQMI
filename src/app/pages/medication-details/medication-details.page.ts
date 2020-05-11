import { MedicationService } from './../../services/medication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medication } from '../../models/medication-details';

@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.page.html',
  styleUrls: ['./medication-details.page.scss'],
})
export class MedicationDetailsPage implements OnInit {

  public medicationName: string;
  public dataStatus = 'loading';
  public medicationDetails: Medication;

  constructor(private route: ActivatedRoute, private medicationService: MedicationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.medicationName = params.get('medicationName');
    });
    this.serachForMedication(this.medicationName);
  }

  serachForMedication(medicationName: string) {
    this.medicationService.searchForMedication(medicationName).then((medicationDetails) => {
      if (medicationDetails.val() != null) {
        medicationDetails.forEach((medicationDetails) => {
          this.medicationDetails = medicationDetails.val();
        });
        this.dataStatus = 'found';
      } else {
        this.dataStatus = 'not found';
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  searchAgain() {
    this.dataStatus = 'loading';
    setTimeout(() => {
      this.serachForMedication(this.medicationName);
    }, 500);
  }

  doRefresh(event) {
    this.dataStatus = 'loading';
    setTimeout(() => {
      this.serachForMedication(this.medicationName);
      event.target.complete();
    }, 500);
  }
}
