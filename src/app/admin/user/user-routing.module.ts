import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { UserComponent } from './user.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'updateProfile',
    component: UpdateUserProfileComponent,
  },
  {
    path: 'viewProfile',
    component: ViewUserProfileComponent,
  },
  {
    path: 'add',
    component: ModifyUserComponent,
  },
  {
    path: 'edit',
    component: ModifyUserComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
