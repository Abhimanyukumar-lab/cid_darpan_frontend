import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummeryRoutingModule } from './summery-routing.module';
import { SummeryComponent } from './summery.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule } from '@ngx-translate/core';
import { NgMarqueeModule } from 'ng-marquee';

@NgModule({
  declarations: [SummeryComponent],
  imports: [
    CommonModule,
    SummeryRoutingModule,
    SlickCarouselModule,
    TranslateModule,
    NgMarqueeModule,
  ],
})
export class SummeryModule {}
