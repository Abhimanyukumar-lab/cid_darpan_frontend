import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActsRoutingModule } from './acts-routing.module';
import { ActsComponent } from './acts.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ActsComponent],
  imports: [CommonModule, ActsRoutingModule, TranslateModule],
})
export class ActsModule {}
