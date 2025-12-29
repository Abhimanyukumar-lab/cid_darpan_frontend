import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { ApiCallerService } from 'src/app/services/api-caller.service';

@Component({
  selector: 'app-admin-police-station',
  templateUrl: './admin-police-station.component.html',
  styleUrls: ['./admin-police-station.component.scss'],
})
export class AdminPoliceStationComponent implements OnInit {
  page: Page;
  rows = new Array<PoliceStation>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'stationName',
      props: 'stationName',
      size: 2,
      colName: 'POLICE_STATION.STATION_NAME',
      colPlaceHolder: 'POLICE_STATION.ENTER_STATION_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'stationNameHi',
      props: 'stationNameHi',
      size: 2,
      colName: 'POLICE_STATION.STATION_NAME',
      colPlaceHolder: 'POLICE_STATION.ENTER_STATION_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'stationImag',
      props: 'stationImag',
      size: 2,
      type: 'MEDIA',
      colName: 'POLICE_STATION.STATION_IMAGE',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'stationNo',
      props: 'stationNo',
      size: 2,
      colName: 'POLICE_STATION.STATION_NUMBER',
      colPlaceHolder: 'POLICE_STATION.ENTER_STATION_NUMBER',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'stationEmail',
      props: 'stationEmail',
      size: 2,
      colName: 'POLICE_STATION.STATION_EMAIL',
      colPlaceHolder: 'POLICE_STATION.ENTER_STATION_EMAIL',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'stationPriority',
      props: 'stationPriority',
      size: 1,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
      isTranslate: false,
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
      options: [],
    },
    {
      data: 'stationName',
      colName: 'POLICE_STATION.STATION_NAME',
      colPlaceHolder: 'POLICE_STATION.ENTER_STATION_NAME',
      translate: false,
      type: 'INPUT',
      options: [],
    },
    {
      data: 'cidSubDivisionId',
      colName: 'Sub Division',
      colPlaceHolder: 'Select Sub Division',
      translate: false,
      type: 'SELECT',
      options: [],
    },
    {
      data: 'stationNo',
      colName: 'POLICE_STATION.STATION_NUMBER',
      colPlaceHolder: 'POLICE_STATION.ENTER_STATION_NUMBER',
      translate: true,
      type: 'INPUT',
      options: [],
    },
    {
      data: 'stationEmail',
      colName: 'POLICE_STATION.STATION_EMAIL',
      colPlaceHolder: 'POLICE_STATION.ENTER_STATION_EMAIL',
      translate: false,
      type: 'INPUT',
      options: [],
    },
    {
      data: 'stationPriority',
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      translate: false,
      type: 'INPUT',
      options: [],
    },
  ];

  path: string = AppConstants.POLICE_STATION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  subdivisionList: any[] = [];

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private apiService: ApiCallerService
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.VIEW_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_STATION_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.POLICE_STATION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.POLICE_STATION_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.POLICE_STATION_MODULE.VIEW_URL;
    this.permissions.deactivate_url =
      AppConstants.POLICE_STATION_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.POLICE_STATION_MODULE.ACTIVATE_URL;

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_SUBDIV, true)
      .subscribe((data) => {
        this.subdivisionList = data.subdivisionDTOs;

        var subDivision: any[] = [
          { key: 'Select Sub Division', value: 'null' },
        ];

        this.subdivisionList.map((subDivisionData) => {
          subDivision.push({
            key: subDivisionData.name,
            value: subDivisionData.id,
          });
        });

        this.filterOptions[2].options = subDivision;
      });
  }
  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new PoliceStation(
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
        null
      )
    );
  }
}
