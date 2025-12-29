import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImageViewerModule } from 'src/app/fragment/image-viewer/image-viewer.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { SafeModule } from 'src/app/pipe/safe/safe.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    TranslateModule,
    ImageViewerModule,
    NgImageSliderModule,
    SafeModule,
    SlickCarouselModule,
  ],
})
export class HomeModule {}
