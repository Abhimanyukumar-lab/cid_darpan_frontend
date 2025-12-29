import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SrNsrCasesComponent } from './sr-nsr-cases.component';

const routes: Routes = [
  { path: '', component: SrNsrCasesComponent },
  {
    path: 'majorHead',
    loadChildren: () =>
      import('./major-head/major-head.module').then((m) => m.MajorHeadModule),
  },
  {
    path: 'subMajorHead',
    loadChildren: () =>
      import('./sub-major-head/sub-major-head.module').then(
        (m) => m.SubMajorHeadModule
      ),
  },
  {
    path: 'modusOperation',
    loadChildren: () =>
      import('./modus-operation/modus-operation.module').then(
        (m) => m.ModusOperationModule
      ),
  },
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
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then((m) => m.ViewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SrNsrCasesRoutingModule {}
