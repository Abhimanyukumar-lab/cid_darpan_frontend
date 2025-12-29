import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolydayListComponent } from './holyday-list.component';

const routes: Routes = [
  {
    path: '',
    component: HolydayListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolydayRoutingModule {}
