import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissingPersonRoutingModule } from './missing-person-routing.module';
import { MissingPersonComponent } from './missing-person.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { ModelModule } from 'src/app/common/popup/model/model.module';

@NgModule({
  declarations: [MissingPersonComponent],
  imports: [
    CommonModule,
    MissingPersonRoutingModule,
    TranslateModule,
    ImageViewerModule,
    ModelModule,
  ],
})
export class MissingPersonModule {}
