import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { ReplyComplaint } from 'src/app/models/ReplyComplaint';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { CourtDetails } from 'src/app/models/CourtDetails';

@Component({
  selector: 'app-court-details',
  templateUrl: './court-details.component.html',
  styleUrls: ['./court-details.component.scss'],
})
export class CourtDetailsComponent implements OnInit {
  courtDetailsPage: Page;
  courtDetailsRows = new Array<ReplyComplaint>();

  courtDetailsColumns = [
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
      name: 'nextDate',
      props: 'nextDate',
      size: 2,
      colName: 'Next Date',
      colPlaceHolder: 'Enter Next Date',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'description',
      props: 'description',
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
      name: 'courtType',
      props: 'courtType',
      size: 2,
      colName: 'Court Type',
      colPlaceHolder: 'Enter Court Type',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
  ];

  @Input()
  courtDetailsPath: string;

  @Input()
  deleteButtonCode: string;

  @Input()
  deleteButtonUrl: string;

  @Input()
  courtDetailsModule: string;

  @Input()
  courtDetailsId: number;

  courtDetailsPermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {
    this.courtDetailsPermissions.delete = this.global.checkForUserButtonPermission(
      this.deleteButtonCode
    );

    this.courtDetailsPermissions.delete_url = this.deleteButtonUrl;

    this.courtDetailsPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new CourtDetails(true, null, this.courtDetailsId, null, null, null)
    );
  }
}
