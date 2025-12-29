import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { ReplyComment } from 'src/app/models/ReplyComment';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-forward-to-destination',
  templateUrl: './forward-to-destination.component.html',
  styleUrls: ['./forward-to-destination.component.scss'],
})
export class ForwardToDestinationComponent implements OnInit {
  forwardDestinationPage: Page;
  forwardDestinationRows = new Array<ReplyComment>();

  forwardDestinationColumns = [
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
      isTranslate: true,
      filter: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'replyToName',
      props: 'replyToName',
      size: 2,
      colName: 'COMPLAINT.REPLY_TO',
      colPlaceHolder: 'COMPLAINT.REPLY_FROM_DESC',
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
      colName: 'COMPLAINT.REPLY_FROM_DATE',
      colPlaceHolder: 'COMPLAINT.ENTR_REPLY_TO_DATE',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      type: 'DATE',
      isNeedToTranslate: false,
    },
    // {
    //   name: 'createdDate',
    //   props: 'createdDate',
    //   size: 2,
    //   colName: 'FORMS.REPLY_TO_DATE',
    //   colPlaceHolder: 'FORMS.ENTR_REPLY_TO_DATE',
    //   filter: true,
    //   isTranslate: false,
    //   width: '100',
    //   sort: true,
    //   type: 'DATE',
    // },
    {
      name: 'replyImage',
      props: 'replyImage',
      size: 2,
      colName: 'COMPLAINT.DOCUMENT',
      filter: false,
      isTranslate: false,
      width: '100',
      sort: false,
      type: 'MEDIA',
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
  forwardDestinationPath: string;

  @Input()
  deleteButtonCode: string;

  @Input()
  deleteButtonUrl: string;

  @Input()
  forwardDestinationModule: string;

  @Input()
  forwardDestinationId: number;

  @Input()
  recieptNO: boolean = false;

  @Input()
  dispatchNO: boolean = false;

  @Input()
  dispatchDate: boolean = false;

  forwardDestinationPermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {
    this.forwardDestinationPermissions.forwardDestinationDelete =
      this.global.checkForUserButtonPermission(this.deleteButtonCode);

    this.forwardDestinationPermissions.forwardDestinationDelete_url =
      this.deleteButtonUrl;

    if (this.recieptNO) {
      this.forwardDestinationColumns.splice(1, 0, {
        name: 'reciptNo',
        props: 'reciptNo',
        size: 2,
        colName: 'CHARACTER.RECEIPT_NO',
        colPlaceHolder: 'CHARACTER.SEL_RECEIPT_NO',
        filter: true,
        isTranslate: false,
        width: '100',
        sort: true,
        isNeedToTranslate: false,
      });
    }
    if (this.dispatchNO) {
      this.forwardDestinationColumns.splice(2, 0, {
        name: 'dispatchNo',
        props: 'dispatchNo',
        size: 2,
        colName: 'CHARACTER.DISPATCH_NO',
        colPlaceHolder: 'CHARACTER.SEL_DISPATCH_NO',
        filter: true,
        isTranslate: false,
        width: '100',
        sort: true,
        isNeedToTranslate: false,
      });
    }
    if (this.dispatchDate) {
      this.forwardDestinationColumns.splice(6, 0, {
        name: 'updatedDate',
        props: 'updatedDate',
        size: 2,
        colName: 'COMPLAINT.REPLY_TO_DATE',
        colPlaceHolder: 'COMPLAINT.ENTR_REPLY_TO_DATE',
        filter: true,
        isTranslate: false,
        width: '100',
        sort: true,
        type: 'DATE',
        isNeedToTranslate: false,
      });
    }

    this.forwardDestinationPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new ReplyComment(
        true,
        this.forwardDestinationModule == 'APPOINTMENT'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'GRSECTION'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'CHARACTER'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'CITIZENREPORT'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'COMMISSION'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'COMPLAINT'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'COURT'
          ? this.forwardDestinationId
          : null,
        null,
        null,
        this.forwardDestinationModule == 'DEADPERSON'
          ? this.forwardDestinationId
          : null,
        null,
        null,
        null,
        null,
        this.forwardDestinationModule == 'RECEIPT'
          ? this.forwardDestinationId
          : null || this.forwardDestinationModule == 'DISPATCH'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'FOUNDPERSON'
          ? this.forwardDestinationId
          : null,
        null,
        this.forwardDestinationModule == 'LEAVE'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'MISSINGPERSON'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'PASSPORT'
          ? this.forwardDestinationId
          : null,
        null,
        this.forwardDestinationModule == 'PROCECUTION'
          ? this.forwardDestinationId
          : null,
        null,
        null,
        null,
        null,
        null,
        null,
        this.forwardDestinationModule == 'RTI'
          ? this.forwardDestinationId
          : null,
        null,
        null,
        null,
        null,
        null,
        this.forwardDestinationModule == 'VISITORS'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'COMPLAINT_GPO'
          ? this.forwardDestinationId
          : null,
        this.forwardDestinationModule == 'COMPLAINT_GFPO'
          ? this.forwardDestinationId
          : null
      )
    );
  }
}
