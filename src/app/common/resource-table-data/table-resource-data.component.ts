import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { Permissions } from 'src/app/models/Permissions';
import { LangModule } from 'src/app/models/LangModule';
import { Page } from 'src/app/models/Page';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  RefreshViewDataStart,
  UpdateTableDetails,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import Swal from 'sweetalert2';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-resource-table-data',
  templateUrl: './table-resource-data.component.html',
  styleUrls: ['./table-resource-data.component.scss'],
})
export class TableResourceDataComponent implements OnInit, OnDestroy {
  subscription: any;

  @Input('rows')
  rows: any;

  @Input('page')
  page: Page;

  @Input('columns')
  columns: any;

  @Input('path')
  path: string;

  @Input('permissions')
  permissions: Permissions;

  loading = false;
  ColumnMode = ColumnMode;
  SortType = SortType;
  itemCounts: any = [10, 20, 50, 100];

  baseURL: string;

  currentLang: string;

  constructor(
    private apiCaller: ApiCallerService,
    private router: Router,
    private localStorage: LocalstorageService,
    public langModule: LangModule,
    private appStore: Store<{ app: any }>,
    private globalService: GlobalFunctionsService
  ) {
    this.baseURL =
      this.globalService.getSiteBackUrl() || AppConstants.backServer;

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isTableRefresh == true) this.fetchData();

      this.currentLang = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.page.pageNumber = 0;
    this.page.size = this.itemCounts[0];

    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    this.fetchData();
  }
  onSort(event) {
    const sort = event.sorts[0];

    if (sort) {
      this.loading = true;

      this.page.pageNumber = 0;
      this.page.sort = true;
      this.page.prop = event.sorts;

      this.fetchData();
    }
  }

  changeItemSize(value) {
    this.page.size = value;
    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  updateFilter(event, name) {
    const val = event.target.value.toLowerCase();
    this.page.filter[name] = val;
    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  updateAllFilter(event) {
    const val = event.target.value.toLowerCase();

    this.columns.forEach((column: any) => {
      if (
        column.props != 'active' &&
        column.name != 'Actions' &&
        column.filter == true
      )
        this.page.filter[column.props] = val;
    });

    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  fetchData() {
    this.appStore.dispatch(new UpdateTableDetails(false));
    this.apiCaller
      .apiPostCall(this.path, this.page, true, false)
      .subscribe((pagedData) => {
        this.loading = false;
        this.page = pagedData.page;
        this.rows = pagedData.data;
      });
  }

  onDeactivateData = (row: any, url: string) => {
    var body = {
      id: row.id,
    };

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deactivate',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiCaller.apiPostCall(url, body, true).subscribe((data) => {
          this.fetchData();
        });
      }
    });
  };

  onActivateData = (row: any, url: string) => {
    var body = {
      id: row.id,
    };

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activate',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiCaller.apiPostCall(url, body, true).subscribe((data) => {
          this.fetchData();
        });
      }
    });
  };

  onDeleteData = (row: any, url: string) => {
    var body = {
      id: row.id,
    };

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiCaller.apiPostCall(url, body, true).subscribe((data) => {
          this.fetchData();
        });
      }
    });
  };

  onDeleteDataAndRefreshView = (row: any, url: string) => {
    var body = {
      id: row.id,
    };

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiCaller.apiPostCall(url, body, true).subscribe((data) => {
          this.fetchData();
          this.appStore.dispatch(new RefreshViewDataStart({}));
        });
      }
    });
  };

  goToEditLink = (url: string, data: any) => {
    this.localStorage.setStoredValue('editData', data);
    this.router.navigate([url]);
  };

  goToViewLink = (url: string, data: any) => {
    this.localStorage.setStoredValue('viewData', data);
    this.router.navigate([url]);
  };

  getRowClass = (row) => {
    if (row.updateStatus == 'READ') {
      return {
        'row-color': true,
      };
    }
  };
}
