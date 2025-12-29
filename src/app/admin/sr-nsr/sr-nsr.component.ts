import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { PoliceDiary } from 'src/app/models/PoliceDiary';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-sr-nsr',
  templateUrl: './sr-nsr.component.html',
  styleUrls: ['./sr-nsr.component.scss'],
})
export class SrNsrComponent implements OnInit {
  policeStationId: number | null = null;
  page: Page;
  rows = new Array<PoliceDiary>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter ID',
      filter: false,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'stationName',
      props: 'stationName',
      size: 2,
      colName: 'POLICE_STATION.POLICE_STATION_TITLE',
      colPlaceHolder: 'APPOINTMENT.ENTER_POLICE_STATION',
      filter: true,
      filterType: 'stations',
      filterLabel: 'Station Name',
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'firNo',
      props: 'firNo',
      size: 2,
      colName: 'SR_NSR.FIRNO',
      colPlaceHolder: 'SR_NSR.FIRNO',
      isTranslate: true,
      filter: true,
      filterLabel: 'SR_NSR.FIRNO',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'firDate',
      props: 'firDate',
      size: 2,
      colName: 'SR_NSR.FIRDATE',
      colPlaceHolder: 'SR_NSR.FIRDATE',
      isTranslate: true,
      filter: true,
      filterLabel: 'SR_NSR.FIRDATE',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
      type: 'DATE',
    },
    {
      name: 'uis',
      props: 'uis',
      size: 2,
      colName: 'SR_NSR.UIS',
      colPlaceHolder: 'SR_NSR.UIS',
      isTranslate: true,
      filter: true,
      filterLabel: 'SR_NSR.UIS',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'firType',
      props: 'firType',
      size: 2,
      colName: 'SR_NSR.FIRTYPE',
      colPlaceHolder: 'SR_NSR.FIRTYPE',
      isTranslate: true,
      filter: true,
      filterLabel: 'SR_NSR.FIRTYPE',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'firDoc',
      props: 'firDoc',
      size: 2,
      type: 'MEDIA',
      colName: 'SR_NSR.FIRDOC',
      isTranslate: false,
      width: '100',
      sort: false,
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

  filterOptions = [
    {
      colName: 'Id',
      colPlaceHolder: 'Id',
      data: 'id',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'stationIds',
      colName: 'POLICE_STATION.STATION_NAME',
      colPlaceHolder: 'POLICE_STATION.STATION_NAME',
      translate: true,
      type: 'STATION',
    },
    {
      colName: 'SR_NSR.FIRNO',
      colPlaceHolder: 'SR_NSR.FIRNO',
      data: 'firNo',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'SR_NSR.UIS',
      colPlaceHolder: 'SR_NSR.UIS',
      data: 'uis',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'fromDate',
      colName: 'From Date',
      colPlaceHolder: 'From Date',
      translate: false,
      type: 'DATE',
    },
    {
      data: 'toDate',
      colName: 'To Date',
      colPlaceHolder: 'To Date',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'SR_NSR.FIRTYPE',
      colPlaceHolder: 'SR_NSR.FIRTYPE',
      data: 'firType',
      translate: true,
      type: 'FIRTYPE',
    },
  ];

  path: string = AppConstants.SR_NSR_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private authStore: Store<{ auth: any }>
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.authStore.pipe(select('auth')).subscribe((data) => {
      if (data.user.roleName == 'SHO') {
        this.filterOptions.splice(1, 1);
        this.policeStationId = data.user.stationId;
      }
    });

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.SR_NSR_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SR_NSR_MODULE.EDIT_URL;

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.SR_NSR_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.SR_NSR_MODULE.DELETE_URL;
  }

  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new PoliceDiary(
        null,
        this.policeStationId,
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
        true
      )
    );
  }

  goToLink = (url: any) => {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };
}
