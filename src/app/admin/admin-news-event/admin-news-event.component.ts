import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { NewsEvents } from 'src/app/models/NewsEvents';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-news-event',
  templateUrl: './admin-news-event.component.html',
  styleUrls: ['./admin-news-event.component.scss'],
})
export class AdminNewsEventComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new NewsEvents(true, null, null, null, null, null, 'NEWS_EVENTS')
  );
  rows = new Array<NewsEvents>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Ids',
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Title',
      props: 'title',
      size: 1,
      colName: 'DASHBOARD_NEWS_EVENT.TITLE_LABEL',
      colPlaceHolder: 'DASHBOARD_NEWS_EVENT.TITLE_PLACEHOLDER',
      isTranslate: true,
      sort:true,
      filter: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'Description',
    //   props: 'description',
    //   size: 3,
    //   colName: 'FORMS.DESCRIPTION',
    //   colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
    //   filter: true,
    //   sort:true,
    //   isTranslate: true,
    // },
    {
      name: 'Link',
      props: 'link',
      size: 1,
      type: 'MEDIA',
      colName: 'FORMS.LINK',
      colPlaceHolder: 'FORMS.ENTER_LINK',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'date',
      props: 'date',
      size: 1,
      type: 'DATE',
      colName: 'DASHBOARD_NEWS_EVENT.POSTED_ON_DATE',
      colPlaceHolder: 'DASHBOARD_NEWS_EVENT.POSTED_ON_DATE',
      filter: true,
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'priority',
      props: 'priority',
      size: 1,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
      isTranslate: false,
      isNeedToTranslate: false,
    },
  ];

  
  filterOptions = [
    {
      colName: 'Id',
      colPlaceHolder: 'Id',
      data: 'id',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'FORMS.TITLE',
      colPlaceHolder: 'FORMS.ENTER_TITLE',
      data: 'title',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'DASHBOARD_NEWS_EVENT.POSTED_ON_DATE',
      colPlaceHolder: 'DASHBOARD_NEWS_EVENT.POSTED_ON_DATE',
      data: 'date',
      translate: true,
      type: 'DATE',
    },
    {
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      data: 'priority',
      translate: false,
      type: 'INPUT',
    },
  ];
  
  path: string = AppConstants.NEWS_EVENTS_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.NEWS_EVENTS_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.NEWS_EVENTS_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.NEWS_EVENTS_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.NEWS_EVENTS_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.NEWS_EVENTS_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.NEWS_EVENTS_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.NEWS_EVENTS_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.NEWS_EVENTS_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
