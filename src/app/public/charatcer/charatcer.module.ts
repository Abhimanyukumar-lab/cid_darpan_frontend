import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharatcerRoutingModule } from './charatcer-routing.module';
import { CharatcerComponent } from './charatcer.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from 'src/app/common/popup/model/model.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [CharatcerComponent],
  imports: [
    CommonModule,
    CharatcerRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ModelModule,
    NgbAlertModule,
    ImageViewerModule,
    WebcamModule,
  ],
})
export class CharatcerModule {}
