import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferListRoutingModule } from './transfer-list-routing.module';
import { TransferListComponent } from './transfer-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TransferListComponent],
  imports: [CommonModule, TransferListRoutingModule, TranslateModule],
})
export class TransferListModule {}
