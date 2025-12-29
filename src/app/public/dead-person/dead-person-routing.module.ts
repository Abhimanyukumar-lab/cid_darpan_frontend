import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeadPersonComponent } from './dead-person.component';

const routes: Routes = [
  {
    path: '',
    component: DeadPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeadPersonRoutingModule {}
