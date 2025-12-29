import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { ReplyComplaint } from 'src/app/models/ReplyComplaint';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-reply-complaint',
  templateUrl: './reply-complaint.component.html',
  styleUrls: ['./reply-complaint.component.scss'],
})
export class ReplyComplaintComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new ReplyComplaint(
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
      null
    )
  );
  rows = new Array<ReplyComplaint>();

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
      name: 'replyDescription',
      props: 'replyDescription',
      size: 2,
      colName: 'Description',
      colPlaceHolder: 'Enter Description',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'replyStatus',
      props: 'replyStatus',
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

  filterOptions = [
    {
      colName: 'Id',
      colPlaceHolder: 'Id',
      data: 'id',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Description',
      colPlaceHolder: 'Enter Description',
      data: 'replyDescription',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'Status',
      colPlaceHolder: 'Enter Status',
      data: 'replyStatus',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.REPLYCOMPLAINT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.REPLYCOMPLAINT_MODULE.EDIT_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.REPLYCOMPLAINT_MODULE.DELETE_BUTTON
    );

    this.permissions.edit_url = AppConstants.REPLYCOMPLAINT_MODULE.EDIT_URL;
    this.permissions.delete_url = AppConstants.REPLYCOMPLAINT_MODULE.DELETE_URL;
  }

  ngOnInit(): void {}
}
