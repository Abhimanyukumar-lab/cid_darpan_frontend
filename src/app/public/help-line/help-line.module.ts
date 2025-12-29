import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpLineRoutingModule } from './help-line-routing.module';
import { HelpLineComponent } from './help-line.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HelpLineComponent],
  imports: [CommonModule, HelpLineRoutingModule, TranslateModule, FormsModule],
})
export class HelpLineModule {}
