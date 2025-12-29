import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Posting } from 'src/app/models/posting';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-posting-list',
  templateUrl: './admin-posting-list.component.html',
  styleUrls: ['./admin-posting-list.component.scss'],
})
export class AdminPostingListComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Posting(true, null, null, null, null, null, null, null, 'POSTING_LIST')
  );
  rows = new Array<Posting>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      filter: false,
      sort:true,
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
      sort:true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Released By',
      props: 'releasedBy',
      size: 2,
      colName: 'PRESS_RELEASE.RELEASE_BY',
      colPlaceHolder: 'PRESS_RELEASE.ENTER_RELEASE_BY',
      filter: true,
      sort:true,
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
      filter: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Date',
      props: 'date',
      size: 2,
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      filter: true,
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
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
      colName: 'PRESS_RELEASE.RELEASE_BY',
      colPlaceHolder: 'PRESS_RELEASE.ENTER_RELEASE_BY',
      data: 'releasedBy',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      data: 'date',
      translate: false,
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

  path: string = AppConstants.POSTING_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.POSTING_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.POSTING_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.POSTING_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.POSTING_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.POSTING_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.POSTING_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.POSTING_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.POSTING_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
