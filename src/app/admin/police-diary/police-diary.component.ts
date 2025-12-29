import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { PoliceDiary } from 'src/app/models/PoliceDiary';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-police-diary',
  templateUrl: './police-diary.component.html',
  styleUrls: ['./police-diary.component.scss'],
})
export class PoliceDiaryComponent implements OnInit {
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
      name: 'crNo',
      props: 'crNo',
      size: 2,
      colName: 'POLICE_DIARY.CR_NO',
      colPlaceHolder: 'POLICE_DIARY.CR_NO',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.CR_NO',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'kandTithi',
      props: 'kandTithi',
      size: 2,
      colName: 'POLICE_DIARY.KAND_TITHI',
      colPlaceHolder: 'POLICE_DIARY.KAND_TITHI',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.KAND_TITHI',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'dhara',
      props: 'dhara',
      size: 2,
      colName: 'POLICE_DIARY.DHARA',
      colPlaceHolder: 'POLICE_DIARY.DHARA',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.DHARA',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'crimeLocation',
      props: 'crimeLocation',
      size: 2,
      colName: 'POLICE_DIARY.CRIME_LOCATION',
      colPlaceHolder: 'POLICE_DIARY.CRIME_LOCATION',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.CRIME_LOCATION',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'personDetails',
      props: 'personDetails',
      size: 2,
      colName: 'POLICE_DIARY.PERSONAL_DETAIL',
      colPlaceHolder: 'POLICE_DIARY.PERSONAL_DETAIL',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.PERSONAL_DETAIL',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'otherDetails',
      props: 'otherDetails',
      size: 2,
      colName: 'POLICE_DIARY.OTHER_DETAIL',
      colPlaceHolder: 'POLICE_DIARY.OTHER_DETAIL',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.OTHER_DETAIL',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'location',
      props: 'location',
      size: 2,
      colName: 'POLICE_DIARY.LOCATION',
      colPlaceHolder: 'POLICE_DIARY.LOCATION',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.LOCATION',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'fillOne',
      props: 'fillOne',
      size: 2,
      colName: 'POLICE_DIARY.FILL_1',
      colPlaceHolder: 'POLICE_DIARY.FILL_1',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.FILL_1',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'fillTwo',
      props: 'fillTwo',
      size: 2,
      colName: 'POLICE_DIARY.FILL_2',
      colPlaceHolder: 'POLICE_DIARY.FILL_2',
      isTranslate: true,
      filter: true,
      filterLabel: 'POLICE_DIARY.FILL_2',
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
      colName: 'POLICE_DIARY.CR_NO',
      colPlaceHolder: 'POLICE_DIARY.CR_NO',
      data: 'crNo',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.KAND_TITHI',
      colPlaceHolder: 'POLICE_DIARY.KAND_TITHI',
      data: 'kandTithi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.DHARA',
      colPlaceHolder: 'POLICE_DIARY.DHARA',
      data: 'dhara',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.CRIME_LOCATION',
      colPlaceHolder: 'POLICE_DIARY.CRIME_LOCATION',
      data: 'crimeLocation',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.PERSONAL_DETAIL',
      colPlaceHolder: 'POLICE_DIARY.PERSONAL_DETAIL',
      data: 'personDetails',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.OTHER_DETAIL',
      colPlaceHolder: 'POLICE_DIARY.OTHER_DETAIL',
      data: 'otherDetails',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.LOCATION',
      colPlaceHolder: 'POLICE_DIARY.LOCATION',
      data: 'location',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.FILL_1',
      colPlaceHolder: 'POLICE_DIARY.FILL_1',
      data: 'fillOne',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.FILL_2',
      colPlaceHolder: 'POLICE_DIARY.FILL_2',
      data: 'fillTwo',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_DIARY.CREATED_DATE',
      colPlaceHolder: 'POLICE_DIARY.CREATED_DATE',
      data: 'createdDate',
      translate: true,
      type: 'DATE',
    },
  ];

  path: string = AppConstants.POLICE_DIARY_MODULE.FETCH_URL;
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
      AppConstants.POLICE_DIARY_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_DIARY_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.POLICE_DIARY_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.POLICE_DIARY_MODULE.EDIT_URL;

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_DIARY_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_DIARY_MODULE.DELETE_BUTTON
    );

    this.permissions.view_url = AppConstants.POLICE_DIARY_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.POLICE_DIARY_MODULE.DELETE_URL;
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
