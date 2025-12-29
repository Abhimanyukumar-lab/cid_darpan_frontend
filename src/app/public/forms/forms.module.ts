import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule, FormsRoutingModule, TranslateModule],
})
export class FormsModule {}
