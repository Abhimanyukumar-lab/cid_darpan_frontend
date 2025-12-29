import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './common/error/error.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { PermissionDenialComponent } from './common/permission-denial/permission-denial.component';
import { UnderDevelopmentComponent } from './common/under-development/under-development.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HolydayListComponent } from './public/holyday-list/holyday-list.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public-module.module').then((m) => m.PublicModuleModule),
  },
  {
    path: 'official',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModuleModule),
  },
  {
    path: 'officialResource',
    loadChildren: () =>
      import('./resource/resource.module').then((m) => m.ResourceModule),
  },
  {
    path: 'permissionDenial',
    component: PermissionDenialComponent,
  },
  {
    path: 'underDevelopment',
    component: UnderDevelopmentComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'underDevelopment',
    component: UnderDevelopmentComponent,
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'holydayList',
    component: HolydayListComponent,
  },
  {
    path: 'summery',
    loadChildren: () =>
      import('./summery/summery.module').then((m) => m.SummeryModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
