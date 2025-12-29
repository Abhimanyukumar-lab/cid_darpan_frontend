import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { SmsSending } from 'src/app/models/SmsSending';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-sms-sending',
  templateUrl: './sms-sending.component.html',
  styleUrls: ['./sms-sending.component.scss'],
})
export class SmsSendingComponent implements OnInit {
  smsSendingPage: Page;
  smsSendingRows = new Array<SmsSending>();

  smsSendingColumns = [
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
      name: 'messageFrom',
      props: 'messageFrom',
      size: 2,
      colName: 'COMPLAINT.REPLY_FROM',
      colPlaceHolder: 'COMPLAINT.REPLY_FROM_DESC',
      isTranslate: true,
      filter: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'receiverName',
      props: 'receiverName',
      size: 2,
      colName: 'COMPLAINT.RECEIVER_NAME',
      colPlaceHolder: 'COMPLAINT.ENTR_RECEIVER_NAME',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'message',
      props: 'message',
      size: 2,
      colName: 'COMPLAINT.MESSAGE',
      colPlaceHolder: 'COMPLAINT.ENTER_SMS',
      filter: true,
      isTranslate: true,
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
      isTranslate: false,
      width: '100',
      sort: true,
      type: 'DATE',
      isNeedToTranslate: false,
    },
  ];

  @Input()
  smsSendingPath: string;

  @Input()
  smsSendingCode: string;

  @Input()
  smsSendingModule: string;

  @Input()
  smsSendingId: string;

  @Input()
  deparment: string;

  smsSendingPermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {
    this.smsSendingPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new SmsSending(
        true,
        null,
        null,
        null,
        null,
        null,
        this.smsSendingId,
        this.deparment
      )
    );
  }
}
