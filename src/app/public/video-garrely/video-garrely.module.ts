import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoGarrelyRoutingModule } from './video-garrely-routing.module';
import { VideoGarrelyComponent } from './video-garrely.component';
import { TranslateModule } from '@ngx-translate/core';
import { SafeModule } from 'src/app/pipe/safe/safe.module';

@NgModule({
  declarations: [VideoGarrelyComponent],
  imports: [
    CommonModule,
    VideoGarrelyRoutingModule,
    TranslateModule,
    SafeModule,
  ],
})
export class VideoGarrelyModule {}
