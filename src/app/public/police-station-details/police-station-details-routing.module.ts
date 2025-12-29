import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliceStationDetailsComponent } from './police-station-details.component';

const routes: Routes = [
  {
    path: '',
    component: PoliceStationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliceStationDetailsRoutingModule {}
