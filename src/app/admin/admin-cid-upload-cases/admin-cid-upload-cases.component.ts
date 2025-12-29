// import { Component, OnInit } from '@angular/core';
// import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ModelService } from 'src/app/common/popup/model.service';
// import { Page } from 'src/app/models/Page';
// import { Permissions } from 'src/app/models/Permissions';
// import { SrsNsrsCases } from 'src/app/models/SrsNsrsCases';
// import { ApiCallerService } from 'src/app/services/api-caller.service';
// import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
// import { ToasterService } from 'src/app/services/toaster.service';
// import { AppLoadderShow, AppLoadderHide } from 'src/app/storage/actions/app.actions';
// import { AppConstants } from 'src/app/storage/localdata/AppConstants';
// import { Store } from '@ngrx/store';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-admin-cid-upload-cases',
//   templateUrl: './admin-cid-upload-cases.component.html',
//   styleUrls: ['./admin-cid-upload-cases.component.scss']
// })
// export class AdminCidUploadCasesComponent implements OnInit {
//   page: Page;
//   rows = new Array<SrsNsrsCases>();

//   accuseds: any[] = [];
//   firDate: string;

//   openModal = (row: any) => {
//     this.fetchAccuseds(row.id);
//     this.firDate = row.firDate;
//     this.modelService.open('appModal');
//   };

//   columns = [
//     {
//       name: 'Id',
//       props: 'id',
//       size: 1,
//       colName: 'Id',
//       colPlaceHolder: 'Enter ID',
//       sort: true,
//       isTranslate: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'srsNsrsType',
//       props: 'srsNsrsType',
//       size: 2,
//       colName: 'SR NSR ',
//       colPlaceHolder: 'SR NSR',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'districtName',
//       props: 'districtName',
//       size: 2,
//       colName: 'District Name ',
//       colPlaceHolder: 'District Name',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'subdivisionName',
//       props: 'subdivisionName',
//       size: 2,
//       colName: 'subdivision Name',
//       colPlaceHolder: 'subdivision Name',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'policestationName',
//       props: 'policestationName',
//       size: 2,
//       colName: 'Police station',
//       colPlaceHolder: 'Police station',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'srsNsrNo',
//       props: 'srsNsrNo',
//       size: 2,
//       colName: 'SR No',
//       colPlaceHolder: 'SR No',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'caseNo',
//       props: 'caseNo',
//       size: 2,
//       colName: 'Case No',
//       colPlaceHolder: 'Case No',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'caseDate',
//       props: 'caseDate',
//       size: 2,
//       colName: 'Case Date',
//       colPlaceHolder: 'Case Date',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'section',
//       props: 'section',
//       size: 2,
//       colName: 'Section',
//       colPlaceHolder: 'Section',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'ioName',
//       props: 'ioName',
//       size: 2,
//       colName: 'IO Name',
//       colPlaceHolder: 'IO Name',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     // {
//     //   name: 'maxPunishment',
//     //   props: 'maxPunishment',
//     //   size: 2,
//     //   colName: 'Max Punishment',
//     //   colPlaceHolder: 'Max Punishment',
//     //   filter: false,
//     //   isTranslate: true,
//     //   width: '100',
//     //   sort: false,
//     //   isNeedToTranslate: false,
//     // },
//     // {
//     //   name: 'majorHead',
//     //   props: 'majorHead',
//     //   size: 2,
//     //   colName: 'Major Head',
//     //   colPlaceHolder: 'Major Head',
//     //   filter: false,
//     //   isTranslate: true,
//     //   width: '100',
//     //   sort: false,
//     //   isNeedToTranslate: false,
//     // },
//     // {
//     //   name: 'subHead',
//     //   props: 'subHead',
//     //   size: 2,
//     //   colName: 'Sub Head',
//     //   colPlaceHolder: 'Sub Head',
//     //   filter: false,
//     //   isTranslate: true,
//     //   width: '100',
//     //   sort: false,
//     //   isNeedToTranslate: false,
//     // },
//     // {
//     //   name: 'nameComplainant',
//     //   props: 'nameComplainant',
//     //   size: 2,
//     //   colName: 'Complainant Name',
//     //   colPlaceHolder: 'Complainant Name',
//     //   filter: false,
//     //   isTranslate: true,
//     //   width: '100',
//     //   sort: false,
//     //   isNeedToTranslate: false,
//     // },
//     {
//       name: 'Actions',
//       props: 'active',
//       size: 2,
//       colName: 'Actions',
//       isTranslate: false,
//       isNeedToTranslate: false,
//     },
//   ];

