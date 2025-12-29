import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { PhotoGalleryComponent } from './photo-gallery.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [PhotoGalleryComponent],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    TranslateModule,
    ImageViewerModule,
  ],
})
export class PhotoGalleryModule {}
