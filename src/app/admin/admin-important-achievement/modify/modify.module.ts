import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyRoutingModule } from './modify-routing.module';
import { ModifyComponent } from './modify.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModifyComponent],
  imports: [
    CommonModule,
    ModifyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class ModifyModule {}
