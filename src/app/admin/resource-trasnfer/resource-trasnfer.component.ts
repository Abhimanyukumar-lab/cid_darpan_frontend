import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { Transfer } from 'src/app/models/Transfer';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-resource-trasnfer',
  templateUrl: './resource-trasnfer.component.html',
  styleUrls: ['./resource-trasnfer.component.scss'],
})
export class ResourceTrasnferComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Transfer(null, null, null, null, null, true)
  );
  rows = new Array<Transfer>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter ID',
      filter: false,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Name',
      props: 'name',
      size: 2,
      colName: 'Name',
      colPlaceHolder: 'Enter Name',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Status',
      props: 'status',
      size: 2,
      colName: 'Status',
      colPlaceHolder: 'Enter Status',
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
      filter: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
  ];

  path: string = AppConstants.TRANSFER_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_MODULE.ADD_BUTTON
    );
    this.permissions.add_url = AppConstants.TRANSFER_MODULE.ADD_URL;

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_MODULE.EDIT_BUTTON
    );
    this.permissions.edit_url = AppConstants.TRANSFER_MODULE.EDIT_URL;

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_MODULE.VIEW_BUTTON
    );
    this.permissions.view_url = AppConstants.TRANSFER_MODULE.VIEW_URL;

    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_MODULE.DELETE_BUTTON
    );
    this.permissions.delete_url = AppConstants.TRANSFER_MODULE.DELETE_URL;
  }

  ngOnInit(): void {}
}
