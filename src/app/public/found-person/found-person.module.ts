import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundPersonRoutingModule } from './found-person-routing.module';
import { FoundPersonComponent } from './found-person.component';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModelModule } from 'src/app/common/popup/model/model.module';

@NgModule({
  declarations: [FoundPersonComponent],
  imports: [
    CommonModule,
    FoundPersonRoutingModule,
    ImageViewerModule,
    TranslateModule,
    ModelModule,
  ],
})
export class FoundPersonModule {}
