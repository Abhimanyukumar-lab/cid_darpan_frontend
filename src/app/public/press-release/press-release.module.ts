import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PressReleaseRoutingModule } from './press-release-routing.module';
import { PressReleaseComponent } from './press-release.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PressReleaseComponent],
  imports: [CommonModule, PressReleaseRoutingModule, TranslateModule],
})
export class PressReleaseModule {}
