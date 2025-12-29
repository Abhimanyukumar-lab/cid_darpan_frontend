import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { SmsSchedular } from 'src/app/models/SmsSchedular';

@Component({
  selector: 'app-sms-schedular',
  templateUrl: './sms-schedular.component.html',
  styleUrls: ['./sms-schedular.component.scss'],
})
export class SmsSchedularComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'scheduleTime', dir: 'desc' }],
    new SmsSchedular(
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
      null
    )
  );
  rows = new Array<SmsSchedular>();

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
      name: 'name',
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
      name: 'senderId',
      props: 'senderId',
      size: 2,
      colName: 'Sender Id',
      colPlaceHolder: 'Enter Sender Id',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'description',
      props: 'description',
      size: 2,
      colName: 'Description',
      colPlaceHolder: 'Enter description',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'scheduleTime',
      props: 'scheduleTime',
      size: 2,
      colName: 'Schedule Time',
      colPlaceHolder: 'Enter Schedule Time',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'DATETIME',
    },
    {
      name: 'status',
      props: 'status',
      size: 2,
      colName: 'status',
      colPlaceHolder: 'Enter Status',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'details',
      props: 'details',
      size: 2,
      colName: 'message',
      colPlaceHolder: 'Enter message',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'sendedBy',
      props: 'sendedBy',
      size: 2,
      colName: 'Sended By',
      colPlaceHolder: 'Enter Sended By',
      filter: true,
      sort: true,
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
      colName: 'Name',
      colPlaceHolder: 'Enter Name',
      data: 'name',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Sender Id',
      colPlaceHolder: 'Enter Sender Id',
      data: 'senderId',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Description',
      colPlaceHolder: 'Enter Description',
      data: 'description',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Schedule Time',
      colPlaceHolder: 'Enter Schedule Time',
      data: 'scheduleTime',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Status',
      colPlaceHolder: 'Enter Status',
      data: 'status',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Details',
      colPlaceHolder: 'Enter Details',
      data: 'details',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Sended By',
      colPlaceHolder: 'Enter Sended By',
      data: 'sendedBy',
      translate: false,
      type: 'INPUT',
    },
  ];


  path: string = AppConstants.SMS_RESCHEDULAR_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);
  }
  ngOnInit(): void {}
}