//   filterOptions = [
//     {
//       data: 'srsNsrsType',
//       colName: 'SR/NSR',
//       colPlaceHolder: 'Select SR/NSR',
//       translate: false,
//       type: 'SELECT',
//       options: [
//         {
//           key: 'Select SR/NSR',
//           value: 'null',
//         },
//         {
//           key: 'SR',
//           value: 'SR',
//         },
//         {
//           key: 'NSR',
//           value: 'NSR',
//         },
//       ],
//     },
//     {
//       colName: 'District Name',
//       colPlaceHolder: 'Enter District Name',
//       data: 'districtName',
//       translate: false,
//       type: 'SELECT',
// options: [
//   { key: 'Select District', value: 'null' },
//   { key: 'Araria', value: 'Araria' },
//   { key: 'Arwal', value: 'Arwal' },
//   { key: 'Aurangabad', value: 'Aurangabad' },
//   { key: 'Bagaha', value: 'Bagaha' },
//   { key: 'Banka', value: 'Banka' },
//   { key: 'Begusarai', value: 'Begusarai' },
//   { key: 'Bettiah', value: 'Bettiah' },
//   { key: 'Bhagalpur', value: 'Bhagalpur' },
//   { key: 'Bhojpur', value: 'Bhojpur' },
//   { key: 'Buxar', value: 'Buxar' },
//   { key: 'Darbhanga', value: 'Darbhanga' },
//   { key: 'Gaya', value: 'Gaya' },
//   { key: 'Gopalganj', value: 'Gopalganj' },
//   { key: 'Jamalpur Rail', value: 'Jamalpur Rail' },
//   { key: 'Jamui', value: 'Jamui' },
//   { key: 'Jehanabad', value: 'Jehanabad' },
//   { key: 'Kaimur', value: 'Kaimur' },
//   { key: 'Katihar', value: 'Katihar' },
//   { key: 'Katihar Rail', value: 'Katihar Rail' },
//   { key: 'Khagaria', value: 'Khagaria' },
//   { key: 'Kishanganj', value: 'Kishanganj' },
//   { key: 'Lakhisarai', value: 'Lakhisarai' },
//   { key: 'Madhepura', value: 'Madhepura' },
//   { key: 'Madhubani', value: 'Madhubani' },
//   { key: 'Motihari', value: 'Motihari' },
//   { key: 'Munger', value: 'Munger' },
//   { key: 'Muzaffarpur', value: 'Muzaffarpur' },
//   { key: 'Muzaffarpur Rail', value: 'Muzaffarpur Rail' },
//   { key: 'Nalanda', value: 'Nalanda' },
//   { key: 'Naugachhia', value: 'Naugachhia' },
//   { key: 'Nawada', value: 'Nawada' },
//   { key: 'Patna', value: 'Patna' },
//   { key: 'Patna City', value: 'Patna City' },
//   { key: 'Patna East', value: 'Patna East' },
//   { key: 'Patna Rail', value: 'Patna Rail' },
//   { key: 'Patna Rural', value: 'Patna Rural' },
//   { key: 'Patna West', value: 'Patna West' },
//   { key: 'Purnea', value: 'Purnea' },
//   { key: 'Rohtas', value: 'Rohtas' },
//   { key: 'Saharsa', value: 'Saharsa' },
//   { key: 'Samastipur', value: 'Samastipur' },
//   { key: 'Saran', value: 'Saran' },
//   { key: 'Sheikhpura', value: 'Sheikhpura' },
//   { key: 'Sheikhpura.', value: 'Sheikhpura.' },
//   { key: 'Sheohar', value: 'Sheohar' },
//   { key: 'Sitamarhi', value: 'Sitamarhi' },
//   { key: 'Siwan', value: 'Siwan' },
//   { key: 'Supaul', value: 'Supaul' },
//   { key: 'Traffic Patna', value: 'Traffic Patna' },
//   { key: 'Vaishali', value: 'Vaishali' }
// ]

//     },
//     {
//       colName: 'Subdivision Name',
//       colPlaceHolder: 'Enter Subdivision Name',
//       data: 'subdivisionName',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Police Station Name',
//       colPlaceHolder: 'Enter Police Station Name',
//       data: 'policestationName',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'SRS/NSRS No',
//       colPlaceHolder: 'Enter SRS/NSRS No',
//       data: 'srsNsrNo',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Case No',
//       colPlaceHolder: 'Enter Case No',
//       data: 'caseNo',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Case Date',
//       colPlaceHolder: 'Enter Case Date',
//       data: 'caseDate',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Section',
//       colPlaceHolder: 'Enter Section',
//       data: 'section',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'IO Name',
//       colPlaceHolder: 'Enter IO Name',
//       data: 'ioName',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Max Punishment',
//       colPlaceHolder: 'Enter Max Punishment',
//       data: 'maxPunishment',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Major Head',
//       colPlaceHolder: 'Enter Major Head',
//       data: 'majorHead',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Sub Head',
//       colPlaceHolder: 'Enter Sub Head',
//       data: 'subHead',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Name of Complainant',
//       colPlaceHolder: 'Enter Complainant Name',
//       data: 'nameComplainant',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'FSL Visit',
//       colPlaceHolder: 'Enter FSL Visit',
//       data: 'fslVisit',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'e-Sakshya Video',
//       colPlaceHolder: 'Enter e-Sakshya Video Info',
//       data: 'eSakshyaVideo',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Remark',
//       colPlaceHolder: 'Enter Remark',
//       data: 'remark',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'IO Mobile',
//       colPlaceHolder: 'Enter IO Mobile',
//       data: 'ioMobile',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Place of Occurrence',
//       colPlaceHolder: 'Enter Place of Occurrence',
//       data: 'placeOfOccurance',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Location',
//       colPlaceHolder: 'Enter Location',
//       data: 'location',
//       translate: false,
//       type: 'INPUT',
//     },
//     {
//       colName: 'Accused Name',
//       colPlaceHolder: 'Enter Accused Name',
//       data: 'accusedName',
//       translate: false,
//       type: 'INPUT',
//     }

//   ];

//   path: string = AppConstants.EXCEL_MODULE.FETCH_URL;
//   permissions: Permissions = new Permissions();

