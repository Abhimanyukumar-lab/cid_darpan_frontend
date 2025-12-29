import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliceStationDetailsRoutingModule } from './police-station-details-routing.module';
import { PoliceStationDetailsComponent } from './police-station-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { SafeModule } from 'src/app/pipe/safe/safe.module';

@NgModule({
  declarations: [PoliceStationDetailsComponent],
  imports: [
    CommonModule,
    PoliceStationDetailsRoutingModule,
    TranslateModule,
    ImageViewerModule,
    SafeModule,
  ],
})
export class PoliceStationDetailsModule {}
