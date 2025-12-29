import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/common/popup/model.service';
import { CIDCrimeData } from 'src/app/models/CIDCrimeData';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { SrsNsrsCases } from 'src/app/models/SrsNsrsCases';
import { SrsNsrsCasesTrail } from 'src/app/models/SrsNsrsCasesTrail';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-sr-nsr-cases-trail',
  templateUrl: './sr-nsr-cases-trail.component.html',
  styleUrls: ['./sr-nsr-cases-trail.component.scss']
})
export class SrNsrCasesTrailComponent implements OnInit {
  page = new Page(
      0,
      0,
      0,
      0,
      true,
      null,
      new CIDCrimeData(
        "Yesss",
      )
    );
  rows = new Array<CIDCrimeData>();

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
      name: 'firNo',
      props: 'firNo',
      size: 1,
      colName: 'Case No',
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
      name: 'chargesheet',
      props: 'chargesheet',
      size: 1,
      colName: 'Chargesheet Status',
      colPlaceHolder: 'Enter Chargesheet Status',
      filter: true,
      sort: false,
      isTranslate: false,
      isNeedToTranslate: false,
    },
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
          key: 'SR-SP to Supervise & Control',
          value: 'SR-SP',
        },
        {
          key: 'SR-SDPO to Supervise & SP to Control',
          value: 'SR-SDPO',
        },
        {
          key: 'SR-DYSP Traffic to Supervise & SP to Control',
          value: 'SR-DYSP',
        },
        {
          key: 'SR-SDPO to Supervise & Control',
          value: 'SR-SDPO',
        },
        {
          key: 'SR-DYSP Traffic to Supervise & Control',
          value: 'SR-DYSP',
        },
        {
          key: 'NSR-SP to Control',
          value: 'NSR-SP',
        },
        {
          key: 'NSR-SDPO to Supervise & Control',
          value: 'NSR-SDPO',
        },
        {
          key: 'NSR-INSP to Supervise & Control',
          value: 'NSR-INSP',
        },
        {
          key: 'NSR-SHO to Supervise & Control',
          value: 'NSR-SHO',
        },
        {
          key: 'NSR-DySP Traffic to Supervise & Control',
          value: 'NSR-DySP',
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
      colName: 'Complainant/Victim',
      colPlaceHolder: 'Enter Complainant/Victim',
      data: 'complainantVictim',
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
      colName: 'Sub Major Head',
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

  path: string = "getCIDCrimeDataTrail";
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

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.VIEW_BUTTON
    );

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
