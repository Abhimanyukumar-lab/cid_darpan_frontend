import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageFromSpComponent } from './message-from-sp.component';

const routes: Routes = [
  {
    path: '',
    component: MessageFromSpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageFromSpRoutingModule {}
