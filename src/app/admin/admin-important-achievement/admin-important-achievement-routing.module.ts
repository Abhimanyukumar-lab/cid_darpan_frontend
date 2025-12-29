import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminImportantAchievementComponent } from './admin-important-achievement.component';

const routes: Routes = [
  { path: '', component: AdminImportantAchievementComponent },
  {
    path: 'add',
    loadChildren: () =>
      import('./modify/modify.module').then((m) => m.ModifyModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./modify/modify.module').then((m) => m.ModifyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminImportantAchievementRoutingModule {}
