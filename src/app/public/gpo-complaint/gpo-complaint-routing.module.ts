import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpoComplaintComponent } from './gpo-complaint.component';

const routes: Routes = [
  {
    path: '',
    component: GpoComplaintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpoComplaintRoutingModule {}
