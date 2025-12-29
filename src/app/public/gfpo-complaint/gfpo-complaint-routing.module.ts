import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GfpoComplaintComponent } from './gfpo-complaint.component';

const routes: Routes = [
  {
    path: '',
    component: GfpoComplaintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GfpoComplaintRoutingModule {}
