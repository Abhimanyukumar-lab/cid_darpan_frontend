import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModusOperationComponent } from './modus-operation.component';

const routes: Routes = [
  { path: '', component: ModusOperationComponent },
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
export class ModusOperationRoutingModule {}
