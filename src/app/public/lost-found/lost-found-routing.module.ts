import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LostFoundComponent } from './lost-found.component';

const routes: Routes = [
  {
    path: '',
    component: LostFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostFoundRoutingModule {}
