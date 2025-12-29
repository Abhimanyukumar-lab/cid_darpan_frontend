import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/common/popup/model.service';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { SrsNsrsCases } from 'src/app/models/SrsNsrsCases';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-sr-nsr-cases',
  templateUrl: './sr-nsr-cases.component.html',
  styleUrls: ['./sr-nsr-cases.component.scss'],
})
export class SrNsrCasesComponent implements OnInit {
  page: Page;
  rows = new Array<SrsNsrsCases>();

  accuseds: any[] = [];
  firDate: string;

  openModal = (row: any) => {
    this.fetchAccuseds(row.id);
    this.firDate = row.firDate;
    this.modelService.open('appModal');
  };

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
      name: 'srsNsrsType',
      props: 'srsNsrsType',
      size: 1,
      colName: 'SR/NSR',
      colPlaceHolder: 'SR/NSR',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'firNo',
      props: 'firNo',
      size: 1,
      colName: 'FIR No',
      colPlaceHolder: 'Enter FIR No',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'firDate',
      props: 'firDate',
      size: 1,
      colName: 'FIR Date',
      colPlaceHolder: 'Enter FIR No',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'srNo',
      props: 'srNo',
      size: 1,
      colName: 'SR No',
      colPlaceHolder: 'Enter FIR No',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'crimeCategoryName',
      props: 'crimeCategoryName',
      size: 1,
      colName: 'Major Head Name',
      colPlaceHolder: 'Enter Major Head Name',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'crimeCategoryTypeName',
      props: 'crimeCategoryTypeName',
      size: 1,
      colName: 'Sub Head Name',
      colPlaceHolder: 'Sub Head Name',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'policeStationName',
      props: 'policeStationName',
      size: 1,
      colName: 'Police Station',
      colPlaceHolder: 'Enter Police Station',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'accused',
      props: 'accused',
      size: 1,
      colName: 'Accused',
      colPlaceHolder: 'Enter Accused',
      filter: false,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
      type: 'MODEL',
      click: this.openModal,
    },
    // {
    //   name: 'chargesheet',
    //   props: 'chargesheet',
    //   size: 1,
    //   colName: 'Chargesheet Status',
    //   colPlaceHolder: 'Enter Chargesheet Status',
    //   filter: true,
    //   sort: false,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'chargesheetMonitoringDays',
    //   props: 'chargesheetMonitoringDays',
    //   type: 'CID_PROGRESS',
    //   size: 1,
    //   colName: 'Chargesheet Time',
    //   colPlaceHolder: 'Enter Chargesheet Time',
    //   filter: false,
    //   sort: false,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    //   extra: 'firDate',
    // },
    // {
    //   name: 'complainantVictim',
    //   props: 'complainantVictim',
    //   size: 1,
    //   colName: 'Complainant/Victim',
    //   colPlaceHolder: 'Enter Complainant/Victim',
    //   filter: true,
    //   sort: false,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'crimeCategoryTypeName',
    //   props: 'crimeCategoryTypeName',
    //   size: 1,
    //   colName: 'Sub Major Head',
    //   colPlaceHolder: 'Enter Sub Major Head',
    //   filter: true,
    //   sort: false,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
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
      data: 'srsNsrsType',
      colName: 'SR/NSR',
      colPlaceHolder: 'Select SR/NSR',
      translate: false,
      type: 'SELECT',
      options: [
        {
          key: 'Select SR/NSR',
          value: 'null',
        },
        {
          key: 'SR',
          value: 'SR',
        },
        {
          key: 'NSR',
          value: 'NSR',
        },
      ],
    },
    {
      colName: 'Accused Name',
      colPlaceHolder: 'Enter Accused Name',
      data: 'accused',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Fir No',
      colPlaceHolder: 'Enter Fir No',
      data: 'firNo',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'chargesheet',
      colName: 'Chargesheet Status',
      colPlaceHolder: 'Select Chargesheet Status',
      translate: false,
      type: 'SELECT',
      options: [
        {
          key: 'Select Chargesheet Status',
          value: 'null',
        },
        {
          key: 'Yes',
          value: 'Yes',
        },
        {
          key: 'No',
          value: 'No',
        },
      ],
    },
    {
      colName: 'Section',
      colPlaceHolder: 'Enter Section',
      data: 'section',
      translate: false,
      type: 'INPUT',
    },
    {
      data: 'cidCrimeCategoryId',
      colName: 'Major Head',
      colPlaceHolder: 'Select Major Head',
      translate: false,
      type: 'SELECT',
      options: [],
    },
    {
      data: 'cidCrimeCategoryTypeId',
      colName: 'Sub Head',
      colPlaceHolder: 'Select Sub Major Head',
      translate: false,
      type: 'SELECT',
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
      data: 'cidPoliceStationId',
      colName: 'Police Station',
      colPlaceHolder: 'Select Police Station',
      translate: false,
      type: 'SELECT',
      options: [],
    },
  ];

  path: string = AppConstants.SR_NSR_CASES_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  subdivisionList: any[] = [];
  circleInspectorList: any[] = [];
  stationList: any[] = [];
  majorHeads: any[] = [];
  subMajorHeads: any[] = [];

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private apiService: ApiCallerService,
    private modelService: ModelService
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.EDIT_BUTTON
    );

    this.permissions.add_url = AppConstants.SR_NSR_CASES_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.SR_NSR_CASES_MODULE.EDIT_URL;

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.VIEW_BUTTON
    );

    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.deactivate_url =
      AppConstants.SR_NSR_CASES_MODULE.DEACTIVATE_URL;

    this.permissions.activate_url =
      AppConstants.SR_NSR_CASES_MODULE.ACTIVATE_URL;

    this.permissions.view_url = AppConstants.SR_NSR_CASES_MODULE.VIEW_URL;
    // this.permissions.delete_url =
    // AppConstants.SR_NSR_CASES_MODULE.DELETE_URL;

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

        this.filterOptions[8].options = subDivision;
      });

    // this.apiService
    //   .apiGetCall(AppConstants.USER_MODULE.FETCH_CIRCLE_INSPCTOR, true)
    //   .subscribe((data) => {
    //     this.circleInspectorList = data.circleInspectorDTO;

    //     var circleINspectors: any[] = [
    //       { key: 'Select Circle Inspector', value: 'null' },
    //     ];

    //     this.circleInspectorList.map((circleInspector) => {
    //       circleINspectors.push({
    //         key: circleInspector.circleName,
    //         value: circleInspector.id,
    //       });
    //     });

    //     this.filterOptions[9].options = circleINspectors;
    //   });

    this.apiService
      .apiGetCall(AppConstants.USER_MODULE.FETCH_STATION, true)
      .subscribe((data) => {
        this.stationList = data.stationDtos;

        var policeStations: any[] = [
          { key: 'Select Police Station', value: 'null' },
        ];

        this.stationList.map((station) => {
          policeStations.push({
            key: station.stationName,
            value: station.id,
          });
        });

        this.filterOptions[9].options = policeStations;
      });

    this.fetchMajorHead();
    this.fetchSubMajorHead();
  }

  fetchMajorHead = () => {
    this.apiService
      .apiGetCall('getCIDCrimeCategoryList', true)
      .subscribe((data) => {
        this.majorHeads = data.cidCrimeCategories;

        var majorHeadList: any[] = [
          { key: 'Select Major Head', value: 'null' },
        ];

        this.majorHeads.map((major) => {
          majorHeadList.push({
            key: major.nameOfCrimeCategory,
            value: major.id,
          });
        });

        this.filterOptions[6].options = majorHeadList;
      });
  };

  fetchSubMajorHead = () => {
    this.apiService
      .apiGetCall('getCIDCrimeCategoryTypeData', true)
      .subscribe((data) => {
        this.subMajorHeads = data.cidCrimeCategories;

        var subMajorHeadList: any[] = [
          { key: 'Select Sub Major Head', value: 'null' },
        ];

        this.subMajorHeads.map((submajor) => {
          subMajorHeadList.push({
            key: submajor.typeOfCrime,
            value: submajor.id,
          });
        });

        this.filterOptions[7].options = subMajorHeadList;
      });
  };

  ngOnInit(): void {
    this.page = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new SrsNsrsCases()
    );
  }

  goToLink = (url: any) => {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };

  fetchAccuseds = (id: any) => {
    this.apiService
      .apiPostCall('getCIDCrimeDataAccused', { id: id }, true)
      .subscribe((data) => {
        this.accuseds = data.cidCrimeAccusedPeople;
      });
  };
}
