import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ProcecutionDetails } from 'src/app/models/ProcecutionDetails';

@Component({
  selector: 'app-procecution-details-table',
  templateUrl: './procecution-details-table.component.html',
  styleUrls: ['./procecution-details-table.component.scss'],
})
export class ProcecutionDetailsTableComponent implements OnInit {
  procecutionPage: Page;
  procecutionRows = new Array<ProcecutionDetails>();

  procecutionColumns = [
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
      name: 'personName',
      props: 'personName',
      size: 2,
      colName: 'Person Name',
      colPlaceHolder: 'Enter Person Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'type',
      props: 'type',
      size: 2,
      colName: 'Procecution Type',
      colPlaceHolder: 'Enter Procecution Type',
      isTranslate: false,
      filter: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'accuseIn',
      props: 'accuseIn',
      size: 2,
      colName: 'Accused In',
      filter: false,
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
  procecutionPath: string;

  @Input()
  deleteButtonCode: string;

  @Input()
  deleteButtonUrl: string;

  @Input()
  procecutionModule: string;

  @Input()
  procecutionId: number;

  procecutionPermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {
    this.procecutionPermissions.procecutionDelete = this.global.checkForUserButtonPermission(
      this.deleteButtonCode
    );

    this.procecutionPermissions.procecutionDelete_url = this.deleteButtonUrl;

    this.procecutionPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new ProcecutionDetails(true, null, this.procecutionId, null, null, null)
    );
  }
}
