import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Leave } from 'src/app/models/Leave';
import { LeaveResource } from 'src/app/models/LeaveResource';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { Resource } from 'src/app/models/Resource';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  subscription: any;
  resourceId: number;
  page: Page;
  rows = new Array<Leave>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
    },
    {
      name: 'creationDate',
      props: 'creationDate',
      size: 2,
      colName: 'Created Date',
      colPlaceHolder: 'Enter Created Date',
      type: 'DATE',
      isTranslate: false,
      sort: true,
      filter: true,
    },
    {
      name: 'leaveStartDate',
      props: 'leaveStartDate',
      size: 2,
      colName: 'Start Date',
      colPlaceHolder: 'Enter Start Date',
      type: 'DATE',
      isTranslate: false,
      sort: true,
      filter: true,
    },
    {
      name: 'leaveEndDate',
      props: 'leaveEndDate',
      size: 2,
      colName: 'End Date',
      colPlaceHolder: 'Enter End Date',
      type: 'DATE',
      isTranslate: false,
      sort: true,
      filter: true,
    },
    {
      name: 'leaveNoOffDays',
      props: 'leaveNoOffDays',
      size: 2,
      colName: 'Number of Leave Days',
      colPlaceHolder: 'Enter Number of Leave Days',
      isTranslate: false,
      sort: true,
      filter: true,
    },
    {
      name: 'leaveReason',
      props: 'leaveReason',
      size: 2,
      colName: 'Leave Reason',
      colPlaceHolder: 'Enter Leave Reason',
      isTranslate: true,
      sort: true,
      filter: true,
    },
    {
      name: 'leaveDescription',
      props: 'leaveDescription',
      size: 2,
      colName: 'Leave Description',
      colPlaceHolder: 'Enter Leave Description',
      isTranslate: true,
      sort: true,
      filter: true,
    },
    {
      name: 'leaveStatus',
      props: 'leaveStatus',
      size: 2,
      colName: 'Leave Status',
      colPlaceHolder: 'Enter Leave Status',
      isTranslate: true,
      sort: true,
      filter: true,
    },
    {
      name: 'leaveManagerComment',
      props: 'leaveManagerComment',
      size: 2,
      colName: 'Leave Manager Comment',
      colPlaceHolder: 'Enter Leave Manager Comment',
      isTranslate: true,
      sort: true,
      filter: true,
    },
  ];

  path: string = AppConstants.RESOURCE_LEAVE_MODULE.FETCH_ALL_HISTORY_LEAVES;
  permissions: Permissions = new Permissions();

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private resourceStore: Store<{ resouce: Resource }>
  ) {
    this.global.checkForUserResourcePermission(this.router.url);

    this.subscription = this.resourceStore.pipe(select('resouce')).subscribe((data) => {
      this.resourceId = data.resource.id;
    });

    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new Leave(
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
        this.resourceId,
        null,
        null,
        null,
        null,
        null,
        null
      )
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
}
