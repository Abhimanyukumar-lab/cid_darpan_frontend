import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportantPlacesComponent } from './important-places.component';

const routes: Routes = [
  {
    path: '',
    component: ImportantPlacesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportantPlacesRoutingModule {}
