import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliceStationRoutingModule } from './police-station-routing.module';
import { PoliceStationComponent } from './police-station.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';

@NgModule({
  declarations: [PoliceStationComponent],
  imports: [
    CommonModule,
    PoliceStationRoutingModule,
    TranslateModule,
    FormsModule,
    ImageViewerModule,
  ],
})
export class PoliceStationModule {}
