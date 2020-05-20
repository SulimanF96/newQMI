import { TranslationService } from './../../shared/services/translation.service';
import { MedicationService } from '../../shared/services/medication.service';
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
  private medicationID: string;
  public dataStatus = 'loading';
  public medicationDetails: Medication;
  public language = 'en';

  constructor(private route: ActivatedRoute, private medicationService: MedicationService, private translationService: TranslationService) { }

  ngOnInit() {
    this.translationService.language$.subscribe(language => {
      this.language = language;
    });
    this.route.params.subscribe(params => {
      this.medicationName = params['medicationName'];
      this.medicationID = params['medicationID'];
    });
    this.medicationID === 'null' ? this.serachForMedicationWithName(this.medicationName) : this.serachForMedicationWithID(this.medicationID);
  }

  serachForMedicationWithName(medicationName: string) {
    if (!this.isArabic(medicationName)) {
      this.medicationService.searchForMedicationWithName(medicationName).then((medicationDetails) => {
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
    } else {
      this.medicationService.searchForMedicationWithArabicName(medicationName).then((medicationDetails) => {
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
  }

  serachForMedicationWithID(medicationID: string) {
    this.medicationService.searchForMedicationWithID(medicationID).then((medicationDetails) => {
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
      this.medicationID === 'null' ? this.serachForMedicationWithName(this.medicationName) : this.serachForMedicationWithID(this.medicationID);
    }, 500);
  }

  doRefresh(event) {
    this.dataStatus = 'loading';
    setTimeout(() => {
      this.medicationID === 'null' ? this.serachForMedicationWithName(this.medicationName) : this.serachForMedicationWithID(this.medicationID);
      event.target.complete();
    }, 500);
  }

  isArabic(text) {
    const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    const result = pattern.test(text);
    return result;
  }
}
