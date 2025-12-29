import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageFromSpRoutingModule } from './message-from-sp-routing.module';
import { MessageFromSpComponent } from './message-from-sp.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [MessageFromSpComponent],
  imports: [
    CommonModule,
    MessageFromSpRoutingModule,
    TranslateModule,
    ImageViewerModule,
  ],
})
export class MessageFromSpModule {}
