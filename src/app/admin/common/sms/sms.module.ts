import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsSendingComponent } from './sms-sending/sms-sending.component';
import { SmsSendingFormComponent } from './sms-sending-form/sms-sending-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';

@NgModule({
  declarations: [SmsSendingComponent, SmsSendingFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableDataModule,
  ],
  exports: [SmsSendingComponent, SmsSendingFormComponent],
})
export class SmsModule {}
