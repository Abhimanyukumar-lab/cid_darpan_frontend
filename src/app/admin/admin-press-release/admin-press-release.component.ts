import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { PressRelease } from 'src/app/models/pressRelease';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-press-release',
  templateUrl: './admin-press-release.component.html',
  styleUrls: ['./admin-press-release.component.scss'],
})
export class AdminPressReleaseComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new PressRelease(
      true,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      'PRESS_RELEASE'
    )
  );
  rows = new Array<PressRelease>();

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
      isTranslate: true,
      sort: true,
      isNeedToTranslate: false,
      filter: true,
    },
    {
      name: 'Released By',
      props: 'releasedBy',
      size: 2,
      colName: 'PRESS_RELEASE.RELEASE_BY',
      colPlaceHolder: 'PRESS_RELEASE.ENTER_RELEASE_BY',
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
      name: 'Date',
      props: 'date',
      size: 2,
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      filter: true,
      sort: true,
      isTranslate: false,
      type:'DATE',
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
  
  path: string = AppConstants.PRESS_RELEASE_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.PRESS_RELEASE_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.PRESS_RELEASE_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.PRESS_RELEASE_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.PRESS_RELEASE_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.PRESS_RELEASE_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.PRESS_RELEASE_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.PRESS_RELEASE_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.PRESS_RELEASE_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
