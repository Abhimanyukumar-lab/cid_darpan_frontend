import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { AboutUsComponent } from './about-us.component';
import { SafeModule } from 'src/app/pipe/safe/safe.module';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    TranslateModule,
    ImageViewerModule,
    SafeModule,
  ],
})
export class AboutUsModule {}
