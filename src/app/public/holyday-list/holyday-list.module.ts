import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolydayRoutingModule } from './holyday-list-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { HolydayListComponent } from './holyday-list.component';

@NgModule({
  declarations: [HolydayListComponent],
  imports: [CommonModule,  HolydayRoutingModule, TranslateModule],
})


export class HolydayListModule {}
