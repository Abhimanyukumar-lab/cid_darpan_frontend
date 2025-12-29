import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyComponent } from './modify/modify.component';
import { SrNsrComponent } from './sr-nsr.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: SrNsrComponent,
  },
  {
    path: 'add',
    component: ModifyComponent,
  },
  {
    path: 'edit',
    component: ModifyComponent,
  },
  {
    path: 'view',
    component: ViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SrNsrRoutingModule {}
