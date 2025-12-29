import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliceStationComponent } from './police-station.component';

const routes: Routes = [
  {
    path: '',
    component: PoliceStationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliceStationRoutingModule {}
