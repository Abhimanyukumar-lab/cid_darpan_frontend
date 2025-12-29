import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Appointment } from 'src/app/models/Appointment';

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.component.html',
  styleUrls: ['./admin-appointment.component.scss'],
})
export class AdminAppointmentComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [
      // { prop: 'status', dir: 'desc' },
      { prop: 'id', dir: 'desc' },
    ],
    new Appointment(
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
      null
    )
  );
  rows = new Array<Appointment>();

  columns = [
    {
      name: 'idInfo',
      props: 'idInfo',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      isTranslate: false,
      isNeedToTranslate: false,
      sort: true,
    },
    {
      name: 'SrNo',
      props: 'srNo',
      size: 2,
      colName: 'APPOINTMENT.APPOINT_ID',
      colPlaceHolder: 'APPOINTMENT.ENTER_APPOINT_ID',
      filter: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Name',
      props: 'name',
      size: 2,
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      filter: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'MobileNo',
      props: 'mobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      filter: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'AppDate',
      props: 'appDate',
      size: 1,
      colName: 'APPOINTMENT.APPOINT_DATE',
      colPlaceHolder: 'APPOINTMENT.ENTER_APPOINT_DATE',
      filter: true,
      isTranslate: false,
      type: 'DATE',
      isNeedToTranslate: false,
    },
    {
      name: 'Shift',
      props: 'shift',
      size: 1,
      colName: 'APPOINTMENT.APPO_SHIFT',
      filter: true,
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
      name: 'otherStationName',
      props: 'otherStationName',
      size: 2,
      colName: 'APPOINTMENT.OTHER_POLICE',
      colPlaceHolder: 'POLICE_STATION.STATION_NAME',
      filter: false,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'createdDate',
      props: 'createdDate',
      size: 1,
      colName: 'Created Date',
      filter: true,
      sort: true,
      isTranslate: false,
      type: 'DATE',
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
      data: 'name',
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'srNo',
      colName: 'APPOINTMENT.APPOINT_ID',
      colPlaceHolder: 'APPOINTMENT.ENTER_APPOINT_ID',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'mobileNo',
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'appDate',
      colName: 'APPOINTMENT.APPOINT_DATE',
      colPlaceHolder: 'APPOINTMENT.ENTER_APPOINT_DATE',
      translate: false,
      type: 'DATE',
    },
    {
      data: 'shift',
      colName: 'APPOINTMENT.APPO_SHIFT',
      colPlaceHolder: 'Enter Shift',
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
      data: 'otherStationName',
      colName: 'APPOINTMENT.OTHER_POLICE',
      colPlaceHolder: 'POLICE_STATION.STATION_NAME',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'status',
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      translate: true,
      type: 'STATUS',
      module: 'APPOINTMENT',
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

  path: string = AppConstants.APPOINTMENT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.APPOINTMENT_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.APPOINTMENT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
