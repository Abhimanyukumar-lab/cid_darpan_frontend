import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressReleaseComponent } from './press-release.component';

const routes: Routes = [
  {
    path: '',
    component: PressReleaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PressReleaseRoutingModule {}
