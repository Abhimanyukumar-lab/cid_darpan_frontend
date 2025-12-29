import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostingListRoutingModule } from './posting-list-routing.module';
import { PostingListComponent } from './posting-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PostingListComponent],
  imports: [CommonModule, PostingListRoutingModule, TranslateModule],
})
export class PostingListModule {}
