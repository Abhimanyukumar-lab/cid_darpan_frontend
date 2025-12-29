import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { GrievancePoliceOfficial } from 'src/app/models/GrievancePoliceOfficial';

@Component({
  selector: 'app-admin-gpo',
  templateUrl: './admin-gpo.component.html',
  styleUrls: ['./admin-gpo.component.scss'],
})
export class AdminGrievancePoliceOfficialComponent implements OnInit {
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
    new GrievancePoliceOfficial(
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
      null
    )
  );
  rows = new Array<GrievancePoliceOfficial>();

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
      name: 'employeeId',
      props: 'employeeId',
      size: 2,
      colName: 'GPO.EMPLOYEE_ID',
      colPlaceHolder: 'GPO.EMPLOYEE_ID',
      isTranslate: true,
      filter: true,
      filterLabel: 'Name',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Name',
      props: 'Name',
      size: 2,
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      filter: true,
      filterLabel: 'Name',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'MobileNo',
      props: 'MobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      filter: true,
      filterLabel: 'Mobile',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ComplaintImage',
      props: 'ComplaintImage',
      size: 2,
      type: 'MEDIA',
      colName: 'GPO.COMPLAINTIMAGE',
      isTranslate: false,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'ComplaintStatus',
      props: 'ComplaintStatus',
      size: 2,
      colName: 'Complaint.STATUS',
      colPlaceHolder: 'Complaint.STATUS',
      filter: true,
      filterType: 'dropdown',
      filterOptionsModule: 'GrievancePoliceOfficial',
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
      colName: 'GPO.EMPLOYEE_ID',
      colPlaceHolder: 'GPO.EMPLOYEE_ID',
      data: 'employeeId',
      translate: true,
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
      data: 'mobileNo',
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      translate: false,
      type: 'INPUT',
    },
    // {
    //   data: 'stationIds',
    //   colName: 'POLICE_STATION.STATION_NAME',
    //   colPlaceHolder: 'POLICE_STATION.STATION_NAME',
    //   translate: true,
    //   type: 'STATION',
    // },
    {
      data: 'createdDate',
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      translate: false,
      type: 'DATE',
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

  path: string = AppConstants.GrievancePoliceOfficial_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.GrievancePoliceOfficial_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.GrievancePoliceOfficial_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.GrievancePoliceOfficial_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.GrievancePoliceOfficial_MODULE.DELETE_BUTTON
    );

    this.permissions.add_url =
      AppConstants.GrievancePoliceOfficial_MODULE.ADD_URL;
    this.permissions.edit_url =
      AppConstants.GrievancePoliceOfficial_MODULE.EDIT_URL;
    this.permissions.view_url =
      AppConstants.GrievancePoliceOfficial_MODULE.VIEW_URL;
    this.permissions.delete_url =
      AppConstants.GrievancePoliceOfficial_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
