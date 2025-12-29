import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { CircleInspector } from 'src/app/models/CircleInspector';

@Component({
  selector: 'app-circle-inspector',
  templateUrl: './circle-inspector.component.html',
  styleUrls: ['./circle-inspector.component.scss'],
})
export class CircleInspectorComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new CircleInspector(
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
      null
    )
  );
  rows = new Array<CircleInspector>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter Id',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'rangeName',
      props: 'rangeName',
      size: 2,
      colName: 'Range Name ',
      colPlaceHolder: 'Range Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'rangeNameHi',
      props: 'rangeNameHi',
      size: 2,
      colName: 'Range Name Hindi',
      colPlaceHolder: 'Range Name HIndi',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'districtName',
      props: 'districtName',
      size: 2,
      colName: 'District Name ',
      colPlaceHolder: 'District Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'districtNameHi',
      props: 'districtNameHi',
      size: 2,
      colName: 'District Name Hindi',
      colPlaceHolder: 'District Name HIndi',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'subdivisionName',
      props: 'subdivisionName',
      size: 2,
      colName: 'Sub Division Name ',
      colPlaceHolder: 'Sub Division Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'subdivisionNameHi',
      props: 'subdivisionNameHi',
      size: 2,
      colName: 'Sub Division Name Hindi',
      colPlaceHolder: 'Sub Division Name HIndi',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'circleName',
      props: 'circleName',
      size: 2,
      colName: 'CIRCLE_INSPECTOR.SEC_CI_NAME',
      colPlaceHolder: 'CIRCLE_INSPECTOR.ENTER_SEC_CI_NAME',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'circleNameHi',
      props: 'circleNameHi',
      size: 2,
      colName: 'CIRCLE_INSPECTOR.SEC_CI_NAME',
      colPlaceHolder: 'CIRCLE_INSPECTOR.ENTER_SEC_CI_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'circleOfficerName',
    //   props: 'circleOfficerName',
    //   size: 2,
    //   colName: 'POLICE_OFFICER.OFFICER_NAME',
    //   colPlaceHolder: 'POLICE_OFFICER.ENT_OFFICER_NAME',
    //   filter: true,
    //   sort: true,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'circleOfficerNameHi',
    //   props: 'circleOfficerNameHi',
    //   size: 2,
    //   colName: 'POLICE_OFFICER.OFFICER_NAME',
    //   colPlaceHolder: 'POLICE_OFFICER.ENT_OFFICER_NAME',
    //   filter: true,
    //   sort: true,
    //   isTranslate: true,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'designationName',
    //   props: 'designationName',
    //   size: 2,
    //   colName: 'HELPLINE.DESIGNATION',
    //   colPlaceHolder: 'HELPLINE.ENTER_DESIGNATION',
    //   filter: true,
    //   sort: true,
    //   isTranslate: true,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'circleContact',
    //   props: 'circleContact',
    //   size: 2,
    //   colName: 'CONTACT.CONTACT_NO',
    //   colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_CONTACT_NO',
    //   filter: true,
    //   sort: true,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'circleMobile',
    //   props: 'circleMobile',
    //   size: 2,
    //   colName: 'CONTACT.MOBILE_NUMBER',
    //   colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
    //   filter: true,
    //   sort: true,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'circleEmail',
    //   props: 'circleEmail',
    //   size: 2,
    //   colName: 'CONTACT.EMAIL',
    //   colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_EMAIL',
    //   filter: true,
    //   sort: true,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'circleImage',
    //   props: 'circleImage',
    //   size: 2,
    //   colName: 'FORMS.IMAGE',
    //   type: 'MEDIA',
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },

    // {
    //   name: 'Priority',
    //   props: 'priority',
    //   size: 1,
    //   colName: 'Priority',
    //   colPlaceHolder: 'Enter Priority',
    //   sort: true,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
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
      colName: 'CIRCLE_INSPECTOR.SEC_CI_NAME',
      colPlaceHolder: 'CIRCLE_INSPECTOR.ENTER_SEC_CI_NAME',
      data: 'circleName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'CIRCLE_INSPECTOR.SEC_CI_NAME',
      colPlaceHolder: 'CIRCLE_INSPECTOR.ENTER_SEC_CI_NAME',
      data: 'circleNameHi',
      translate: true,
      type: 'INPUT',
    },
    // {
    //   colName: 'CONTACT.CONTACT_NO',
    //   colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_CONTACT_NO',
    //   data: 'circleContact',
    //   translate: false,
    //   type: 'INPUT',
    // },
    // {
    //   colName: 'CONTACT.MOBILE_NUMBER',
    //   colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
    //   data: 'circleMobile',
    //   translate: false,
    //   type: 'INPUT',
    // },
    // {
    //   colName: 'CONTACT.EMAIL',
    //   colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_EMAIL',
    //   data: 'circleEmail',
    //   translate: false,
    //   type: 'INPUT',
    // },
    // {
    //   colName: 'Priority',
    //   colPlaceHolder: 'Enter Priority',
    //   data: 'priority',
    //   translate: false,
    //   type: 'INPUT',
    // },
  ];

  path: string = AppConstants.CIRCLE_INSPECTOR_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.VIEW_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.CIRCLE_INSPECTOR_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.CIRCLE_INSPECTOR_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.CIRCLE_INSPECTOR_MODULE.VIEW_URL;
    this.permissions.deactivate_url =
      AppConstants.CIRCLE_INSPECTOR_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.CIRCLE_INSPECTOR_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
