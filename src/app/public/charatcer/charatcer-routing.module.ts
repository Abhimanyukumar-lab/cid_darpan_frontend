import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharatcerComponent } from './charatcer.component';

const routes: Routes = [
  {
    path: '',
    component: CharatcerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharatcerRoutingModule {}
