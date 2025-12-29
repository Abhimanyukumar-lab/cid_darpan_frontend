import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Court } from 'src/app/models/Court';

@Component({
  selector: 'app-admin-court-high',
  templateUrl: './admin-court-high.component.html',
  styleUrls: ['./admin-court-high.component.scss'],
})
export class AdminCourtHighComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Court(
      true,
      null,
      null,
      null,
      null,
      'High',
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
      null,
      null
    )
  );
  rows = new Array<Court>();

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
      name: 'trainingNameEn',
      props: 'trainingNameEn',
      size: 2,
      colName: 'Training Name ',
      colPlaceHolder: 'Training Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'trainingNameHi',
      props: 'trainingNameHi',
      size: 2,
      colName: 'Training Name ',
      colPlaceHolder: 'Training Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
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

  path: string = AppConstants.HIGH_COURT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.HIGH_COURT_MODULE.DELETE_BUTTON
    );

    this.permissions.add_url = AppConstants.HIGH_COURT_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.HIGH_COURT_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.HIGH_COURT_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.HIGH_COURT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
