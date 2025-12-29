import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataComponent } from './table-data.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { ModelModule } from '../popup/model/model.module';
import { DownloadModule } from 'src/app/admin/admin-character/download/download.module';

@NgModule({
  declarations: [TableDataComponent],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    NgxDatatableModule,
    ImageViewerModule,
    ModelModule,
    DownloadModule,
  ],
  exports: [TableDataComponent],
})
export class TableDataModule {}
