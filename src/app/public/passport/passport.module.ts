import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';
import { PassportComponent } from './passport.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PassportComponent],
  imports: [
    CommonModule,
    PassportRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    NgbAlertModule,
  ],
})
export class PassportModule {}
