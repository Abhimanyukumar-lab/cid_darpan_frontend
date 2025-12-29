import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadComponent } from './download.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [DownloadComponent],
  imports: [CommonModule, TranslateModule, NgxQRCodeModule],
  exports: [DownloadComponent],
})
export class DownloadModule {}
