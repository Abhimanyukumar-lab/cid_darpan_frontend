import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SrNsrCasesRoutingModule } from './sr-nsr-cases-routing.module';
import { SrNsrCasesComponent } from './sr-nsr-cases.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [SrNsrCasesComponent],
  imports: [
    CommonModule,
    SrNsrCasesRoutingModule,
    TranslateModule,
    TableDataModule,
    ModelModule,
    ImageViewerModule,
  ],
})
export class SrNsrCasesModule {}
