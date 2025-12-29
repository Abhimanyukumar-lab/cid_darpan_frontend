import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubMajorHeadRoutingModule } from './sub-major-head-routing.module';
import { SubMajorHeadComponent } from './sub-major-head.component';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SubMajorHeadComponent],
  imports: [
    CommonModule,
    SubMajorHeadRoutingModule,
    TableDataModule,
    TranslateModule,
  ],
})
export class SubMajorHeadModule {}
