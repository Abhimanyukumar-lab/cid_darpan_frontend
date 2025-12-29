import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    TranslateModule,
    ImageViewerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ViewModule {}
