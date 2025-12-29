import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { ReplyComplaint } from 'src/app/models/ReplyComplaint';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss'],
})
export class ChangeStatusComponent implements OnInit {
  changeStatusPage: Page;
  changeStatusRows = new Array<ReplyComplaint>();

  changeStatusColumns = [
    {
      name: 'idInfo',
      props: 'idInfo',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'replyFromName',
      props: 'replyFromName',
      size: 2,
      colName: 'COMPLAINT.REPLY_FROM',
      colPlaceHolder: 'COMPLAINT.REPLY_FROM_DESC',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'replyDescription',
      props: 'replyDescription',
      size: 2,
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'replyStatus',
      props: 'replyStatus',
      size: 2,
      colName: 'COMPLAINT.REPLY_STATUS',
      colPlaceHolder: 'COMPLAINT.ENTR_REPLY_STATUS',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'createdDate',
      props: 'createdDate',
      size: 2,
      colName: 'FORMS.DATE',
      colPlaceHolder: 'FORMS.ENTER_DATE',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      type: 'DATE',
      isNeedToTranslate: false,
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

  @Input()
  changeStatusPath: string;

  @Input()
  deleteButtonCode: string;

  @Input()
  deleteButtonUrl: string;

  @Input()
  changeStatusModule: string;

  @Input()
  changeStatusId: number;

  changeStatusPermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {
    this.changeStatusPermissions.changeStatusDelete =
      this.global.checkForUserButtonPermission(this.deleteButtonCode);

    this.changeStatusPermissions.changeStatusDelete_url = this.deleteButtonUrl;

    this.changeStatusPage = new Page(
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
        this.changeStatusModule == 'APPOINTMENT' ? this.changeStatusId : null,
        null,
        this.changeStatusModule == 'GRSECTION' ? this.changeStatusId : null,
        this.changeStatusModule == 'CHARACTER' ? this.changeStatusId : null,
        this.changeStatusModule == 'COMMISSION' ? this.changeStatusId : null,
        this.changeStatusModule == 'COMPLAINT' ? this.changeStatusId : null,
        this.changeStatusModule == 'COURT' ? this.changeStatusId : null,
        this.changeStatusModule == 'DEADPERSON' ? this.changeStatusId : null,
        this.changeStatusModule == 'FOUNDPERSON' ? this.changeStatusId : null,
        null,
        this.changeStatusModule == 'RECEIPT'
          ? this.changeStatusId
          : null || this.changeStatusModule == 'DISPATCH'
          ? this.changeStatusId
          : null,
        null,
        this.changeStatusModule == 'LEAVE' ? this.changeStatusId : null,
        this.changeStatusModule == 'MISSINGPERSON' ? this.changeStatusId : null,
        this.changeStatusModule == 'PASSPORT' ? this.changeStatusId : null,
        null,
        this.changeStatusModule == 'PROCECUTION' ? this.changeStatusId : null,
        null,
        null,
        null,
        this.changeStatusModule == 'RTI' ? this.changeStatusId : null,
        null,
        null,
        null,
        this.changeStatusModule == 'VISITORS' ? this.changeStatusId : null,
        this.changeStatusModule == 'CITIZENREPORT' ? this.changeStatusId : null,
        this.changeStatusModule == 'COMPLAINT_GPO' ? this.changeStatusId : null,
        this.changeStatusModule == 'COMPLAINT_GFPO' ? this.changeStatusId : null
      )
    );
  }
}
