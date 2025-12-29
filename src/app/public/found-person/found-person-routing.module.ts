import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundPersonComponent } from './found-person.component';

const routes: Routes = [
  {
    path: '',
    component: FoundPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundPersonRoutingModule {}
