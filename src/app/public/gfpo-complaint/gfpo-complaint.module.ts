import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GfpoComplaintRoutingModule } from './gfpo-complaint-routing.module';
import { GfpoComplaintComponent } from './gfpo-complaint.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [GfpoComplaintComponent],
  imports: [
    CommonModule,
    GfpoComplaintRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    NgbAlertModule,
  ],
})
export class GfpoComplaintModule {}
