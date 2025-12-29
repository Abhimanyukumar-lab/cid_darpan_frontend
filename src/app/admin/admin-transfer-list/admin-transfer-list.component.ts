import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { PressRelease } from 'src/app/models/pressRelease';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-transfer-list',
  templateUrl: './admin-transfer-list.component.html',
  styleUrls: ['./admin-transfer-list.component.scss'],
})
export class AdminTransferListComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new PressRelease(
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
      'TRANSFER'
    )
  );
  rows = new Array<PressRelease>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Title',
      props: 'title',
      size: 2,
      colName: 'TRANSFER.TRANSFER_NAME',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_NAME',
      filter: true,
      sort:true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Released By',
      props: 'releasedBy',
      size: 2,
      colName: 'TRANSFER.TRANSFER_BY',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_BY',
      filter: true,
      sort:true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Description',
      props: 'description',
      size: 2,
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      filter: true,
      sort:true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Date',
      props: 'date',
      size: 2,
      colName: 'TRANSFER.TRANSFER_DATE',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DATE',
      filter: true,
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
      colName: 'Priority',
      sort:true,
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

  path: string = AppConstants.TRANSFER_LIST_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_LIST_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_LIST_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_LIST_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_LIST_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.TRANSFER_LIST_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.TRANSFER_LIST_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.TRANSFER_LIST_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.TRANSFER_LIST_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
