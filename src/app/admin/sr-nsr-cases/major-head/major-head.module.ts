import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MajorHeadRoutingModule } from './major-head-routing.module';
import { MajorHeadComponent } from './major-head.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';

@NgModule({
  declarations: [MajorHeadComponent],
  imports: [
    CommonModule,
    MajorHeadRoutingModule,
    TranslateModule,
    TableDataModule,
  ],
})
export class MajorHeadModule {}
