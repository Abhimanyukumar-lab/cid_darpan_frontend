import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressReleaseDetailsComponent } from './press-release-details.component';

const routes: Routes = [{ path: '', component: PressReleaseDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressReleaseDetailsRoutingModule { }
