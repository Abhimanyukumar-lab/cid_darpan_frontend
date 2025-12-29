import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignToOfficerFormComponent } from './assign-to-officer-form/assign-to-officer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AssignToOfficerFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [AssignToOfficerFormComponent],
})
export class AssignToOfficerModule {}
