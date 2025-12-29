import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DistrictDetail } from 'src/app/models/districtDetails';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  mainLinks: any[] = [];
  sidebarLinks: any[] = [];
  imageGallery: any[] = [];
  headlines: any[] = [];
  mostWanted: any[] = [];
  importantAchievement: any[] = [];
  ourTeam: any[] = [];
  name: string;

  isOurTeam = environment.OURTEAM;
  isBestOurTeam = environment.BEST_OUR_TEAM;

  twitter = environment.twitter;
  facebook;

  currrentLang: string;

  districtDetails: DistrictDetail;

  imageObjectImageGallery: Array<object> = [];

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  style = environment.STYLE;

  @ViewChild('divToMeasure') divToMeasureElement: ElementRef;
  divToMeasureWidth = '340';

  constructor(
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private global: GlobalFunctionsService,
    private translateService: TranslateService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.districtDetails = data.districtDetails;
      this.currrentLang = data.defaultLang;

      this.translateService
        .get('HOME.DISTRICT_POLICE')
        .subscribe((text: string) => {
          this.name = text;
        });
    });
    this.facebook = environment.facebook + '&width=' + this.divToMeasureWidth;
  }
  ngAfterViewInit(): void {
    this.facebook =
      environment.facebook +
      '&width=' +
      this.divToMeasureElement.nativeElement.offsetWidth;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.LINKFETCH,
        { linkType: 'Main Page' },
        false
      )
      .subscribe((data) => {
        this.mainLinks = data.linksDTOs;
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.LINKFETCH,
        { linkType: 'SIDEBAR' },
        false
      )
      .subscribe((data) => {
        this.sidebarLinks = data.linksDTOs;
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'IMAGE_GALLERY' },
        false
      )
      .subscribe((data) => {
        this.imageGallery = data.pageData;

        this.imageGallery.map((image) => {
          this.imageObjectImageGallery.push({
            image: this.baseUrl + image.link,
            thumbImage: this.baseUrl + image.link,
            alt: '',
            title: '',
          });
        });

        this.imageGallery.map((image) => {
          this.imageObjectImageGallery.push({
            image: this.baseUrl + image.link,
            thumbImage: this.baseUrl + image.link,
            alt: '',
            title: '',
          });
        });

        this.twitter = environment.twitter;
        this.facebook = environment.facebook;
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'BEST_OUR_TEAM' },
        false
      )
      .subscribe((data) => {
        this.ourTeam = data.pageData;
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'MOST_WANTED' },
        false
      )
      .subscribe((data) => {
        this.mostWanted = data.pageData;
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'IMPORTANT_ACHIEVEMENT' },
        false
      )
      .subscribe((data) => {
        this.importantAchievement = data.pageData;
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'PRESS_RELEASE' },
        false
      )
      .subscribe((data) => {
        this.headlines = data.pageData;
      });

    // this.apiCaller
    //   .apiPostCall(AppConstants.PUBLIC_APIS.HEADLINESFETCH, {}, false)
    //   .subscribe((data) => {
    //     this.headlines = data.headlinesDTOs;
    //   });
  }
}
