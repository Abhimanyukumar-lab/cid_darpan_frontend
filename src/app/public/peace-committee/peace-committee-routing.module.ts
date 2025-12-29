import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeaceCommitteeComponent } from './peace-committee.component';

const routes: Routes = [
  {
    path: '',
    component: PeaceCommitteeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeaceCommitteeRoutingModule {}
