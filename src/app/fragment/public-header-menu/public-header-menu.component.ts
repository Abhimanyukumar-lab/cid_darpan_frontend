import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-header-menu',
  templateUrl: './public-header-menu.component.html',
  styleUrls: ['./public-header-menu.component.scss'],
})
export class PublicHeaderMenuComponent implements OnInit, OnDestroy {
  subscriptionRoute: any;
  MENU: any;
  currentRoute: any;
  isCurrentURL: any;

  style = environment.STYLE;
  publicPages = environment.MAIN_PUBLIC_PAGES;

  constructor(private router: Router) {
    this.subscriptionRoute = this.router.events.subscribe((val) => {
      this.currentRoute = val as NavigationEnd;

      if (this.currentRoute.url) {
        this.isCurrentURL = this.currentRoute.url;
      }
    });

    this.MENU = [
      {
        title: 'Home',
        url: 'home',
      },
      {
        title: 'About Us',
        child: [
          {
            title: 'About ' + environment.IS_MAIN_DESIG,
            url: 'aboutSP',
          },
          {
            title: 'Message From ' + environment.IS_MAIN_DESIG,
            url: 'massageFromSP',
          },
          {
            title: 'Out Team',
            url: 'ourTeam',
          },
          {
            title: 'Succession List',
            url: 'successionList',
          },
        ],
      },
      {
        title: 'Citizen Services',
        child: [
          {
            title: 'Appointment With ' + environment.IS_MAIN_DESIG,
            url: 'appointment',
          },
          {
            title: 'Citizen Report',
            url: 'citizenReport',
          },
          {
            title: 'Complaint',
            url: 'complaint',
          },
          {
            title: 'Passport',
            url: 'passport',
          },
          {
            title: 'FeedBack',
            url: 'feedBack',
          },
        ],
      },
      {
        title: 'Contact US',
        url: 'contact',
      },
    ];
  }
  ngOnDestroy(): void {
    this.subscriptionRoute.unsubscribe();
  }

  ngOnInit(): void {}
}
