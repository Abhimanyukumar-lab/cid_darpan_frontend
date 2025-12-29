import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import 'jquery';

@Component({
  selector: 'app-public-banner',
  templateUrl: './public-banner.component.html',
  styleUrls: ['./public-banner.component.scss'],
})
export class PublicBannerComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptionRoute: any;
  baseUrl: string = AppConstants.backServer;
  banners: any;
  currentUrl: string;
  isFloating: boolean = false;
  isInitialized: boolean = false;

  fixedBanner: any[] = [];
  floatingBanner: any[] = [];

  public screenWidth: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService,
    private router: Router
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;

    var current = router.url;
    current = current.replace('/', '');
    if (current != 'home') {
      this.isFloating = true;
    } else {
      this.isFloating = false;
    }

    this.screenWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    if (this.subscriptionRoute) this.subscriptionRoute.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptionRoute = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.currentUrl = this.currentUrl.replace('/', '');
        if (this.currentUrl != 'home') {
          this.isFloating = true;
        } else {
          this.isFloating = false;
          setTimeout(() => {
            this.getStart();
          }, 1000);
        }
      }
    });

    this.apiCaller
      .apiPostCall(AppConstants.PUBLIC_APIS.BANNERFETCH, {}, false)
      .subscribe((data) => {
        this.banners = data.bannerDTOs;

        this.banners.forEach((banner: any) => {
          if (banner.type == 'Fixed') {
            this.fixedBanner.push(banner);
          } else {
            this.floatingBanner.push(banner);
          }
        });
      });
  }

  getStart = () => {
    if (!this.isFloating) {
      (<any>$('#banner')).skdslider({
        delay: 5000,
        animationSpeed: 2000,
        showNextPrev: true,
      });
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getStart();
    }, 1000);
  }
}
