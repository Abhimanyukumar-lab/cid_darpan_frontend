import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsEventDetailsComponent } from './news-event-details.component';

const routes: Routes = [{ path: '', component: NewsEventDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsEventDetailsRoutingModule { }
