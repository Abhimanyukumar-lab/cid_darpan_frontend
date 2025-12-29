import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsEventDetailsRoutingModule } from './news-event-details-routing.module';
import { NewsEventDetailsComponent } from './news-event-details.component';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NewsEventDetailsComponent],
  imports: [
    CommonModule,
    NewsEventDetailsRoutingModule,
    ImageViewerModule,
    TranslateModule,
  ],
})
export class NewsEventDetailsModule {}
