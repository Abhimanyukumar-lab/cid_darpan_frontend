import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { ChangeStatusModule } from '../../common/change-status/change-status.module';
import { AssignToOfficerModule } from '../../common/assign-to-officer/assign-to-officer.module';
import { ForwardModule } from '../../common/forward/forward.module';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    TranslateModule,
    ImageViewerModule,
    ChangeStatusModule,
    AssignToOfficerModule,
    ForwardModule,
  ],
})
export class ViewModule {}