//   subdivisionList: any[] = [];
//   circleInspectorList: any[] = [];
//   stationList: any[] = [];
//   majorHeads: any[] = [];
//   subMajorHeads: any[] = [];

//   districtList: any[];

//   constructor(
//     private global: GlobalFunctionsService,
//     private router: Router,
//     private apiService: ApiCallerService,
//     private modelService: ModelService,
//     private appStore: Store<{ app: any }>,
//     private toaster: ToasterService,
//     private http: HttpClient,
//     private fb: UntypedFormBuilder,
//   ) {
//     this.global.checkForUserPermission(this.router.url);

//     this.permissions.add = this.global.checkForUserButtonPermission(
//       AppConstants.EXCEL_MODULE.ADD_BUTTON
//     );

//     this.permissions.edit = this.global.checkForUserButtonPermission(
//       AppConstants.EXCEL_MODULE.EDIT_BUTTON
//     );

//     // this.permissions.add_url = AppConstants.EXCEL_MODULE.ADD_URL;
//     this.permissions.edit_url = AppConstants.EXCEL_MODULE.EDIT_URL;

//     this.permissions.view = this.global.checkForUserButtonPermission(
//       AppConstants.EXCEL_MODULE.VIEW_BUTTON
//     );
//     this.permissions.view_url = AppConstants.EXCEL_MODULE.VIEW_URL;

//     // this.permissions.deactivate = this.global.checkForUserButtonPermission(
//     //   AppConstants.EXCEL_MODULE.DEACTIVATE_BUTTON
//     // );
//     // this.permissions.activate = this.global.checkForUserButtonPermission(
//     //   AppConstants.EXCEL_MODULE.ACTIVATE_BUTTON
//     // );

//     // this.permissions.deactivate_url =
//     //   AppConstants.EXCEL_MODULE.DEACTIVATE_URL;

//     // this.permissions.activate_url =
//     //   AppConstants.EXCEL_MODULE.ACTIVATE_URL;

//     // this.permissions.delete_url =
//     // AppConstants.EXCEL_MODULE.DELETE_URL;

//     // this.apiService
//     //   .apiGetCall(AppConstants.USER_MODULE.FETCH_SUBDIV, true)
//     //   .subscribe((data) => {
//     //     this.subdivisionList = data.subdivisionDTOs;

//     //     var subDivision: any[] = [
//     //       { key: 'Select Sub Division', value: 'null' },
//     //     ];

//     //     this.subdivisionList.map((subDivisionData) => {
//     //       subDivision.push({
//     //         key: subDivisionData.name,
//     //         value: subDivisionData.id,
//     //       });
//     //     });

//     //     this.filterOptions[8].options = subDivision;
//     //   });

//     // this.apiService
//     //   .apiGetCall(AppConstants.USER_MODULE.FETCH_CIRCLE_INSPCTOR, true)
//     //   .subscribe((data) => {
//     //     this.circleInspectorList = data.circleInspectorDTO;

//     //     var circleINspectors: any[] = [
//     //       { key: 'Select Circle Inspector', value: 'null' },
//     //     ];

//     //     this.circleInspectorList.map((circleInspector) => {
//     //       circleINspectors.push({
//     //         key: circleInspector.circleName,
//     //         value: circleInspector.id,
//     //       });
//     //     });

//     //     this.filterOptions[9].options = circleINspectors;
//     //   });

//     // this.apiService
//     //   .apiGetCall(AppConstants.USER_MODULE.FETCH_STATION, true)
//     //   .subscribe((data) => {
//     //     this.stationList = data.stationDtos;

//     //     var policeStations: any[] = [
//     //       { key: 'Select Police Station', value: 'null' },
//     //     ];

//     //     this.stationList.map((station) => {
//     //       policeStations.push({
//     //         key: station.stationName,
//     //         value: station.id,
//     //       });
//     //     });

//     //     this.filterOptions[9].options = policeStations;
//     //   });

//     // this.fetchMajorHead();
//     // this.fetchSubMajorHead();

//     this.apiService
//       .apiGetCall('getDistricts',true)
//       .subscribe((data) => {
//         this.districtList = data.districtDTOs;
//       });
//   }

//   fetchMajorHead = () => {
//     this.apiService
//       .apiGetCall('getCIDCrimeCategoryList', true)
//       .subscribe((data) => {
//         this.majorHeads = data.cidCrimeCategories;

//         var majorHeadList: any[] = [
//           { key: 'Select Major Head', value: 'null' },
//         ];

//         this.majorHeads.map((major) => {
//           majorHeadList.push({
//             key: major.nameOfCrimeCategory,
//             value: major.id,
//           });
//         });

//         this.filterOptions[6].options = majorHeadList;
//       });
//   };

//   fetchSubMajorHead = () => {
//     this.apiService
//       .apiGetCall('getCIDCrimeCategoryTypeData', true)
//       .subscribe((data) => {
//         this.subMajorHeads = data.cidCrimeCategories;

//         var subMajorHeadList: any[] = [
//           { key: 'Select Sub Major Head', value: 'null' },
//         ];

//         this.subMajorHeads.map((submajor) => {
//           subMajorHeadList.push({
//             key: submajor.typeOfCrime,
//             value: submajor.id,
//           });
//         });

//         this.filterOptions[7].options = subMajorHeadList;
//       });
//   };

