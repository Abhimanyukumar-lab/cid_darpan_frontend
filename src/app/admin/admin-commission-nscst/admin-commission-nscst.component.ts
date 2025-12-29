import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commission } from 'src/app/models/Commission';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-commission-nscst',
  templateUrl: './admin-commission-nscst.component.html',
  styleUrls: ['./admin-commission-nscst.component.scss']
})
export class AdminCommissionNscstComponent implements OnInit {

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
    new Commission(
      true,
      null,
      null,
      'NSCST',
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
  rows = new Array<Commission>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'serialnoDate',
      props: 'serialnoDate',
      size: 2,
      colName: 'PROCECUTION.SER_NO_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_SER_NO_DATE',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'date',
      props: 'date',
      size: 2,
      colName: 'COMMISSION.LETTER_DATE',
      colPlaceHolder: 'COMMISSION.ENTR_LETTER_DATE',
      filter: false,
      isTranslate: false,
      width: '100',
      sort: true,
      type: 'DATE',
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
      name: 'applicationStatus',
      props: 'applicationStatus',
      size: 2,
      colName: 'COMMISSION.APPLICATION_STATUS',
      colPlaceHolder: 'COMMISSION.ENTR_APPLICATION_STATUS',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
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
      name: 'document',
      props: 'document',
      size: 2,
      colName: 'COMPLAINT.DOCUMENT',
      filter: false,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
      type: 'MEDIA',
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
      colName: 'PROCECUTION.SER_NO_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_SER_NO_DATE',
      data: 'serialnoDate',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'COMMISSION.LETTER_DATE',
      colPlaceHolder: 'COMMISSION.ENTR_LETTER_DATE',
      data: 'date',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'COMPLAINT.OL_SUBJECT',
      colPlaceHolder: 'COMPLAINT.SUBJECT',
      data: 'subject',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'APPOINTMENT.NAME',
      colPlaceHolder: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      data: 'applicantName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'COMMISSION.APPLICATION_STATUS',
      colPlaceHolder: 'COMMISSION.ENTR_APPLICATION_STATUS',
      data: 'applicationStatus',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'COMPLAINT.STATUS',
      colPlaceHolder: 'COMPLAINT.STATUS',
      data: 'status',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.NSCST_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.NSCST_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.NSCST_MODULE.EDIT_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.NSCST_MODULE.DELETE_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.NSCST_MODULE.VIEW_BUTTON
    );

    this.permissions.add_url = AppConstants.NSCST_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.NSCST_MODULE.EDIT_URL;
    this.permissions.delete_url = AppConstants.NSCST_MODULE.DELETE_URL;
    this.permissions.view_url = AppConstants.NSCST_MODULE.VIEW_URL;
  }
  ngOnInit(): void {}
}
