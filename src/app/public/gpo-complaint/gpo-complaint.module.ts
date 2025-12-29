import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpoComplaintRoutingModule } from './gpo-complaint-routing.module';
import { GpoComplaintComponent } from './gpo-complaint.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [GpoComplaintComponent],
  imports: [
    CommonModule,
    GpoComplaintRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    NgbAlertModule,
  ],
})
export class GpoComplaintModule {}
