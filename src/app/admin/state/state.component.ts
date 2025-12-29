import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Court } from 'src/app/models/Court';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { Sdpo } from 'src/app/models/Sdpo';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Court(
      true,
      null,
      null,
      null,
      null,
      'High',
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
      name: 'stateName',
      props: 'stateName',
      size: 2,
      colName: 'State Name ',
      colPlaceHolder: 'State Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'stateNameHi',
      props: 'stateNameHi',
      size: 2,
      colName: 'State Name Hindi',
      colPlaceHolder: 'State Name HIndi',
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

  path: string = 'getStatesPageData';
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      'SMPAGE'
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      'EDSAPG'
    );
    // this.permissions.view = this.global.checkForUserButtonPermission(
    //   AppConstants.HIGH_COURT_MODULE.VIEW_BUTTON
    // );
    // this.permissions.delete = this.global.checkForUserButtonPermission(
    //   AppConstants.HIGH_COURT_MODULE.DELETE_BUTTON
    // );

    this.permissions.add_url = '/official/state/add';
    // this.permissions.add_url = AppConstants.HIGH_COURT_MODULE.ADD_URL;
    this.permissions.edit_url = '/official/state/edit';
    // this.permissions.view_url = AppConstants.HIGH_COURT_MODULE.VIEW_URL;
    // this.permissions.delete_url = AppConstants.HIGH_COURT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
