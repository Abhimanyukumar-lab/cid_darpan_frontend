import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizenReportRoutingModule } from './citizen-report-routing.module';
import { CitizenReportComponent } from './citizen-report.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CitizenReportComponent],
  imports: [
    CommonModule,
    CitizenReportRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    NgbAlertModule,
  ],
})
export class CitizenReportModule {}
