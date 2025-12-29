import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizenReportComponent } from './citizen-report.component';

const routes: Routes = [
  {
    path: '',
    component: CitizenReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenReportRoutingModule {}
