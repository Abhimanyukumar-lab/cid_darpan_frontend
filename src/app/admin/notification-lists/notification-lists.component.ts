import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationUserList } from 'src/app/models/NotificationUserList';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-notification-lists',
  templateUrl: './notification-lists.component.html',
  styleUrls: ['./notification-lists.component.scss'],
})
export class NotificationListsComponent implements OnInit {
  subscription: any;
  listpage = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new NotificationUserList(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
  );
  listrows = new Array<NotificationUserList>();

  listcolumns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'listName',
      props: 'listName',
      size: 2,
      colName: 'List Name',
      colPlaceHolder: 'Enter List Name',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
      isTranslate: false,
    },
  ];

  listpath: string = AppConstants.NOTIFICATION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();
  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    //notification page
    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.VIEW_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.ACTIVATE_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.DEACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.NOTIFICATION_MODULE.ADD_LIST_URL;
    this.permissions.edit_url = AppConstants.NOTIFICATION_MODULE.EDIT_LIST_URL;
    this.permissions.view_url = AppConstants.NOTIFICATION_MODULE.VIEW_LIST_URL;
    this.permissions.activate_url =
      AppConstants.NOTIFICATION_MODULE.ACTIVATE_URL;
    this.permissions.deactivate_url =
      AppConstants.NOTIFICATION_MODULE.DEACTIVATE_URL;

    //notification User page

    // this.permissions.edit = this.global.checkForUserButtonPermission(
    //   AppConstants.NOTIFICATION_USER_MODULE.EDIT_BUTTON
    // );
    // this.permissions.activate = this.global.checkForUserButtonPermission(
    //   AppConstants.NOTIFICATION_USER_MODULE.ACTIVATE_BUTTON
    // );
    // this.permissions.deactivate = this.global.checkForUserButtonPermission(
    //   AppConstants.NOTIFICATION_USER_MODULE.DEACTIVATE_BUTTON
    // );

    // this.permissions.edit_url =
    //   AppConstants.NOTIFICATION_USER_MODULE.EDIT_SUBMIT_URL;
    // this.permissions.activate_url =
    //   AppConstants.NOTIFICATION_USER_MODULE.ACTIVATE_URL;
    // this.permissions.deactivate_url =
    //   AppConstants.NOTIFICATION_USER_MODULE.DEACTIVATE_URL;
  }

  ngOnInit(): void {}
}
