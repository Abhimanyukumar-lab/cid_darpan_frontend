import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminImportantAchievementRoutingModule } from './admin-important-achievement-routing.module';
import { AdminImportantAchievementComponent } from './admin-important-achievement.component';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AdminImportantAchievementComponent],
  imports: [
    CommonModule,
    AdminImportantAchievementRoutingModule,
    TableDataModule,
    TranslateModule,
  ],
})
export class AdminImportantAchievementModule {}
