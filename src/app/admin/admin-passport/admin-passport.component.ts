import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Passport } from 'src/app/models/Passport';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-passport',
  templateUrl: './admin-passport.component.html',
  styleUrls: ['./admin-passport.component.scss'],
})
export class AdminPassportComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [
      { prop: 'updateStatus', dir: 'desc' },
      { prop: 'id', dir: 'desc' },
    ],
    new Passport(
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
      null,
      null,
      null
    )
  );
  rows = new Array<Passport>();

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
      name: 'applicationId',
      props: 'applicationId',
      size: 2,
      colName: 'PASSPORT.FILE_NUMBER',
      colPlaceHolder: 'PASSPORT.SEL_FILE_NUMBER',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'name',
      props: 'name',
      size: 2,
      colName: 'APPOINTMENT.NAME',
      colPlaceHolder: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'passportType',
      props: 'passportType',
      size: 2,
      colName: 'PASSPORT.PASS_TYPE',
      colPlaceHolder: 'PASSPORT.SEL_PASS_TYPE',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'mobileNo',
      props: 'mobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NO',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'stationName',
      props: 'stationName',
      size: 2,
      colName: 'POLICE_STATION.STATION_NAME',
      colPlaceHolder: 'POLICE_STATION.STATION_NAME',
      filter: false,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'status',
      props: 'status',
      size: 2,
      colName: 'COMPLAINT.STATUS',
      colPlaceHolder: 'COMPLAINT.STATUS',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'createdDate',
      props: 'createdDate',
      size: 2,
      colName: 'CHARACTER.APPLIED_DATE',
      colPlaceHolder: 'CHARACTER.APPLIED_DATE',
      filter: true,
      type: 'DATE',
      isTranslate: false,
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
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'name',
      translate: true,
      type: 'INPUT',
    },
    
    {
      data: 'applicationId',
      colName: 'PASSPORT.FILE_NUMBER',
      colPlaceHolder: 'PASSPORT.SEL_FILE_NUMBER',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'passportType',
      colName: 'PASSPORT.PASS_TYPE',
      colPlaceHolder: 'PASSPORT.SEL_PASS_TYPE',
      translate: true,
      type: 'PASSTYPE',
    },
    {
      data: 'mobileno',
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'stationIds',
      colName: 'POLICE_STATION.STATION_NAME',
      colPlaceHolder: 'POLICE_STATION.STATION_NAME',
      translate: true,
      type: 'STATION',
    },
    {
      data: 'status',
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      translate: true,
      type: 'STATUS',
      module: 'PASSPORT',
    },
  ];

  path: string = AppConstants.PASSPORT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.PASSPORT_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.PASSPORT_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.PASSPORT_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.PASSPORT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
