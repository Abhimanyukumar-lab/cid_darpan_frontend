import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeadPersonRoutingModule } from './dead-person-routing.module';
import { DeadPersonComponent } from './dead-person.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { ModelModule } from 'src/app/common/popup/model/model.module';

@NgModule({
  declarations: [DeadPersonComponent],
  imports: [
    CommonModule,
    DeadPersonRoutingModule,
    TranslateModule,
    ImageViewerModule,
    ModelModule,
  ],
})
export class DeadPersonModule {}
