import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadCertComponent } from './upload-cert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UploadCertComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [UploadCertComponent],
})
export class UploadCertModule {}
