import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { CitizenReport } from 'src/app/models/CitizenReport';
import { Citizen } from 'src/app/models/citizens.model';

@Component({
  selector: 'app-admin-citizen-report',
  templateUrl: './admin-citizen-report.component.html',
  styleUrls: ['./admin-citizen-report.component.scss'],
})
export class AdminCitizenReportComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [
      { prop: 'updateStatus', dir: 'desc' },
      { prop: 'id', dir: 'desc' },
    ],
    new CitizenReport(
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
  rows = new Array<CitizenReport>();
  row = new Array<Citizen>();

  columns = [
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
      name: 'CitizenName',
      props: 'citizenName',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'CitizenDate',
      props: 'citizenDate',
      size: 2,
      colName: 'CITIZEN_REPORT.INCI_DATE',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_INCIDENT_DATE',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ReportType',
      props: 'reportType',
      size: 2,
      colName: 'CITIZEN_REPORT.REP_TYPE',
      colPlaceHolder: 'CITIZEN_REPORT.SELECT_REPORT_TYPE',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ModelType',
      props: 'modelType',
      size: 2,
      colName: 'CITIZEN_REPORT.REP_FOR',
      colPlaceHolder: 'CITIZEN_REPORT.SELECT_REPORT_FOR',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ModelName',
      props: 'modelName',
      size: 2,
      colName: 'CITIZEN_REPORT.MOD_NAME',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_MODEL_NAME',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ModelNumber',
      props: 'modelNumber',
      size: 2,
      colName: 'CITIZEN_REPORT.MOD_NUMBER',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_MODEL_NUMBER',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'reportedBy',
      props: 'reportedBy',
      size: 2,
      colName: 'CITIZEN_REPORT.REPORT_BY',
      colPlaceHolder: 'CITIZEN_REPORT.ENTER_REPORT_BY',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'stationName',
      props: 'stationName',
      size: 2,
      colName: 'POLICE_STATION.STATION_NAME',
      colPlaceHolder: 'POLICE_STATION.STATION_NAME',
      filter: false,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'otherStationName',
    //   props: 'otherStationName',
    //   size: 2,
    //   colName: 'APPOINTMENT.OTHER_POLICE',
    //   colPlaceHolder: 'POLICE_STATION.STATION_NAME',
    //   filter: false,
    //   sort: false,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    {
      name: 'createdDate',
      props: 'createdDate',
      size: 1,
      colName: 'CHARACTER.CREATED_DATE',
      filter: true,
      sort: true,
      isTranslate: false,
      type: 'DATE',
      isNeedToTranslate: false,
    },
    {
      name: 'status',
      props: 'status',
      size: 2,
      colName: 'COMPLAINT.STATUS',
      colPlaceHolder: 'COMPLAINT.STATUS',
      filter: true,
      isTranslate: true,
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
      colName: 'FORMS.NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'citizenName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'CITIZEN_REPORT.INCI_DATE',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_INCIDENT_DATE',
      data: 'citizenDate',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'CITIZEN_REPORT.REP_TYPE',
      colPlaceHolder: 'CITIZEN_REPORT.SELECT_REPORT_TYPE',
      data: 'reportType',
      translate: false,
      type: 'SELECT',
      options: [
        {
          value: 'null',
          key: 'CITIZEN_REPORT.SELECT_REPORT_TYPE',
        },
        {
          value: 'Lost',
          key: 'CITIZEN_REPORT.LOST',
        },
        {
          value: 'Found',
          key: 'CITIZEN_REPORT.FOUND',
        },
        {
          value: 'Stolen',
          key: 'CITIZEN_REPORT.STOLEN',
        },
        {
          value: 'Seized',
          key: 'CITIZEN_REPORT.SEIZED',
        },
      ],
    },
    {
      colName: 'CITIZEN_REPORT.REP_FOR',
      colPlaceHolder: 'CITIZEN_REPORT.SELECT_REPORT_FOR',
      data: 'modelType',
      translate: false,
      type: 'SELECT',
      options: [
        {
          value: 'null',
          key: 'CITIZEN_REPORT.SELECT_REPORT_FOR',
        },
        {
          value: 'Mobile',
          key: 'CITIZEN_REPORT.MOBILE',
        },
        {
          value: 'Vehicle',
          key: 'CITIZEN_REPORT.VEHICLE',
        },
        {
          value: 'Other',
          key: 'CITIZEN_REPORT.OTHER',
        },
      ],
    },
    {
      colName: 'CITIZEN_REPORT.MOD_NAME',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_MODEL_NAME',
      data: 'modelName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'CITIZEN_REPORT.MOD_NUMBER',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_MODEL_NUMBER',
      data: 'modelNumber',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'reportedBy',
      colName: 'CITIZEN_REPORT.REPORT_BY',
      colPlaceHolder: 'CITIZEN_REPORT.ENTER_REPORT_BY',
      translate: true,
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
      data: 'otherStationName',
      colName: 'APPOINTMENT.OTHER_POLICE',
      colPlaceHolder: 'POLICE_STATION.STATION_NAME',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'status',
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      translate: true,
      type: 'STATUS',
      module: 'CITIZENREPORT',
    },
    {
      data: 'createdDate',
      colName: 'Created Date',
      colPlaceHolder: 'Created Date',
      translate: false,
      type: 'DATE',
    },
  ];

  path: string = AppConstants.CITIZEN_REPORT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.EDIT_BUTTON
    );

    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.DELETE_BUTTON
    );

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.CITIZEN_REPORT_MODULE.VIEW_BUTTON
    );

    this.permissions.add_url = AppConstants.CITIZEN_REPORT_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.CITIZEN_REPORT_MODULE.EDIT_URL;
    this.permissions.delete_url = AppConstants.CITIZEN_REPORT_MODULE.DELETE_URL;
    this.permissions.view_url = AppConstants.CITIZEN_REPORT_MODULE.VIEW_URL;
  }
  ngOnInit(): void {}
}
