import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurTeamRoutingModule } from './our-team-routing.module';
import { OurTeamComponent } from './our-team.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [OurTeamComponent],
  imports: [
    CommonModule,
    OurTeamRoutingModule,
    TranslateModule,
    ImageViewerModule,
  ],
})
export class OurTeamModule {}
