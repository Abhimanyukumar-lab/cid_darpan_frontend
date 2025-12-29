import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PressReleaseDetailsRoutingModule } from './press-release-details-routing.module';
import { PressReleaseDetailsComponent } from './press-release-details.component';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PressReleaseDetailsComponent],
  imports: [
    CommonModule,
    PressReleaseDetailsRoutingModule,
    ImageViewerModule,
    TranslateModule,
  ],
})
export class PressReleaseDetailsModule {}
