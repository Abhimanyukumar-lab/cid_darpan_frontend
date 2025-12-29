import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliceDiaryComponent } from './police-diary.component';

const routes: Routes = [
  { path: '', component: PoliceDiaryComponent },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then((m) => m.AddModule),
  },
  {
    path: 'edit',
    loadChildren: () => import('./add/add.module').then((m) => m.AddModule),
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then((m) => m.ViewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliceDiaryRoutingModule {}
