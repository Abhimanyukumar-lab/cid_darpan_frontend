import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Subdivision } from 'src/app/models/Subdivision';

@Component({
  selector: 'app-admin-subdivision',
  templateUrl: './admin-subdivision.component.html',
  styleUrls: ['./admin-subdivision.component.scss'],
})
export class AdminSubdivisionComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Subdivision(true, null, null, null, null, null,null)
  );
  rows = new Array<Subdivision>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'rangeName',
      props: 'rangeName',
      size: 2,
      colName: 'Range Name ',
      colPlaceHolder: 'Range Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'rangeNameHi',
      props: 'rangeNameHi',
      size: 2,
      colName: 'Range Name Hindi',
      colPlaceHolder: 'Range Name HIndi',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'districtName',
      props: 'districtName',
      size: 2,
      colName: 'District Name ',
      colPlaceHolder: 'District Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'districtNameHi',
      props: 'districtNameHi',
      size: 2,
      colName: 'District Name Hindi',
      colPlaceHolder: 'District Name HIndi',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'name',
      props: 'name',
      size: 2,
      colName: 'Sub Division Name',
      colPlaceHolder: 'Sub Division Name',
      isTranslate: false,
      sort:true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'nameHi',
      props: 'nameHi',
      size: 2,
      colName: 'Sub Division Name',
      colPlaceHolder: 'Sub Division Name Hindi',
      isTranslate: true,
      sort:true,
      filter: true,
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
    colPlaceHolder: 'Enter ID',
    data: 'id',
    translate: false,
    type: 'INPUT'
  },
  // {
  //   colName: 'Range Name',
  //   colPlaceHolder: 'Range Name',
  //   data: 'rangeName',
  //   translate: true,
  //   type: 'INPUT'
  // },
  // {
  //   colName: 'Range Name Hindi',
  //   colPlaceHolder: 'Range Name Hindi',
  //   data: 'rangeNameHi',
  //   translate: true,
  //   type: 'INPUT'
  // },
  // {
  //   colName: 'District Name',
  //   colPlaceHolder: 'District Name',
  //   data: 'districtName',
  //   translate: true,
  //   type: 'INPUT'
  // },
  // {
  //   colName: 'District Name Hindi',
  //   colPlaceHolder: 'District Name Hindi',
  //   data: 'districtNameHi',
  //   translate: true,
  //   type: 'INPUT'
  // },
  {
    colName: 'Sub Division Name',
    colPlaceHolder: 'Sub Division Name',
    data: 'name',
    translate: false,
    type: 'INPUT'
  },
  {
    colName: 'Sub Division Name Hindi',
    colPlaceHolder: 'Sub Division Name Hindi',
    data: 'nameHi',
    translate: true,
    type: 'INPUT'
  }
];

  path: string = AppConstants.SUBDIVISION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.VIEW_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.SUBDIVISION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SUBDIVISION_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.SUBDIVISION_MODULE.VIEW_URL;
    this.permissions.deactivate_url =
      AppConstants.SUBDIVISION_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.SUBDIVISION_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
