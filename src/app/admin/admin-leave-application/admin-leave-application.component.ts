import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Leave } from 'src/app/models/Leave';

@Component({
  selector: 'app-admin-leave-application',
  templateUrl: './admin-leave-application.component.html',
  styleUrls: ['./admin-leave-application.component.scss'],
})
export class AdminLeaveApplicationComponent implements OnInit {
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
    new Leave(
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
      null
    )
  );
  rows = new Array<Leave>();

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
      name: 'resourceName',
      props: 'resourceName',
      size: 2,
      colName: 'Resource Name',
      colPlaceHolder: 'Enter Resource Name',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'resourceMobileNo',
      props: 'resourceMobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'resourceDesg',
      props: 'resourceDesg',
      size: 2,
      colName: 'Designation',
      colPlaceHolder: 'Enter Designation',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'stationName',
      props: 'stationName',
      size: 2,
      colName: 'Station Name',
      colPlaceHolder: 'Enter Station Name',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveType',
      props: 'leaveType',
      size: 2,
      colName: 'Leave Type',
      colPlaceHolder: 'Enter Leave Type',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveDescription',
      props: 'leaveDescription',
      size: 2,
      colName: 'Leave Description',
      colPlaceHolder: 'Enter Leave Description',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveStartDate',
      props: 'leaveStartDate',
      size: 2,
      colName: 'Leave Start Date',
      colPlaceHolder: 'Enter Leave Start Date',
      filter: false,
      sort: true,
      type: 'DATE',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveEndDate',
      props: 'leaveEndDate',
      size: 2,
      colName: 'Leave End Date',
      colPlaceHolder: 'Enter Leave End Date',
      filter: false,
      sort: true,
      type: 'DATE',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveNoOffDays',
      props: 'leaveNoOffDays',
      size: 2,
      colName: 'Number of Leave Days',
      colPlaceHolder: 'Enter Number of Leave Days',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'creationDate',
      props: 'creationDate',
      size: 2,
      colName: 'CHARACTER.APPLIED_DATE',
      colPlaceHolder: 'CHARACTER.SEL_APPLIED_DATE',
      filter: false,
      sort: true,
      type: 'DATE',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'leaveStatus',
      props: 'leaveStatus',
      size: 2,
      colName: 'Leave Status',
      colPlaceHolder: 'Enter Leave Status',
      filter: true,
      sort: true,
      isTranslate: true,
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
      colName: 'Resource Name',
      colPlaceHolder: 'Enter Resource Name',
      data: 'resourceName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'APPOINTMENT.ENTER_MOBILE',
      data: 'resourceMobileNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Leave Start Date',
      colPlaceHolder: 'Enter Leave Start Date',
      data: 'leaveStartDate',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'Leave End Date',
      colPlaceHolder: 'Enter Leave End Date',
      data: 'leaveEndDate',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'Number of Leave Days',
      colPlaceHolder: 'Enter Number of Leave Days',
      data: 'leaveNoOffDays',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Leave Status',
      colPlaceHolder: 'Enter Leave Status',
      data: 'leaveStatus',
      translate: false,
      type: 'STATUS',
      module: 'LEAVE',
    },
    
  ];

  path: string = AppConstants.LEAVE_APPLICATION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_APPLICATION_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_APPLICATION_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.LEAVE_APPLICATION_MODULE.VIEW_URL;
    this.permissions.delete_url =
      AppConstants.LEAVE_APPLICATION_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
