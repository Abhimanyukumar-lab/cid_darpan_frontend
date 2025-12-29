import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeStatusComponent } from './change-status.component';
import { ChangeStatusFormComponent } from './change-status-form/change-status-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';

@NgModule({
  declarations: [ChangeStatusComponent, ChangeStatusFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableDataModule,
  ],
  exports: [ChangeStatusComponent, ChangeStatusFormComponent],
})
export class ChangeStatusModule {}
