import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Court } from "src/app/models/Court";
import { District } from "src/app/models/District";
import { Page } from "src/app/models/Page";
import { Permissions } from "src/app/models/Permissions";
import { GlobalFunctionsService } from "src/app/services/global-functions.service";

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent  implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new District(
      true,
      null,
      null,
      null,
      null,
      null,
    )
  );
  rows = new Array<District>();

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
      colName: 'District Name',
      colPlaceHolder: 'District Name',
      data: 'districtName',
      translate: true,
      type: 'INPUT',
    },
  ]
  path: string = 'getDistrictPageData';
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      'DMPAGE'
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      'DMPEGE'
    );
    // this.permissions.view = this.global.checkForUserButtonPermission(
    //   AppConstants.HIGH_COURT_MODULE.VIEW_BUTTON
    // );
    // this.permissions.delete = this.global.checkForUserButtonPermission(
    //   AppConstants.HIGH_COURT_MODULE.DELETE_BUTTON
    // );

    this.permissions.add_url = '/official/district/add';
    this.permissions.edit_url = '/official/district/edit';
    // this.permissions.view_url = AppConstants.HIGH_COURT_MODULE.VIEW_URL;
    // this.permissions.delete_url = AppConstants.HIGH_COURT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
