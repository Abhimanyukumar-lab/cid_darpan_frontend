import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SrNsrRoutingModule } from './sr-nsr-routing.module';
import { SrNsrComponent } from './sr-nsr.component';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModifyComponent } from './modify/modify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [SrNsrComponent, ModifyComponent, ViewComponent],
  imports: [
    CommonModule,
    SrNsrRoutingModule,
    TableDataModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ImageViewerModule,
  ],
})
export class SrNsrModule {}
