import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { ComplaintComponent } from './complaint.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ComplaintComponent],
  imports: [
    CommonModule,
    ComplaintRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    NgbAlertModule,
  ],
})
export class ComplaintModule {}
