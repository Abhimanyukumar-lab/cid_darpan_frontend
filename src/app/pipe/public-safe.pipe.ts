import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'SafeURL' })
export class PublicSafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
