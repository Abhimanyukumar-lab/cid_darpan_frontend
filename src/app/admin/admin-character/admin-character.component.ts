import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { CharacterDetails } from 'src/app/models/CharacterDetails';

@Component({
  selector: 'app-admin-character',
  templateUrl: './admin-character.component.html',
  styleUrls: ['./admin-character.component.scss'],
})
export class AdminCharacterComponent implements OnInit {
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
    new CharacterDetails(
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
  rows = new Array<CharacterDetails>();

  columns = [
    {
      name: 'idInfo',
      props: 'idInfo',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'name',
      props: 'name',
      size: 2,
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'fatherHusbandName',
      props: 'fatherHusbandName',
      size: 2,
      colName: 'CHARACTER.FATHER_MOTHER_GUARDIAN_NAME',
      colPlaceHolder: 'CHARACTER.SELECT_FATHER_MOTHER_GUARDIAN_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'MobileNo',
      props: 'mobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      filter: true,
      sort: true,
      isTranslate: false,
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
      name: 'Type',
      props: 'type',
      size: 2,
      colName: 'CHARACTER.TH_APPLICANT_TYPE',
      colPlaceHolder: 'CHARACTER.TH_ENTR_APPLICANT_TYPE',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'ReciptNo',
      props: 'reciptNo',
      size: 2,
      colName: 'CHARACTER.RECEIPT_NO',
      colPlaceHolder: 'CHARACTER.SEL_RECEIPT_NO',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'districtMemoNo',
      props: 'districtMemoNo',
      size: 2,
      colName: 'CHARACTER.DIST_MEMO_NO',
      colPlaceHolder: 'CHARACTER.ENTR_DIST_MEMO_NO',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'reportedBy',
      props: 'reportedBy',
      size: 2,
      colName: 'COMPLAINT.SOURCE',
      colPlaceHolder: 'COMPLAINT.SOURCE',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'status',
      props: 'status',
      size: 2,
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'CreatedDate',
      props: 'createdDate',
      size: 2,
      colName: 'CHARACTER.APPLIED_DATE',
      colPlaceHolder: 'CHARACTER.APPLIED_DATE',
      filter: true,
      sort: true,
      type: 'DATE',
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
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'name',
      translate: true,
      type: 'INPUT',
    },{
      colName: 'CHARACTER.FATHER_MOTHER_GUARDIAN_NAME',
      colPlaceHolder: 'CHARACTER.SELECT_FATHER_MOTHER_GUARDIAN_NAME',
      data: 'guardianRelation',
      translate: true,
      type: 'INPUT',
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
      data: 'userType',
      colName: 'CHARACTER.TH_APPLICANT_TYPE',
      colPlaceHolder: 'CHARACTER.TH_ENTR_APPLICANT_TYPE',
      translate: true,
      type: 'APPTYPE',
    },
    {
      data: 'reciptNo',
      colName: 'CHARACTER.RECEIPT_NO',
      colPlaceHolder: 'CHARACTER.SEL_RECEIPT_NO',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'districtMemoNo',
      colName: 'CHARACTER.DIST_MEMO_NO',
      colPlaceHolder: 'CHARACTER.ENTR_DIST_MEMO_NO',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'reportedBy',
      colName: 'COMPLAINT.SOURCE',
      colPlaceHolder: 'COMPLAINT.SOURCE',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'status',
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      translate: true,
      type: 'STATUS',
      module: 'CHARACTER',
    },
    {
      data: 'fromDate',
      colName: 'From Date',
      colPlaceHolder: 'From Date',
      translate: false,
      type: 'DATE',
    },
    {
      data: 'toDate',
      colName: 'To Date',
      colPlaceHolder: 'To Date',
      translate: false,
      type: 'DATE',
    },
  ];

  path: string = AppConstants.CHARACTER_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.CHARACTER_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.CHARACTER_MODULE.DELETE_URL;

    this.permissions.download_cert = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.DONWLOAD_CERTIFICATE
    );
  }
  ngOnInit(): void {}
}
