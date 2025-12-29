import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementComponent } from './announcement.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AnnouncementComponent],
  imports: [CommonModule, AnnouncementRoutingModule, TranslateModule],
})
export class AnnouncementModule {}
