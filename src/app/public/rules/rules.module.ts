import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RulesComponent],
  imports: [CommonModule, RulesRoutingModule, TranslateModule],
})
export class RulesModule {}
