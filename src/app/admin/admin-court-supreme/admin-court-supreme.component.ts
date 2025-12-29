import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Court } from 'src/app/models/Court';

@Component({
  selector: 'app-admin-court-supreme',
  templateUrl: './admin-court-supreme.component.html',
  styleUrls: ['./admin-court-supreme.component.scss'],
})
export class AdminCourtSupremeComponent implements OnInit {
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
      'Supreme',
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
    // {
    //   name: 'StationName',
    //   props: 'StationName',
    //   size: 2,
    //   colName: 'Station Name',
    //   colPlaceHolder: 'Station Name',
    //   filter: true,
    //   isTranslate: true,
    //   width: '100',
    //   sort: true,
    //   isNeedToTranslate: false,
    // },
    
    {
      name: 'name',
      props: 'name',
      size: 2,
      colName: 'Name',
      colPlaceHolder: 'Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'mobileNo',
      props: 'mobileNo',
      size: 2,
      colName: 'MobileNo',
      colPlaceHolder: 'Mobile No',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'type',
      props: 'type',
      size: 2,
      colName: 'Officer Type',
      colPlaceHolder: 'Officer Type',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'designationName',
      props: 'designationName',
      size: 2,
      colName: 'Designation',
      colPlaceHolder: 'Designation',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
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

  path: string = AppConstants.SUPER_COURT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SUPER_COURT_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SUPER_COURT_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.SUPER_COURT_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.DELETE_STATION_USER_BUTTON

    );

    this.permissions.add_url = AppConstants.SUPER_COURT_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SUPER_COURT_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.SUPER_COURT_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.POLICE_STATION_MODULE.DETELE_STATION_USER_URL;
  }
  ngOnInit(): void {}
}
