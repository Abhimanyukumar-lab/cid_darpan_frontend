import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoGarrelyComponent } from './video-garrely.component';

const routes: Routes = [
  {
    path: '',
    component: VideoGarrelyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoGarrelyRoutingModule {}
