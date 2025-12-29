import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessionListRoutingModule } from './succession-list-routing.module';
import { SuccessionListComponent } from './succession-list.component';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SuccessionListComponent],
  imports: [
    CommonModule,
    SuccessionListRoutingModule,
    ImageViewerModule,
    TranslateModule,
  ],
})
export class SuccessionListModule {}
