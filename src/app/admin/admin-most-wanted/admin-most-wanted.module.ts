import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMostWantedRoutingModule } from './admin-most-wanted-routing.module';
import { AdminMostWantedComponent } from './admin-most-wanted.component';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminMostWantedComponent],
  imports: [
    CommonModule,
    AdminMostWantedRoutingModule,
    TableDataModule,
    TranslateModule,
  ],
})
export class AdminMostWantedModule {}
