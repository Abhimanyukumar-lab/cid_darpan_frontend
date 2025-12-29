import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { PoliceOfficer } from 'src/app/models/PoliceOfficer';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-police-officer',
  templateUrl: './admin-police-officer.component.html',
  styleUrls: ['./admin-police-officer.component.scss'],
})
export class AdminPoliceOfficerComponent implements OnInit {
  policeStationId: number | null = null;
  page: Page;
  rows = new Array<PoliceOfficer>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter ID',
      filter: false,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'brassNo',
      props: 'brassNo',
      size: 2,
      colName: 'POLICE_OFFICER_M.BRASS_NO',
      colPlaceHolder: 'POLICE_OFFICER_M.BRASS_NO',
      filter: true,
      filterType: 'brassNo',
      filterLabel: 'Brass No',
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'desig',
      props: 'desig',
      size: 2,
      colName: 'POLICE_OFFICER_M.DESIGNATION',
      colPlaceHolder: 'POLICE_OFFICER_M.DESIGNATION',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.DESIGNATION',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'name',
      props: 'name',
      size: 2,
      colName: 'POLICE_OFFICER_M.NAME',
      colPlaceHolder: 'POLICE_OFFICER_M.NAME',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.NAME',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'mobileNo',
      props: 'mobileNo',
      size: 2,
      colName: 'POLICE_OFFICER_M.MOBILENO',
      colPlaceHolder: 'POLICE_OFFICER_M.MOBILENO',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.MOBILENO',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'dob',
      props: 'dob',
      size: 2,
      colName: 'POLICE_OFFICER_M.DOB',
      colPlaceHolder: 'POLICE_OFFICER_M.DOB',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.DOB',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
      type: 'DATE',
    },
    {
      name: 'doj',
      props: 'doj',
      size: 2,
      colName: 'POLICE_OFFICER_M.DOJ',
      colPlaceHolder: 'POLICE_OFFICER_M.DOJ',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.DOJ',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
      type: 'DATE',
    },
    {
      name: 'homeDist',
      props: 'homeDist',
      size: 2,
      colName: 'POLICE_OFFICER_M.HOME_DIST',
      colPlaceHolder: 'POLICE_OFFICER_M.HOME_DIST',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.HOME_DIST',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'placeOfPosting',
      props: 'placeOfPosting',
      size: 2,
      colName: 'POLICE_OFFICER_M.POP',
      colPlaceHolder: 'POLICE_OFFICER_M.POP',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.POP',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'natureOfDuty',
      props: 'natureOfDuty',
      size: 2,
      colName: 'POLICE_OFFICER_M.NOD',
      colPlaceHolder: 'POLICE_OFFICER_M.NOD',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_OFFICER_M.NOD',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Action',
      isTranslate: false,
      width: '100',
      sort: false,
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
      data: 'brassNo',
      colName: 'POLICE_OFFICER_M.BRASS_NO',
      colPlaceHolder: 'POLICE_OFFICER_M.BRASS_NO',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_OFFICER_M.DESIGNATION',
      colPlaceHolder: 'POLICE_OFFICER_M.DESIGNATION',
      data: 'desig',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_OFFICER_M.NAME',
      colPlaceHolder: 'POLICE_OFFICER_M.NAME',
      data: 'name',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_OFFICER_M.MOBILENO',
      colPlaceHolder: 'POLICE_OFFICER_M.MOBILENO',
      data: 'mobileNo',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_OFFICER_M.DOB',
      colPlaceHolder: 'POLICE_OFFICER_M.DOB',
      data: 'dob',
      translate: true,
      type: 'DATE',
    },
    {
      colName: 'POLICE_OFFICER_M.DOJ',
      colPlaceHolder: 'POLICE_OFFICER_M.DOJ',
      data: 'doj',
      translate: true,
      type: 'DATE',
    },
    {
      colName: 'POLICE_OFFICER_M.HOME_DIST',
      colPlaceHolder: 'POLICE_OFFICER_M.HOME_DIST',
      data: 'homeDist',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_OFFICER_M.POP',
      colPlaceHolder: 'POLICE_OFFICER_M.POP',
      data: 'placeOfPosting',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_OFFICER_M.NOD',
      colPlaceHolder: 'POLICE_OFFICER_M.NOD',
      data: 'natureOfDuty',
      translate: true,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.POLICE_OFFICER_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_OFFICER_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_OFFICER_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.POLICE_OFFICER_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.POLICE_OFFICER_MODULE.EDIT_URL;

    // this.permissions.view = this.global.checkForUserButtonPermission(
    //   AppConstants.POLICE_OFFICER_MODULE.VIEW_BUTTON
    // );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_OFFICER_MODULE.DELETE_BUTTON
    );

    // this.permissions.view_url = AppConstants.POLICE_OFFICER_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.POLICE_OFFICER_MODULE.DELETE_URL;
  }

  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new PoliceOfficer(
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
        true
      )
    );
  }

  goToLink = (url: any) => {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };
}