//   ngOnInit(): void {
//     this.page = new Page(
//       0,
//       0,
//       0,
//       0,
//       true,
//       [{ prop: 'id', dir: 'desc' }],
//       new SrsNsrsCases()
//     );

//     this.initCidExcelForm();

//   }

//   goToLink = (url: any) => {
//     this.router
//       .navigateByUrl('/', { skipLocationChange: true })
//       .then(() => this.router.navigate([url]));
//   };

//   fetchAccuseds = (id: any) => {
//     this.apiService
//       .apiPostCall('getCIDCrimeDataAccused', { id: id }, true)
//       .subscribe((data) => {
//         this.accuseds = data.cidCrimeAccusedPeople;
//       });
//   };

//   cidExcelForm: UntypedFormGroup;
//   excelFile: File = null;

//   handleFileChange = (file: FileList) => {
//     this.excelFile = file.item(0);
//   };

//     initCidExcelForm() {
//       this.cidExcelForm = this.fb.group({
//         firType: ['', Validators.required],
//         districtName: ['', Validators.required],
//         firDoc: ['', Validators.required],
//         excLang: ['', Validators.required],
//       });
//     }

//     uploadExcelData = () => {
//       this.showUplaod = false;
//       // console.log("dddddd  " + this.cidExcelForm.value['firType']);
//       // console.log("dddddd  " + this.cidExcelForm.value['districtName']);

//       this.appStore.dispatch(new AppLoadderShow({}));
//       if (this.cidExcelForm.invalid) {
//         Object.keys(this.cidExcelForm.controls).forEach(control => {
//           this.cidExcelForm.controls[control].markAsTouched();
//         });
//         this.appStore.dispatch(new AppLoadderHide({}));
//         return;
//       }

//       const formData = new FormData();
//       formData.append('firType', this.cidExcelForm.value['firType']);
//       formData.append('districtName', this.cidExcelForm.value['districtName']);
//       formData.append('excLang', this.cidExcelForm.value['excLang']);
//       if (this.excelFile) {
//         formData.append('firDoc', this.excelFile, this.excelFile.name);
//       }
//   // console.log(" about into the api");

//       this.apiService.apiFormDataPostCall('addCaseUploadExcel', formData, true).subscribe({
//         next: (data) => {
//           this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
//           this.cidExcelForm.reset();
//           this.excelFile = null;
//           // this.fetchExcelData(); // refresh list
//           this.appStore.dispatch(new AppLoadderHide({}));
//         },
//         error: () => {
//           // this.toaster.getToastMessage('Upload failed.', 'error', 3000, 'top-end');
//           this.appStore.dispatch(new AppLoadderHide({}));
//         }
//       });
//       this.showUplaod =false;
//     };

//   downloadSample() {
//     const fileUrl = 'assets/excelTemplate.xlsx';
//     this.http.head(fileUrl, { observe: 'response' }).subscribe({
//       next: (response) => {
//         if (response.status === 200) {
//           const link = document.createElement('a');
//           link.href = fileUrl;
//           link.download = 'excelTemplate.xlsx';
//           link.click();
//         }
//       },
//       error: () => {
//         alert('Sample file not found. Please contact support.');
//       }
//     });
//   }

//   showUplaod =false;

//   showUploadForm() {
//     this.showUplaod = true;
//   }
// }
// ---------------------------dhdhdh

import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/common/popup/model.service';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { SrsNsrsCases } from 'src/app/models/SrsNsrsCases';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderShow,
  AppLoadderHide,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { DistrictDetail } from 'src/app/models/districtDetails';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-cid-upload-cases',
  templateUrl: './admin-cid-upload-cases.component.html',
  styleUrls: ['./admin-cid-upload-cases.component.scss'],
})
export class AdminCidUploadCasesComponent implements OnInit {
  [x: string]: any;
  page: Page;
  rows = new Array<SrsNsrsCases>();

  accuseds: any[] = [];
  firDate: string;
  filteredDistricts: any[] = [];

  openModal = (row: any) => {
    this.fetchAccuseds(row.id);
    this.firDate = row.firDate;
    this.modelService.open('appModal');
  };

