import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForwardToDestinationComponent } from './forward-to-destination/forward-to-destination.component';
import { ForwardToDestinationFormComponent } from './forward-to-destination-form/forward-to-destination-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TableDataModule } from 'src/app/common/table-data/table-data.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    ForwardToDestinationComponent,
    ForwardToDestinationFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableDataModule,
    NgMultiSelectDropDownModule,
  ],
  exports: [ForwardToDestinationComponent, ForwardToDestinationFormComponent],
})
export class ForwardModule {}
