import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { SafeModule } from 'src/app/pipe/safe/safe.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    RouterModule,
    TranslateModule,
    ImageViewerModule,
    SafeModule,
  ],
})
export class ContactModule {}
