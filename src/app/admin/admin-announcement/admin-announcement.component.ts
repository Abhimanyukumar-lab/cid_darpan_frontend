import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Announcement } from 'src/app/models/announcement';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.scss'],
})
export class AdminAnnouncementComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Announcement(true, null, null, null, null, null, null, 'ANNOUNCEMENT')
  );
  rows = new Array<Announcement>();

  columns = [
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
      name: 'Title',
      props: 'title',
      size: 2,
      colName: 'FORMS.TITLE',
      colPlaceHolder: 'FORMS.ENTER_TITLE',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Description',
      props: 'description',
      size: 2,
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Link',
      props: 'link',
      size: 2,
      type: 'MEDIA',
      colName: 'FORMS.LINK',
      colPlaceHolder: 'FORMS.ENTER_LINK',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Action',
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
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      data: 'description',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      data: 'priority',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.ANNOUNCEMENT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ANNOUNCEMENT_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.ANNOUNCEMENT_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.ANNOUNCEMENT_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.ANNOUNCEMENT_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.ANNOUNCEMENT_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.ANNOUNCEMENT_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.ANNOUNCEMENT_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.ANNOUNCEMENT_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
