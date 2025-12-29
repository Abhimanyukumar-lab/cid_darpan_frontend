import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModusOperationRoutingModule } from './modus-operation-routing.module';
import { ModusOperationComponent } from './modus-operation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModusOperationComponent],
  imports: [
    CommonModule,
    ModusOperationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableDataModule,
    TranslateModule,
  ],
})
export class ModusOperationModule {}
