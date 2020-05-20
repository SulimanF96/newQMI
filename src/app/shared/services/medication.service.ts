import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  private medicationsListRef: AngularFireList<any>;

  constructor(private angularFireDatabase: AngularFireDatabase) {

    this.medicationsListRef = this.angularFireDatabase.list('/Medications');
  }

  getAllMedications() {
    return this.medicationsListRef;
  }

  searchForMedicationWithName(medicationName: string) {
    return this.medicationsListRef.query.orderByChild('name').equalTo(medicationName.toUpperCase()).once('value');
  }

  searchForMedicationWithArabicName(medicationName: string) {
    return this.medicationsListRef.query.orderByChild('nameAR').equalTo(medicationName.toUpperCase()).once('value');
  }

  searchForMedicationWithID(medicationID: string) {
    return this.medicationsListRef.query.orderByKey().equalTo(medicationID).once('value');
  }
}
