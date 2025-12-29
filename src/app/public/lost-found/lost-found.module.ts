import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LostFoundRoutingModule } from './lost-found-routing.module';
import { LostFoundComponent } from './lost-found.component';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LostFoundComponent],
  imports: [
    CommonModule,
    LostFoundRoutingModule,
    ImageViewerModule,
    TranslateModule,
    FormsModule,
  ],
})
export class LostFoundModule {}
