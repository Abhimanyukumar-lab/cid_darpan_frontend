import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPoliceOfficerRoutingModule } from './admin-police-officer-routing.module';
import { AdminPoliceOfficerComponent } from './admin-police-officer.component';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminPoliceOfficerComponent],
  imports: [
    CommonModule,
    AdminPoliceOfficerRoutingModule,
    TableDataModule,
    TranslateModule,
  ],
})
export class AdminPoliceOfficerModule {}
