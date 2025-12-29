import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActsComponent } from './acts.component';

const routes: Routes = [
  {
    path: '',
    component: ActsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActsRoutingModule {}
