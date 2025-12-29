import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { VisitorsMaster } from 'src/app/models/VisitorsMaster';

@Component({
  selector: 'app-admin-visitor-register',
  templateUrl: './admin-visitor-register.component.html',
  styleUrls: ['./admin-visitor-register.component.scss'],
})
export class AdminVisitorRegisterComponent implements OnInit {
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
    new VisitorsMaster(
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
      null
    )
  );
  rows = new Array<VisitorsMaster>();

  columns = [
    {
      name: 'idInfo',
      props: 'idInfo',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter Id',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'name',
      props: 'name',
      size: 2,
      colName: 'CITIZEN_REPORT.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'reasonToMeet',
      props: 'reasonToMeet',
      size: 2,
      colName: 'VISITORS.MEET_REASON',
      colPlaceHolder: 'VISITORS.ENTR_MEET_REASON',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'address',
      props: 'address',
      size: 2,
      colName: 'CONTACT.ADDRESS',
      colPlaceHolder: 'CONTACT.SEL_ADDRESS',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'mobileno',
      props: 'mobileno',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'photoName',
      props: 'photoName',
      size: 2,
      colName: 'FORMS.IMAGE',
      type: 'MEDIA',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'createdDate',
      props: 'createdDate',
      size: 2,
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      filter: true,
      type:'DATE',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'status',
      props: 'status',
      size: 2,
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_ENTR_STATUS',
      filter: true,
      sort: true,
      isTranslate: true,
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
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'name',
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
      data: 'address',
      colName: 'CONTACT.ADDRESS',
      colPlaceHolder: 'CONTACT.SEL_ADDRESS',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'reasonToMeet',
      colName: 'VISITORS.MEET_REASON',
      colPlaceHolder: 'VISITORS.ENTR_MEET_REASON',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'status',
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      translate: true,
      type: 'STATUS',
      module: 'VISITORS',
    },
    // {
    //   data: 'fromDate',
    //   colName: 'From Date',
    //   colPlaceHolder: 'From Date',
    //   translate: false,
    //   type: 'DATE',
    // },
    // {
    //   data: 'toDate',
    //   colName: 'To Date',
    //   colPlaceHolder: 'To Date',
    //   translate: false,
    //   type: 'DATE',
    // },
  ];

  path: string = AppConstants.VISITORS_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.VISITORS_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.VISITORS_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.VISITORS_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.VISITORS_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
