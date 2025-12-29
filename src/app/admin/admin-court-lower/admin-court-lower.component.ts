import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Court } from 'src/app/models/Court';

@Component({
  selector: 'app-admin-court-lower',
  templateUrl: './admin-court-lower.component.html',
  styleUrls: ['./admin-court-lower.component.scss'],
})
export class AdminCourtLowerComponent implements OnInit {
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
    new Court(
      true,
      null,
      null,
      null,
      null,
      'Lower',
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
  rows = new Array<Court>();

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
      name: 'slnoDate',
      props: 'slnoDate',
      size: 2,
      colName: 'PROCECUTION.SER_NO_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_SER_NO_DATE',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'cwjcNO',
    //   props: 'cwjcNO',
    //   size: 2,
    //   colName: 'COURT.CWJTNO',
    //   colPlaceHolder: 'COURT.ENTR_CWJTNO',
    //   filter: true,
    //   isTranslate: true,
    //   width: '100',
    //   sort: true,
    //   isNeedToTranslate: false,
    // },
    {
      name: 'fromWhom',
      props: 'fromWhom',
      size: 2,
      colName: 'RTI.GOT_FROM',
      colPlaceHolder: 'RTI.ENTR_GOT_FROM',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'department',
      props: 'department',
      size: 2,
      colName: 'COMPLAINT.DEPT',
      colPlaceHolder: 'COMPLAINT.REPLY_FROM_DESC',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'subject',
      props: 'subject',
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
      name: 'applicantName',
      props: 'applicantName',
      size: 2,
      colName: 'APPOINTMENT.NAME',
      colPlaceHolder: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'appliedDate',
      props: 'appliedDate',
      size: 2,
      colName: 'CHARACTER.APPLIED_DATE',
      colPlaceHolder: 'CHARACTER.SEL_APPLIED_DATE',
      filter: false,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'status',
      props: 'status',
      size: 2,
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_ENTR_STATUS',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
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

  path: string = AppConstants.LOWER_COURT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.LOWER_COURT_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.LOWER_COURT_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.LOWER_COURT_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.LOWER_COURT_MODULE.DELETE_BUTTON
    );

    this.permissions.add_url = AppConstants.LOWER_COURT_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.LOWER_COURT_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.LOWER_COURT_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.LOWER_COURT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
