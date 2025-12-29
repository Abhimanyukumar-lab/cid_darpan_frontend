import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyRoutingModule } from './modify-routing.module';
import { ModifyComponent } from './modify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
  declarations: [ModifyComponent],
  imports: [
    CommonModule,
    ModifyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatStepperModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ModifyModule {}
