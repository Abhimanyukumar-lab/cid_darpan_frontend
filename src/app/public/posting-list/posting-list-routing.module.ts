import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostingListComponent } from './posting-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostingListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostingListRoutingModule {}
