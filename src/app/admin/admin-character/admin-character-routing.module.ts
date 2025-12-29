import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCharacterOfficerFormComponent } from './admin-character-officer-form/admin-character-officer-form.component';
import { ViewComponent } from './admin-character-officer-form/view/view.component';
import { AdminCharacterComponent } from './admin-character.component';
import { ViewCharacterComponent } from './view-character/view-character.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCharacterComponent,
  },
  {
    path: 'view',
    component: ViewCharacterComponent,
  },
  {
    path: 'addForm',
    component: AdminCharacterOfficerFormComponent,
  },
  {
    path: 'editForm',
    component: AdminCharacterOfficerFormComponent,
  },
  {
    path: 'viewForm',
    component: ViewComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCharacterRoutingModule {}