  columns = [
    {
      name: 'specialReportNoYear',
      props: 'specialReportNoYear',
      size: 2,
      colName: 'SR No',
      colPlaceHolder: 'SR No',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'Id',
    //   props: 'id',
    //   size: 1,
    //   colName: 'Id',
    //   colPlaceHolder: 'Enter ID',
    //   sort: true,
    //   isTranslate: false,
    //   isNeedToTranslate: false,
    // },
    {
      name: 'srsNsrsType',
      props: 'srsNsrsType',
      size: 2,
      colName: 'SR NSR ',
      colPlaceHolder: 'SR NSR',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'districtName',
      props: 'districtName',
      size: 2,
      colName: 'District Name ',
      colPlaceHolder: 'District Name',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'subdivisionName',
      props: 'subdivisionName',
      size: 2,
      colName: 'Subdivision Name',
      colPlaceHolder: 'subdivision Name',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'circleName',
      props: 'circleName',
      size: 2,
      colName: 'Circle Name',
      colPlaceHolder: 'Circle Name',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'policestationName',
      props: 'policestationName',
      size: 2,
      colName: 'Police station',
      colPlaceHolder: 'Police station',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },

    {
      name: 'yearOfCase',
      props: 'yearOfCase',
      size: 2,
      colName: 'Case Year',
      colPlaceHolder: 'Case Year',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'caseNo',
      props: 'caseNo',
      size: 2,
      colName: 'Case No',
      colPlaceHolder: 'Case No',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'caseDate',
      props: 'caseDate',
      size: 2,
      colName: 'Case Date',
      colPlaceHolder: 'Case Date',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'section',
      props: 'section',
      size: 2,
      colName: 'Section',
      colPlaceHolder: 'Section',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'ioName',
      props: 'ioName',
      size: 2,
      colName: 'IO Name',
      colPlaceHolder: 'IO Name',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'maxPunishment',
    //   props: 'maxPunishment',
    //   size: 2,
    //   colName: 'Max Punishment',
    //   colPlaceHolder: 'Max Punishment',
    //   filter: false,
    //   isTranslate: true,
    //   width: '100',
    //   sort: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'majorHead',
    //   props: 'majorHead',
    //   size: 2,
    //   colName: 'Major Head',
    //   colPlaceHolder: 'Major Head',
    //   filter: false,
    //   isTranslate: true,
    //   width: '100',
    //   sort: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'subHead',
    //   props: 'subHead',
    //   size: 2,
    //   colName: 'Sub Head',
    //   colPlaceHolder: 'Sub Head',
    //   filter: false,
    //   isTranslate: true,
    //   width: '100',
    //   sort: false,
    //   isNeedToTranslate: false,
    // },
    // {
    //   name: 'nameComplainant',
    //   props: 'nameComplainant',
    //   size: 2,
    //   colName: 'Complainant Name',
    //   colPlaceHolder: 'Complainant Name',
    //   filter: false,
    //   isTranslate: true,
    //   width: '100',
    //   sort: false,
    //   isNeedToTranslate: false,
    // },
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
    //     {
    //       colName: 'District Name',
    //       colPlaceHolder: 'Enter District Name',
    //       data: 'districtName',
    //       translate: false,
    //       type: 'SELECT',
    // options: [
    //   { key: 'Select District', value: 'null' },
    //   { key: 'Araria', value: 'Araria' },
    //   { key: 'Arwal', value: 'Arwal' },
    //   { key: 'Aurangabad', value: 'Aurangabad' },
    //   { key: 'Bagaha', value: 'Bagaha' },
    //   { key: 'Banka', value: 'Banka' },
    //   { key: 'Begusarai', value: 'Begusarai' },
    //   { key: 'Bettiah', value: 'Bettiah' },
    //   { key: 'Bhagalpur', value: 'Bhagalpur' },
    //   { key: 'Bhojpur', value: 'Bhojpur' },
    //   { key: 'Buxar', value: 'Buxar' },
    //   { key: 'Darbhanga', value: 'Darbhanga' },
    //   { key: 'Gaya', value: 'Gaya' },
    //   { key: 'Gopalganj', value: 'Gopalganj' },
    //   { key: 'Jamalpur Rail', value: 'Jamalpur Rail' },
    //   { key: 'Jamui', value: 'Jamui' },
    //   { key: 'Jehanabad', value: 'Jehanabad' },
    //   { key: 'Kaimur', value: 'Kaimur' },
    //   { key: 'Katihar', value: 'Katihar' },
    //   { key: 'Katihar Rail', value: 'Katihar Rail' },
    //   { key: 'Khagaria', value: 'Khagaria' },
    //   { key: 'Kishanganj', value: 'Kishanganj' },
    //   { key: 'Lakhisarai', value: 'Lakhisarai' },
    //   { key: 'Madhepura', value: 'Madhepura' },
    //   { key: 'Madhubani', value: 'Madhubani' },
    //   { key: 'Motihari', value: 'Motihari' },
    //   { key: 'Munger', value: 'Munger' },
    //   { key: 'Muzaffarpur', value: 'Muzaffarpur' },
    //   { key: 'Muzaffarpur Rail', value: 'Muzaffarpur Rail' },
    //   { key: 'Nalanda', value: 'Nalanda' },
    //   { key: 'Naugachhia', value: 'Naugachhia' },
    //   { key: 'Nawada', value: 'Nawada' },
    //   { key: 'Patna', value: 'Patna' },
    //   { key: 'Patna City', value: 'Patna City' },
    //   { key: 'Patna East', value: 'Patna East' },
    //   { key: 'Patna Rail', value: 'Patna Rail' },
    //   { key: 'Patna Rural', value: 'Patna Rural' },
    //   { key: 'Patna West', value: 'Patna West' },
    //   { key: 'Purnea', value: 'Purnea' },
    //   { key: 'Rohtas', value: 'Rohtas' },
    //   { key: 'Saharsa', value: 'Saharsa' },
    //   { key: 'Samastipur', value: 'Samastipur' },
    //   { key: 'Saran', value: 'Saran' },
    //   { key: 'Sheikhpura', value: 'Sheikhpura' },
    //   { key: 'Sheikhpura.', value: 'Sheikhpura.' },
    //   { key: 'Sheohar', value: 'Sheohar' },
    //   { key: 'Sitamarhi', value: 'Sitamarhi' },
    //   { key: 'Siwan', value: 'Siwan' },
    //   { key: 'Supaul', value: 'Supaul' },
    //   { key: 'Traffic Patna', value: 'Traffic Patna' },
    //   { key: 'Vaishali', value: 'Vaishali' }
    // ]

    //     },

    {
      colName: 'District',
      colPlaceHolder: 'Select District',
      data: 'districtName',
      translate: false,
      type: 'SELECT',
      options: [{ key: 'Select District', value: null, disabled: true }],
    },
    {
      colName: 'Subdivision Name',
      colPlaceHolder: 'Enter Subdivision Name',
      data: 'subdivisionName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Circle Name',
      colPlaceHolder: 'Enter Circle Name',
      data: 'circleName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Police Station Name',
      colPlaceHolder: 'Enter Police Station Name',
      data: 'policestationName',
      translate: false,
      type: 'INPUT',
    },
    // {
    //   colName: 'Police Station Name',
    //   colPlaceHolder: 'Enter Police Station Name',
    //   data: 'policestationName',
    //   translate: false,
    //   type: 'ROLES',
    // },
    {
      colName: 'SRS/NSRS No',
      colPlaceHolder: 'Enter SRS/NSRS No',
      data: 'srsNsrNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Case Year',
      colPlaceHolder: 'Enter Case Year',
      data: 'yearOfCase',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Case No',
      colPlaceHolder: 'Enter Case No',
      data: 'caseNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Case Date',
      colPlaceHolder: 'Enter Case Date',
      data: 'caseDate',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Section',
      colPlaceHolder: 'Enter Section',
      data: 'section',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'IO Name',
      colPlaceHolder: 'Enter IO Name',
      data: 'ioName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Max Punishment',
      colPlaceHolder: 'Enter Max Punishment',
      data: 'maxPunishment',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Major Head',
      colPlaceHolder: 'Enter Major Head',
      data: 'majorHead',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Sub Head',
      colPlaceHolder: 'Enter Sub Head',
      data: 'subHead',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Name of Complainant',
      colPlaceHolder: 'Enter Complainant Name',
      data: 'nameComplainant',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'FSL Visit',
      colPlaceHolder: 'Enter FSL Visit',
      data: 'fslVisit',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'e-Sakshya Video',
      colPlaceHolder: 'Enter e-Sakshya Video Info',
      data: 'eSakshyaVideo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Remark',
      colPlaceHolder: 'Enter Remark',
      data: 'remark',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'IO Mobile',
      colPlaceHolder: 'Enter IO Mobile',
      data: 'ioMobile',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Place of Occurrence',
      colPlaceHolder: 'Enter Place of Occurrence',
      data: 'placeOfOccurance',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Location',
      colPlaceHolder: 'Enter Location',
      data: 'location',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Accused Name',
      colPlaceHolder: 'Enter Accused Name',
      data: 'accusedName',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.EXCEL_MODULE.FETCH_URL;
  //path: string = "getAllExcelUploadData"

  permissions: Permissions = new Permissions();

  subdivisionList: any[] = [];
  circleInspectorList: any[] = [];
  stationList: any[] = [];
  majorHeads: any[] = [];
  subMajorHeads: any[] = [];

  showUplaod = false;
  cidExcelForm: UntypedFormGroup;
  excelFile: File = null;

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private apiService: ApiCallerService,
    private modelService: ModelService,
    private appStore: Store<{ app: any }>,
    private toaster: ToasterService,
    private http: HttpClient,
    private fb: UntypedFormBuilder
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.EXCEL_MODULE.ADD_BUTTON
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.EXCEL_MODULE.EDIT_BUTTON
    );

    // new change
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.EXCEL_MODULE.DEACTIVATE_BUTTON
    )

    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.EXCEL_MODULE.DEACTIVATE_BUTTON
    )
    //console.log("permissions",this.permissions.activate,this.permissions.deactivate);
    this.permissions.deactivate_url = AppConstants.EXCEL_MODULE.DEACTIVATE_URL;

    this.permissions.edit_url = AppConstants.EXCEL_MODULE.EDIT_URL;
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.EXCEL_MODULE.VIEW_BUTTON
    );
    this.permissions.view_url = AppConstants.EXCEL_MODULE.VIEW_URL;

  }

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

    this.initCidExcelForm();
    this.loadDistrictsBasedOnUser();
  }

  downloadDuplicateList(duplicates: string[]) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `duplicate-cases-${timestamp}.csv`;

      const csvContent = [
        'S.No,Case Number',
        ...duplicates.map((caseNo, index) => `${index + 1},"${caseNo}"`),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (e) {
      console.error('Error generating duplicate list:', e);
      this.toaster.getToastMessage(
        'Failed to generate duplicate cases list',
        'error',
        3000,
        'top-end'
      );
    }
  }

  initCidExcelForm() {
    this.cidExcelForm = this.fb.group({
      firType: ['', Validators.required],
      districtName: ['', Validators.required],
      firDoc: ['', Validators.required],
      excLang: ['', Validators.required],
    });
  }

  // loadDistrictsBasedOnUser() {
  //   const userDistrictId = localStorage.getItem('userDistrictId');
  //   const userDistrictName = localStorage.getItem('userDistrict');
  //   const userRole = localStorage.getItem('userRole');

  //   this.apiService.apiGetCall('getDistricts', true).subscribe((data) => {
  //     // Admin sees all districts
  //     if (userRole === 'ADMIN') {
  //       this.filteredDistricts = data.districtDTOs;
  //     }
  //     // Regular user sees only their district
  //     else if (userDistrictId || userDistrictName) {
  //       this.filteredDistricts = data.districtDTOs.filter(d =>
  //         (userDistrictId && d.id.toString() === userDistrictId) ||
  //         (userDistrictName && d.districtName === userDistrictName)
  //       );

  //       // If no match found, show all with warning
  //       if (this.filteredDistricts.length === 0) {
  //         console.warn('No matching district found for user, showing all districts');
  //         this.filteredDistricts = data.districtDTOs;
  //       }
  //     }
  //     // Fallback (shouldn't happen) - show all districts
  //     else {
  //       console.warn('No user district info found, showing all districts');
  //       this.filteredDistricts = data.districtDTOs;
  //     }

  //     // Auto-select if only one district available
  //     if (this.filteredDistricts.length === 1) {
  //       this.cidExcelForm.patchValue({
  //         districtName: this.filteredDistricts[0].districtName
  //       });
  //     }
  //   });
  // }

  // loadDistrictsBasedOnUser() {
  //   const userDistrictId = localStorage.getItem('userDistrictId');
  //   const userDistrictName = localStorage.getItem('userDistrict');
  //   const userRole = localStorage.getItem('userRole');

  //   this.appStore.dispatch(new AppLoadderShow({}));

  //   this.apiService.apiGetCall('getDistricts', true).subscribe({
  //     next: (data) => {
  //       // Admin sees all districts
  //       if (userRole === 'ADMIN') {
  //         this.filteredDistricts = data.districtDTOs;
  //       }
  //       // Regular user sees filtered districts
  //       else {
  //         // First try to filter by ID
  //         if (userDistrictId) {
  //           this.filteredDistricts = data.districtDTOs.filter(d =>
  //             d.id.toString() === userDistrictId
  //           );
  //         }

  //         // If no match by ID, try by name
  //         if (this.filteredDistricts.length === 0 && userDistrictName) {
  //           this.filteredDistricts = data.districtDTOs.filter(d =>
  //             d.districtName === userDistrictName
  //           );
  //         }

  //         // Fallback if no matches found
  //         if (this.filteredDistricts.length === 0) {
  //           console.warn('No matching district found for user');
  //           this.filteredDistricts = data.districtDTOs;
  //         }
  //       }

  //       // Update district name in storage if it was missing
  //       if (this.filteredDistricts.length > 0 && !userDistrictName) {
  //         localStorage.setItem('userDistrict', this.filteredDistricts[0].districtName);
  //       }

  //       this.updateDistrictFilterOptions();
  //     },
  //     error: (err) => {
  //       console.error('Error loading districts:', err);
  //       this.toast.getToastMessage('Failed to load districts', 'error', 3000);
  //     },
  //     complete: () => {
  //       this.appStore.dispatch(new AppLoadderHide({}));
  //     }
  //   });
  // }
  //   updateDistrictFilterOptions() {
  //     throw new Error('Method not implemented.');
  //   }

  //ye bla tha

  loadDistrictsBasedOnUser() {
    const userDistrictId = localStorage.getItem('userDistrictId');
    const userDistrictName = localStorage.getItem('userDistrict');
    const userRole = localStorage.getItem('userRole');

    // console.log(userDistrictId);
    // console.log(userDistrictName);
    // console.log(userRole);

    this.appStore.dispatch(new AppLoadderShow({}));

    this.apiService.apiGetCall('getDistricts', true).subscribe({
      next: (data) => {
        if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
          this.filteredDistricts = data.districtDTOs;
        }
        // Regular user sees filtered districts
        else {
          // First try to filter by ID
          if (userDistrictId) {
            this.filteredDistricts = data.districtDTOs.filter(
              (d) => d.id.toString() === userDistrictId
            );
          }

          // If no match by ID, try by name
          if (this.filteredDistricts.length === 0 && userDistrictName) {
            this.filteredDistricts = data.districtDTOs.filter(
              (d) => d.districtName === userDistrictName
            );
          }

          // Fallback if no matches found
          if (this.filteredDistricts.length === 0) {
            console.warn('No matching district found for user');
            this.filteredDistricts = data.districtDTOs;
          }
        }

        // Update district name in storage if it was missing
        if (this.filteredDistricts.length > 0 && !userDistrictName) {
          localStorage.setItem(
            'userDistrict',
            this.filteredDistricts[0].districtName
          );
        }

        this.updateDistrictFilterOptions();

        // Auto-select if only one district available
        if (this.filteredDistricts.length === 1) {
          this.cidExcelForm.patchValue({
            districtName: this.filteredDistricts[0].districtName,
          });
        }
      },
      error: (err) => {
        console.error('Error loading districts:', err);
        this.toast.getToastMessage('Failed to load districts', 'error', 3000);
      },
      complete: () => {
        this.appStore.dispatch(new AppLoadderHide({}));
      },
    });
  }

  updateDistrictFilterOptions() {
    const districtFilter = this.filterOptions.find(
      (f) => f.data === 'districtName'
    );
    if (!districtFilter) return;

    // Update options while keeping the disabled option
    districtFilter.options = [
      districtFilter.options[0], // Keep the disabled option
      ...this.filteredDistricts.map((d) => ({
        key: d.districtName,
        value: d.districtName,
      })),
    ];

    // Auto-select if only one real option is available
    if (this.filteredDistricts.length === 1) {
      this.selectedDistrict = this.filteredDistricts[0].districtName;
    }

    if (this.filteredDistricts.length === 1) {
      this.form
        .get('district')
        ?.setValue(this.filteredDistricts[0].districtName);
    }

    // Auto-select if only one district available
    //     if (this.filteredDistricts.length === 1) {
    //       this.cidExcelForm.patchValue({
    //         districtName: this.filteredDistricts[0].districtName
    //       });
    //     }
  }

  // rows: any[] = [];

  filteredRows: any[] = [];

  // loadData() {
  //   // Load rows from API
  //   this.apiService.getAllCases().subscribe((data: any[]) => {
  //     this.rows = data;

  //     // Auto-filter rows by user's district
  //     this.filteredRows = this.rows.filter(row => row.district === this.userDistrict);
  //   });
  // }

  //aur ye bala tha

  // updateDistrictFilterOptions() {
  //   const districtFilter = this.filterOptions.find(f => f.data === 'districtName');
  //   if (!districtFilter) return;

  //   // Update options (keep placeholder)
  //   districtFilter.options = [

  //     ...this.filteredDistricts.map(d => ({
  //       key: d.districtName,
  //       value: d.districtName
  //     }))
  //   ];

  //   // Auto-select only district if applicable
  //   if (this.filteredDistricts.length === 1) {
  //     const onlyDistrict = this.filteredDistricts[0].districtName;

  //     // Manually update table filter value
  //     const updatedFilters = {
  //       ...this.currentFilters, // existing filters object
  //       districtName: onlyDistrict
  //     };

  //     // Save locally if you track filters
  //     this.currentFilters = updatedFilters;

  //     // Emit manually if needed
  //     this.onFilterChange(updatedFilters); // this triggers <app-table-data> filter behavior
  //   }
  // }

  loadTableData() {
    // Your existing table data loading implementation
  }

  handleFileChange = (file: FileList) => {
    this.excelFile = file.item(0);
  };

  uploadExcelData = () => {
    this.showUplaod = false;
    this.appStore.dispatch(new AppLoadderShow({}));

    if (this.cidExcelForm.invalid) {
      Object.keys(this.cidExcelForm.controls).forEach((control) => {
        this.cidExcelForm.controls[control].markAsTouched();
      });
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    const formData = new FormData();
    formData.append('firType', this.cidExcelForm.value['firType']);
    formData.append('districtName', this.cidExcelForm.value['districtName']);
    formData.append('excLang', this.cidExcelForm.value['excLang']);

    if (this.excelFile) {
      formData.append('firDoc', this.excelFile, this.excelFile.name);
    }

    // this.apiService.apiFormDataPostCall('addCaseUploadExcel', formData, true).subscribe({
    //   next: (data) => {
    //     this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
    //     Swal.fire(
    //       data.data

    //     )
    //     this.cidExcelForm.reset();
    //     this.excelFile = null;
    //     this.appStore.dispatch(new AppLoadderHide({}));
    //   },
    //   error: () => {
    //     this.appStore.dispatch(new AppLoadderHide({}));
    //   }
    // });

    this.apiService
      .apiFormDataPostCall('addCaseUploadExcel', formData, true)
      .subscribe({
        next: (response) => {
          this.appStore.dispatch(new AppLoadderHide({}));
          this.cidExcelForm.reset();
          this.excelFile = null;

          if (response.data?.length > 0) {
            Swal.fire({
              title: 'Upload Completed with Duplicates',
              html: `
          <p>${response.message}</p>
          <p class="text-danger">Found ${response.data.length} duplicate case numbers that were skipped.</p>
              <p class="text-info">
                Please either: 
                <br>1) Re-upload with corrected Case Numbers, or 
                <br>2) Edit the existing records in the database.
              </p>        
              `,
              icon: 'info',
              showCancelButton: true,
              confirmButtonText:
                '<i class="fa fa-download"></i> Download Duplicates Case No List',
              cancelButtonText: 'Close',
              showCloseButton: true,
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-secondary',
              },
              buttonsStyling: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.downloadDuplicateList(response.data);
              }
              this.toaster.getToastMessage(
                'All non-duplicate cases processed successfully!',
                'success',
                3000,
                'top-end'
              );
            });
          } else {
            this.toaster.getToastMessage(
              response.message || 'Excel data uploaded successfully!',
              'success',
              3000,
              'top-end'
            );
          }
        },
        error: (error) => {
          this.appStore.dispatch(new AppLoadderHide({}));
          this.toaster.getToastMessage(
            error.error?.message ||
            error.message ||
            'Failed to upload Excel file',
            'error',
            3000,
            'top-end'
          );
        },
      });
  };

  showInstructions = false;

  openInstructionsModal() {
    this.showInstructions = true;
  }

  closeInstructionsModal() {
    this.showInstructions = false;
  }

  downloadSample() {
    const fileUrl = 'assets/excelTemplate.xlsx';
    this.http.head(fileUrl, { observe: 'response' }).subscribe({
      next: (response) => {
        if (response.status === 200) {
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = 'excelTemplate.xlsx';
          link.click();
        }
      },
      error: () => {
        this.toaster.getToastMessage(
          'Sample file not found. Please contact support.',
          'error',
          3000,
          'top-end'
        );
      },
    });
  }

  showUploadForm() {
    this.showUplaod = true;
  }

  fetchAccuseds = (id: any) => {
    this.apiService
      .apiPostCall('getCIDCrimeDataAccused', { id: id }, true)
      .subscribe((data) => {
        this.accuseds = data.cidCrimeAccusedPeople;
      });
  };

  goToLink = (url: any) => {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };
}
