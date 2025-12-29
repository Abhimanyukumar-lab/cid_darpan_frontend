import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriminalListComponent } from './criminal-list.component';

const routes: Routes = [
  {
    path: '',
    component: CriminalListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriminalListRoutingModule {}
