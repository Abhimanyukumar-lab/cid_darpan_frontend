import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicBaseComponent } from 'src/app/fragment/public-base/public-base.component';
import { PublicRoutingModule } from './public-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PublicHeaderComponent } from 'src/app/fragment/public-header/public-header.component';
import { PublicSuperHeaderComponent } from 'src/app/fragment/public-super-header/public-super-header.component';
import { PublicHeaderMenuComponent } from 'src/app/fragment/public-header-menu/public-header-menu.component';
import { PublicBannerComponent } from 'src/app/fragment/public-banner/public-banner.component';
import { PublicHeadlineComponent } from 'src/app/fragment/public-headline/public-headline.component';
import { PublicFooterComponent } from 'src/app/fragment/public-footer/public-footer.component';
import { PublicSubFooterComponent } from 'src/app/fragment/public-sub-footer/public-sub-footer.component';
import { NgMarqueeModule } from 'ng-marquee';
import { ImageViewerModule } from '../fragment/image-viewer/image-viewer.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    PublicHeaderComponent,
    PublicSuperHeaderComponent,
    PublicHeaderMenuComponent,
    PublicBannerComponent,
    PublicHeadlineComponent,
    PublicFooterComponent,
    PublicSubFooterComponent,
    PublicBaseComponent,

  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    TranslateModule,
    NgMarqueeModule,
    ImageViewerModule,
    NgbCarouselModule,
  ],
})
export class PublicModuleModule {}
