import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';

@NgModule({
  declarations: [
    UserComponent,
    ModifyUserComponent,
    UpdateUserProfileComponent,
    ViewUserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableDataModule,
    InlineSVGModule,
  ],
})
export class UserModule {}
