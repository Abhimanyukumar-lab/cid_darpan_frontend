import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriminalListRoutingModule } from './criminal-list-routing.module';
import { CriminalListComponent } from './criminal-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CriminalListComponent],
  imports: [CommonModule, CriminalListRoutingModule, TranslateModule],
})
export class CriminalListModule {}
