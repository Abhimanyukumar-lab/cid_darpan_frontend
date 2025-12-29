import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Announcement } from 'src/app/models/announcement';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Dsp } from 'src/app/models/Dsp';

@Component({
  selector: 'app-admin-about-dsp',
  templateUrl: './admin-about-dsp.component.html',
  styleUrls: ['./admin-about-dsp.component.scss'],
})
export class AdminAboutDspComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Dsp(true, null, null, null, null, null, null, null, null)
  );
  rows = new Array<Dsp>();

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
      name: 'DspName',
      props: 'dspName',
      size: 2,
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'DspNameHi',
      props: 'dspNameHi',
      size: 2,
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'designationName',
      props: 'designationName',
      size: 2,
      colName: 'HELPLINE.DESIGNATION',
      colPlaceHolder: 'HELPLINE.ENTER_DESIGNATION',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'DspImage',
      props: 'dspImage',
      size: 2,
      type: 'MEDIA',
      colName: 'FORMS.IMAGE',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'DspJoiningDate',
      props: 'dspJoiningDate',
      size: 2,
      colName: 'DSP.JOIN_DATE',
      colPlaceHolder: 'DSP.ENTR_JOIN_DATE',
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
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'dspName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'dspNameHi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'DSP.JOIN_DATE',
      colPlaceHolder: 'DSP.ENTR_JOIN_DATE',
      data: 'dspJoiningDate',
      translate: true,
      type: 'DATE',
    },
  ];

  path: string = AppConstants.DSP_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.VIEW_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.DSP_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.DSP_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.DSP_MODULE.VIEW_URL;
    this.permissions.deactivate_url = AppConstants.DSP_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.DSP_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
