import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsEventsRoutingModule } from './news-events-routing.module';
import { NewsEventsComponent } from './news-events.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [NewsEventsComponent],
  imports: [
    CommonModule,
    NewsEventsRoutingModule,
    TranslateModule,
    ImageViewerModule,
  ],
})
export class NewsEventsModule {}
