import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchManuallyPage } from './search-manually.page';

const routes: Routes = [
  {
    path: '',
    component: SearchManuallyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchManuallyPageRoutingModule {}
