import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent as DashboardComponentPage } from './pages/dashboard/dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './pages/apply-leave/apply-leave.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { HistoryComponent } from './pages/history/history.component';
import { PermissionDenialComponent } from '../common/permission-denial/permission-denial.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponentPage,
      },
      {
        path: 'apply',
        component: ApplyLeaveComponent,
      },
      {
        path: 'holiday',
        component: HolidaysComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'permissionDenial',
        component: PermissionDenialComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
