import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-news-events',
  templateUrl: './news-events.component.html',
  styleUrls: ['./news-events.component.scss'],
})
export class NewsEventsComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  news_event: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService,
    private route: Router
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.GETPAGEDATA,
        { type: 'NEWS_EVENTS' },
        false
      )
      .subscribe((data) => {
        this.news_event = data.pageData;
      });
  }

  ngOnInit(): void {}

  readMore = (news: any) => {
    this.hideOther();
    news.readMore = true;
    news.readLess = false;
  };

  readLess = (news: any) => {
    news.readMore = false;
    news.readLess = true;
  };

  hideOther = () => {
    this.news_event.forEach((news) => {
      news.readMore = false;
      news.readLess = true;
    });
  };

  goToDetails = (news: any) => {
    localStorage.setItem('news', JSON.stringify(news));
    this.route.navigate(['/newsEventDetails']);
  };
}
