import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationDetailsPageRoutingModule } from './medication-details-routing.module';

import { MedicationDetailsPage } from './medication-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicationDetailsPageRoutingModule
  ],
  declarations: [MedicationDetailsPage]
})
export class MedicationDetailsPageModule {}
