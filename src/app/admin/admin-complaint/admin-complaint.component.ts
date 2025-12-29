import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Complaint } from 'src/app/models/Complaint';

@Component({
  selector: 'app-admin-complaint',
  templateUrl: './admin-complaint.component.html',
  styleUrls: ['./admin-complaint.component.scss'],
})
export class AdminComplaintComponent implements OnInit {
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
    new Complaint(
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
      null
    )
  );
  rows = new Array<Complaint>();

  columns = [
    {
      name: 'idInfo',
      props: 'idInfo',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'CitizenName',
      props: 'citizenName',
      size: 2,
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      filter: true,
      filterLabel: 'Citizen Name',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'CitizenMobile',
      props: 'citizenMobile',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      filter: true,
      filterLabel: 'Citizen Mobile',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'stationName',
      props: 'stationName',
      size: 2,
      colName: 'POLICE_STATION.POLICE_STATION_TITLE',
      colPlaceHolder: 'APPOINTMENT.ENTER_POLICE_STATION',
      filter: true,
      filterType: 'stations',
      filterLabel: 'Station Name',
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ComplaintSubject',
      props: 'complaintSubject',
      size: 2,
      colName: 'COMPLAINT.OL_SUBJECT',
      colPlaceHolder: 'COMPLAINT.SUBJECT',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ComplaintType',
      props: 'complaintType',
      size: 2,
      colName: 'HELPLINE.TYPE',
      colPlaceHolder: 'COMPLAINT.ENTER_TYPE',
      filter: true,
      filterType: 'complaintType',
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ComplaintDate',
      props: 'complaintDate',
      size: 2,
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      type: 'DATE',
      filter: true,
      filterType: 'date',
      isTranslate: false,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'ComplaintImage',
      props: 'complaintImage',
      size: 2,
      type: 'MEDIA',
      colName: 'FORMS.IMAGE',
      isTranslate: false,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'complaintSource',
      props: 'complaintSource',
      size: 2,
      colName: 'COMPLAINT.SOURCE',
      colPlaceHolder: 'COMPLAINT.SOURCE',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'complaintStatus',
      props: 'complaintStatus',
      size: 2,
      colName: 'COMPLAINT.STATUS',
      colPlaceHolder: 'COMPLAINT.STATUS',
      filter: true,
      filterType: 'dropdown',
      filterOptionsModule: 'COMPLAINT',
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'createdDate',
      props: 'createdDate',
      size: 1,
      colName: 'Created Date',
      filter: true,
      filterType: 'date',
      sort: true,
      isTranslate: false,
      type: 'DATE',
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
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'citizenName',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'citizenMobile',
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
      data: 'complaintType',
      colName: 'HELPLINE.TYPE',
      colPlaceHolder: 'COMPLAINT.ENTER_TYPE',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'complaintDate',
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      translate: false,
      type: 'DATE',
    },
    {
      data: 'complaintSource',
      colName: 'COMPLAINT.SOURCE',
      colPlaceHolder: 'COMPLAINT.SOURCE',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'complaintStatus',
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      translate: true,
      type: 'STATUS',
      module: 'COMPLAINT',
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

  path: string = AppConstants.COMPLAINT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.COMPLAINT_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.COMPLAINT_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.COMPLAINT_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.COMPLAINT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
