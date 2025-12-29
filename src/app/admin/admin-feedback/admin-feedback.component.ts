import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { FeedBack } from 'src/app/models/FeedBack';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { transform } from 'lodash';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss'],
})
export class AdminFeedbackComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new FeedBack(true, null, null, null, null, null, null, null)
  );
  rows = new Array<FeedBack>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      isTranslate: false,
      isNeedToTranslate: false,
    },

    {
      name: 'citizenName',
      props: 'citizenName',
      size: 2,
      colName: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      colPlaceHolder: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      filter: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'citizenEmail',
      props: 'citizenEmail',
      size: 2,
      colName: 'CONTACT.EMAIL',
      colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_EMAIL',
      filter: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'citizenMobile',
      props: 'citizenMobile',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      filter: true,
      isTranslate: true,
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
      colName: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      colPlaceHolder: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      data: 'citizenName',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'citizenEmail',
      colName: 'CONTACT.EMAIL',
      colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_EMAIL',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'citizenMobile',
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      translate: false,
      type: 'INPUT',
    },
  ];


  path: string = AppConstants.FEEDBACK_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.FEEDBACK_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.FEEDBACK_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.FEEDBACK_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.FEEDBACK_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
