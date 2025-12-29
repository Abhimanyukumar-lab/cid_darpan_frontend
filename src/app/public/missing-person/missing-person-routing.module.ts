import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissingPersonComponent } from './missing-person.component';

const routes: Routes = [
  {
    path: '',
    component: MissingPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissingPersonRoutingModule {}
