import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDownloadComponent } from './character-download.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterDownloadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterDownloadRoutingModule {}
