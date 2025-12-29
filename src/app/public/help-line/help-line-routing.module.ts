import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpLineComponent } from './help-line.component';

const routes: Routes = [
  {
    path: '',
    component: HelpLineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpLineRoutingModule {}
