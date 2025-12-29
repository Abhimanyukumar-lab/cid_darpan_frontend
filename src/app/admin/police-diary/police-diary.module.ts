import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliceDiaryRoutingModule } from './police-diary-routing.module';
import { PoliceDiaryComponent } from './police-diary.component';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PoliceDiaryComponent],
  imports: [
    CommonModule,
    PoliceDiaryRoutingModule,
    TableDataModule,
    TranslateModule,
  ],
})
export class PoliceDiaryModule {}
