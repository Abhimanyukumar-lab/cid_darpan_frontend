import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCharacterRoutingModule } from './admin-character-routing.module';
import { AdminCharacterComponent } from './admin-character.component';
import { ViewCharacterComponent } from './view-character/view-character.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { DownloadModule } from './download/download.module';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { SmsModule } from '../common/sms/sms.module';
import { ForwardModule } from '../common/forward/forward.module';
import { AssignToOfficerModule } from '../common/assign-to-officer/assign-to-officer.module';
import { ChangeStatusModule } from '../common/change-status/change-status.module';
import { UploadCertModule } from '../common/upload-cert/upload-cert.module';
import { AdminCharacterOfficerFormComponent } from './admin-character-officer-form/admin-character-officer-form.component';
import { ViewComponent } from './admin-character-officer-form/view/view.component';

@NgModule({
  declarations: [
    AdminCharacterComponent,
    ViewCharacterComponent,
    AdminCharacterOfficerFormComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    AdminCharacterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableDataModule,
    DownloadModule,
    ModelModule,
    ImageViewerModule,
    SmsModule,
    ForwardModule,
    AssignToOfficerModule,
    ChangeStatusModule,
    UploadCertModule,
  ],
})
export class AdminCharacterModule {}
