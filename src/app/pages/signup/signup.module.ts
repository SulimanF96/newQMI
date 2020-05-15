import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    SharedModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
