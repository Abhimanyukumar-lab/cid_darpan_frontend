import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummeryComponent } from './summery.component';

const routes: Routes = [{ path: '', component: SummeryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummeryRoutingModule { }
