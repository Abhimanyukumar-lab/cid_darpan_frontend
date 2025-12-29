import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeaceCommitteeRoutingModule } from './peace-committee-routing.module';
import { PeaceCommitteeComponent } from './peace-committee.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PeaceCommitteeComponent],
  imports: [CommonModule, PeaceCommitteeRoutingModule, TranslateModule],
})
export class PeaceCommitteeModule {}
