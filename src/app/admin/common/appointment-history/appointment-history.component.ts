import { Component, Input, OnInit } from '@angular/core';
import { AppointmentHistory } from 'src/app/models/AppointmentHistory';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss'],
})
export class AppointmentHistoryComponent implements OnInit {
  appHistoryPage: Page;
  appHistoryRows = new Array<AppointmentHistory>();

  appHistoryColumns = [
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
      name: 'appoDate',
      props: 'appoDate',
      size: 1,
      colName: 'Applied Date',
      isTranslate: false,
      width: '100',
      sort: true,
      type: 'DATE',
      isNeedToTranslate: false,
    },
    {
      name: 'appoTime',
      props: 'appoTime',
      size: 1,
      colName: 'Applied Time',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'appDate',
      props: 'appDate',
      size: 1,
      colName: 'Rescheduled Date',
      isTranslate: false,
      width: '100',
      sort: true,
      type: 'DATE',
      isNeedToTranslate: false,
    },
    {
      name: 'appTime',
      props: 'appTime',
      size: 1,
      colName: 'Rescheduled Time',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'message',
      props: 'message',
      size: 1,
      colName: 'Message',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
  ];

  @Input()
  appHistoryPath: string;

  @Input()
  appointmentId: number;

  appHistoryPermissions: Permissions = new Permissions();

  constructor() {}

  ngOnInit(): void {
    this.appHistoryPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new AppointmentHistory(
        true,
        null,
        null,
        null,
        null,
        this.appointmentId,
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
  }
}
