import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { SafeModule } from 'src/app/pipe/safe/safe.module';

@NgModule({
  declarations: [ImageViewerComponent],
  imports: [CommonModule, SafeModule],
  exports: [ImageViewerComponent],
})
export class ImageViewerModule {}
