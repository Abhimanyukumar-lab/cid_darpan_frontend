import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { GrSection } from 'src/app/models/GrSection';
import { GrSectionDetails } from 'src/app/models/GrSectionDetails';

@Component({
  selector: 'app-gr-section-details-table',
  templateUrl: './gr-section-details-table.component.html',
  styleUrls: ['./gr-section-details-table.component.scss'],
})
export class GrSectionDetailsTableComponent implements OnInit {
  grSectionPage: Page;
  grSectionRows = new Array<GrSection>();

  grSectionColumns = [
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
      colName: 'Gr Section Type',
      colPlaceHolder: 'Enter Gr Section Type',
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
  grSectionPath: string;

  @Input()
  deleteButtonCode: string;

  @Input()
  deleteButtonUrl: string;

  @Input()
  grSectionModule: string;

  @Input()
  grSectionId: number;

  grSectionPermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {
    this.grSectionPermissions.grSectionDelete = this.global.checkForUserButtonPermission(
      this.deleteButtonCode
    );

    this.grSectionPermissions.grSectionDelete_url = this.deleteButtonUrl;

    this.grSectionPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new GrSectionDetails(true, null, this.grSectionId, null, null, null)
    );
  }
}
