import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterDownloadRoutingModule } from './character-download-routing.module';
import { CharacterDownloadComponent } from './character-download.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CharacterDownloadComponent],
  imports: [
    CommonModule,
    CharacterDownloadRoutingModule,
    NgbAlertModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CharacterDownloadModule {}
