import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchManuallyPageRoutingModule } from './search-manually-routing.module';

import { SearchManuallyPage } from './search-manually.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchManuallyPageRoutingModule,
    SharedModule
  ],
  declarations: [SearchManuallyPage]
})
export class SearchManuallyPageModule {}
