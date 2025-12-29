import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { SmsSchedular } from 'src/app/models/SmsSchedular';
import { NotificationHistory } from 'src/app/models/NotificationHistory';

@Component({
  selector: 'app-notification-history',
  templateUrl: './notification-history.component.html',
  styleUrls: ['./notification-history.component.scss'],
})
export class NotificationHistoryComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    false,
    null,
    new NotificationHistory(true, null, null, null, null, null, null, null)
  );
  rows = new Array<NotificationHistory>();

  columns = [
    {
      name: 'id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter Id',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'userId',
      props: 'userId',
      size: 2,
      colName: 'User Name',
      colPlaceHolder: 'Enter User Name',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'listId',
      props: 'listId',
      size: 2,
      colName: 'List Name',
      colPlaceHolder: 'Enter List Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'msgFrom',
      props: 'msgFrom',
      size: 2,
      colName: 'Message From',
      colPlaceHolder: 'Enter Message From',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'message',
      props: 'message',
      size: 2,
      colName: 'Message',
      colPlaceHolder: 'Enter Message',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
  ];

  path: string = AppConstants.NOTIFICATION_USER_MODULE.FETCH_HISTORY_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);
  }
  ngOnInit(): void {}
}
