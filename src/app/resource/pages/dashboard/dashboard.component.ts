import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Holiday } from 'src/app/models/Holiday';
import { LeaveResource } from 'src/app/models/LeaveResource';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { Resource } from 'src/app/models/Resource';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: any;
  resourceId: number;
  page: Page;
  rows = new Array<LeaveResource>();

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
      name: 'LeaveTypeName',
      props: 'LeaveTypeName',
      size: 2,
      colName: 'Leave Type Name',
      colPlaceHolder: 'Enter Leave Type Name',
      isTranslate: true,
      sort: true,
      filter: true,
    },
    {
      name: 'reInteger2',
      props: 'reInteger2',
      size: 2,
      colName: 'Value',
      colPlaceHolder: 'Enter Value',
      isTranslate: true,
      sort: true,
      filter: true,
    },
    {
      name: 'remHoliday',
      props: 'remHoliday',
      size: 2,
      colName: 'Remaining Holidays',
      colPlaceHolder: 'Enter Remaining Holidays',
      isTranslate: true,
      sort: true,
      filter: true,
    },
    {
      name: 'approvedLeaves',
      props: 'approvedLeaves',
      size: 2,
      colName: 'Approved Leaves',
      colPlaceHolder: 'Enter Approved Leaves',
      isTranslate: true,
      sort: true,
      filter: true,
    },
  ];

  path: string = AppConstants.RESOURCE_LEAVE_MODULE.FETCH_ALL_APPLIED_LEAVES;
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
      new LeaveResource(
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
        null
      )
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
}
