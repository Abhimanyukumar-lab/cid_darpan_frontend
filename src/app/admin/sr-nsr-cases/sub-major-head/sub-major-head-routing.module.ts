import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubMajorHeadComponent } from './sub-major-head.component';

const routes: Routes = [
  { path: '', component: SubMajorHeadComponent },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then((m) => m.AddModule),
  },
  {
    path: 'edit',
    loadChildren: () => import('./add/add.module').then((m) => m.AddModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubMajorHeadRoutingModule {}
