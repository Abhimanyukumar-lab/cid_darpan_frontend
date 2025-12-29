import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessionListComponent } from './succession-list.component';

const routes: Routes = [
  {
    path: '',
    component: SuccessionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessionListRoutingModule {}
