import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportantPlacesRoutingModule } from './important-places-routing.module';
import { ImportantPlacesComponent } from './important-places.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [ImportantPlacesComponent],
  imports: [
    CommonModule,
    ImportantPlacesRoutingModule,
    TranslateModule,
    ImageViewerModule,
  ],
})
export class ImportantPlacesModule {}
