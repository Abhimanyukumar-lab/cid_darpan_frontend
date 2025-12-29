// import { HttpClient } from '@angular/common/http';
// import { Component, NgModule, OnInit } from '@angular/core';
// import { UntypedFormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { ModelService } from 'src/app/common/popup/model.service';
// import { Page } from 'src/app/models/Page';
// import { Permissions } from 'src/app/models/Permissions';
// import { SrsNsrsCases } from 'src/app/models/SrsNsrsCases';
// import { ApiCallerService } from 'src/app/services/api-caller.service';
// import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
// import { ToasterService } from 'src/app/services/toaster.service';
// import { AppLoadderShow, AppLoadderHide } from 'src/app/storage/actions/app.actions';
// import { AppConstants } from 'src/app/storage/localdata/AppConstants';
// import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

// @Component({
//   selector: 'app-admin-cid-upload-cases-report',
//   templateUrl: './admin-cid-upload-cases-report.component.html',
//   styleUrls: ['./admin-cid-upload-cases-report.component.scss']
// })
// export class AdminCidUploadCasesReportComponent implements OnInit {
//   page: Page;
//   rows = new Array<SrsNsrsCases>();

//   accuseds: any[] = [];
//   firDate: string;

//   openModal = (row: any) => {
//     this.fetchAccuseds(row.id);
//     this.firDate = row.firDate;
//     this.modelService.open('appModal');
//   };

//   // In your AdminCidUploadCasesReportComponent
// showFilterModal = false;





//   columns = [
//     // {
//     //   name: 'Id',
//     //   props: 'id',
//     //   size: 1,
//     //   colName: 'Id',
//     //   colPlaceHolder: 'Enter ID',
//     //   sort: true,
//     //   isTranslate: false,
//     //   isNeedToTranslate: false,
//     // },
//         {
//       name: 'specialReportNoYear',
//       props: 'specialReportNoYear',
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
//     {
//       name: 'maxPunishment',
//       props: 'maxPunishment',
//       size: 2,
//       colName: 'Max Punishment',
//       colPlaceHolder: 'Max Punishment',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'majorHead',
//       props: 'majorHead',
//       size: 2,
//       colName: 'Major Head',
//       colPlaceHolder: 'Major Head',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'subHead',
//       props: 'subHead',
//       size: 2,
//       colName: 'Sub Head',
//       colPlaceHolder: 'Sub Head',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
//     {
//       name: 'nameComplainant',
//       props: 'nameComplainant',
//       size: 2,
//       colName: 'Complainant Name',
//       colPlaceHolder: 'Complainant Name',
//       filter: false,
//       isTranslate: true,
//       width: '100',
//       sort: false,
//       isNeedToTranslate: false,
//     },
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
// //     {
// //       colName: 'District Name',
// //       colPlaceHolder: 'Enter District Name',
// //       data: 'districtName',
// //       translate: false,
// //       type: 'SELECT',
// // options: [
// //   { key: 'Select District', value: 'null' },
// //   { key: 'Araria', value: 'Araria' },
// //   { key: 'Arwal', value: 'Arwal' },
// //   { key: 'Aurangabad', value: 'Aurangabad' },
// //   { key: 'Bagaha', value: 'Bagaha' },
// //   { key: 'Banka', value: 'Banka' },
// //   { key: 'Begusarai', value: 'Begusarai' },
// //   { key: 'Bettiah', value: 'Bettiah' },
// //   { key: 'Bhagalpur', value: 'Bhagalpur' },
// //   { key: 'Bhojpur', value: 'Bhojpur' },
// //   { key: 'Buxar', value: 'Buxar' },
// //   { key: 'Darbhanga', value: 'Darbhanga' },
// //   { key: 'Gaya', value: 'Gaya' },
// //   { key: 'Gopalganj', value: 'Gopalganj' },
// //   { key: 'Jamalpur Rail', value: 'Jamalpur Rail' },
// //   { key: 'Jamui', value: 'Jamui' },
// //   { key: 'Jehanabad', value: 'Jehanabad' },
// //   { key: 'Kaimur', value: 'Kaimur' },
// //   { key: 'Katihar', value: 'Katihar' },
// //   { key: 'Katihar Rail', value: 'Katihar Rail' },
// //   { key: 'Khagaria', value: 'Khagaria' },
// //   { key: 'Kishanganj', value: 'Kishanganj' },
// //   { key: 'Lakhisarai', value: 'Lakhisarai' },
// //   { key: 'Madhepura', value: 'Madhepura' },
// //   { key: 'Madhubani', value: 'Madhubani' },
// //   { key: 'Motihari', value: 'Motihari' },
// //   { key: 'Munger', value: 'Munger' },
// //   { key: 'Muzaffarpur', value: 'Muzaffarpur' },
// //   { key: 'Muzaffarpur Rail', value: 'Muzaffarpur Rail' },
// //   { key: 'Nalanda', value: 'Nalanda' },
// //   { key: 'Naugachhia', value: 'Naugachhia' },
// //   { key: 'Nawada', value: 'Nawada' },
// //   { key: 'Patna', value: 'Patna' },
// //   { key: 'Patna City', value: 'Patna City' },
// //   { key: 'Patna East', value: 'Patna East' },
// //   { key: 'Patna Rail', value: 'Patna Rail' },
// //   { key: 'Patna Rural', value: 'Patna Rural' },
// //   { key: 'Patna West', value: 'Patna West' },
// //   { key: 'Purnea', value: 'Purnea' },
// //   { key: 'Rohtas', value: 'Rohtas' },
// //   { key: 'Saharsa', value: 'Saharsa' },
// //   { key: 'Samastipur', value: 'Samastipur' },
// //   { key: 'Saran', value: 'Saran' }, 
// //   { key: 'Sheikhpura', value: 'Sheikhpura' },
// //   { key: 'Sheikhpura.', value: 'Sheikhpura.' },
// //   { key: 'Sheohar', value: 'Sheohar' },
// //   { key: 'Sitamarhi', value: 'Sitamarhi' },
// //   { key: 'Siwan', value: 'Siwan' },
// //   { key: 'Supaul', value: 'Supaul' },
// //   { key: 'Traffic Patna', value: 'Traffic Patna' },
// //   { key: 'Vaishali', value: 'Vaishali' }
// // ]

// //     },



//  {
//       colName: 'District',
//       colPlaceHolder: 'Select District',
//       data: 'districtName',
//       translate: false,
//       type: 'SELECT',
//       options: [
//         { key: 'Select District', value: null, disabled: true }
//       ]
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
//   filteredDistricts: any;
//   form: any;
//   selectedDistrict: any;
//   cidExcelForm: any;
//   toast: any;
//   dialog: any;

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

//     // this.permissions.edit = this.global.checkForUserButtonPermission(
//     //   AppConstants.EXCEL_MODULE.EDIT_BUTTON
//     // );

//     // this.permissions.add_url = AppConstants.EXCEL_MODULE.ADD_URL;
//     // this.permissions.edit_url = AppConstants.EXCEL_MODULE.EDIT_URL;

//     this.permissions.view = this.global.checkForUserButtonPermission(
//       AppConstants.EXCEL_MODULE.VIEW_BUTTON
//     );

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

//     this.permissions.view_url = AppConstants.EXCEL_MODULE.VIEW_URL;
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

//     this.loadDistrictsBasedOnUser();

//   }




//    loadDistrictsBasedOnUser() {
//       const userDistrictId = localStorage.getItem('userDistrictId');
//       const userDistrictName = localStorage.getItem('userDistrict');
//       const userRole = localStorage.getItem('userRole');

//       console.log(userDistrictId);
//       console.log(userDistrictName);
//       console.log(userRole);

//       this.appStore.dispatch(new AppLoadderShow({}));

//       this.apiService.apiGetCall('getDistricts', true).subscribe({
//         next: (data) => {
//           // Admin sees all districts
//           if (userRole === 'ADMIN') {
//             this.filteredDistricts = data.districtDTOs;
//           } 
//           // Regular user sees filtered districts
//           else {
//             // First try to filter by ID
//             if (userDistrictId) {
//               this.filteredDistricts = data.districtDTOs.filter(d => 
//                 d.id.toString() === userDistrictId
//               );
//             }

//             // If no match by ID, try by name
//             if (this.filteredDistricts.length === 0 && userDistrictName) {
//               this.filteredDistricts = data.districtDTOs.filter(d => 
//                 d.districtName === userDistrictName
//               );
//             }

//             // Fallback if no matches found
//             if (this.filteredDistricts.length === 0) {
//               console.warn('No matching district found for user');
//               this.filteredDistricts = data.districtDTOs;
//             }
//           }

//           // Update district name in storage if it was missing
//           if (this.filteredDistricts.length > 0 && !userDistrictName) {
//             localStorage.setItem('userDistrict', this.filteredDistricts[0].districtName);
//           }

//            this.updateDistrictFilterOptions();



//             // Auto-select if only one district available
//         if (this.filteredDistricts.length === 1) {
//           this.cidExcelForm.patchValue({
//             districtName: this.filteredDistricts[0].districtName
//           });
//         }

//         },
//         error: (err) => {
//           console.error('Error loading districts:', err);
//           this.toast.getToastMessage('Failed to load districts', 'error', 3000);
//         },
//         complete: () => {
//           this.appStore.dispatch(new AppLoadderHide({}));
//         }
//       });
//     }

//     updateDistrictFilterOptions() {
//       const districtFilter = this.filterOptions.find(f => f.data === 'districtName');
//       if (!districtFilter) return;

//       // Update options while keeping the disabled option
//       districtFilter.options = [
//         districtFilter.options[0], // Keep the disabled option
//         ...this.filteredDistricts.map(d => ({
//           key: d.districtName,
//           value: d.districtName
//         }))
//       ];

//       // Auto-select if only one real option is available
//   if (this.filteredDistricts.length === 1) {
//     this.selectedDistrict = this.filteredDistricts[0].districtName;
//   }


//   if (this.filteredDistricts.length === 1) {
//     this.form.get('district')?.setValue(this.filteredDistricts[0].districtName);
//   }


//        // Auto-select if only one district available
//     //     if (this.filteredDistricts.length === 1) {
//     //       this.cidExcelForm.patchValue({
//     //         districtName: this.filteredDistricts[0].districtName
//     //       });
//     //     }
//     }


//   fetchAccuseds = (id: any) => {
//     this.apiService
//       .apiPostCall('getCIDCrimeDataAccused', { id: id }, true)
//       .subscribe((data) => {
//         this.accuseds = data.cidCrimeAccusedPeople;
//       });
//   };

//   closeFilterModal() {
//   this.showFilterModal = false;
// }

//   openFilterDialog() {
//  this.showFilterModal = true;
// }
// }



import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sortBy } from 'lodash';
import { ModelService } from 'src/app/common/popup/model.service';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { SrsNsrsCases } from 'src/app/models/SrsNsrsCases';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AppLoadderShow, AppLoadderHide } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-cid-upload-cases-report',
  templateUrl: './admin-cid-upload-cases-report.component.html',
  styleUrls: ['./admin-cid-upload-cases-report.component.scss']
})
export class AdminCidUploadCasesReportComponent implements OnInit {
  page: Page;
  rows = new Array<SrsNsrsCases>();

  accuseds: any[] = [];
  firDate: string;
  filteredDistricts: any[] = [];

  isDownloading: boolean = false;
  private downloadTimer: any = null;



  openModal = (row: any) => {
    this.fetchAccuseds(row.id);
    this.firDate = row.firDate;
    this.modelService.open('appModal');
  };

  // Download modal properties
  showDownloadModal = false;
  downloadForm: UntypedFormGroup;

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
      colName: 'subdivision Name',
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
    {
      name: 'maxPunishment',
      props: 'maxPunishment',
      size: 2,
      colName: 'Max Punishment',
      colPlaceHolder: 'Max Punishment',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'majorHead',
      props: 'majorHead',
      size: 2,
      colName: 'Major Head',
      colPlaceHolder: 'Major Head',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'subHead',
      props: 'subHead',
      size: 2,
      colName: 'Sub Head',
      colPlaceHolder: 'Sub Head',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
    {
      name: 'nameComplainant',
      props: 'nameComplainant',
      size: 2,
      colName: 'Complainant Name',
      colPlaceHolder: 'Complainant Name',
      filter: false,
      isTranslate: true,
      width: '100',
      sort: false,
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
      colName: 'Police Station Name',
      colPlaceHolder: 'Enter Police Station Name',
      data: 'policestationName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'SRS/NSRS No',
      colPlaceHolder: 'Enter SRS/NSRS No',
      data: 'srsNsrNo',
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
    }
  ];

  path: string = AppConstants.EXCEL_MODULE.FETCH_URL;
  //path: string = AppConstants.EXCEL_MODULE.COMPLETE_PERCENT_URL;
  permissions: Permissions = new Permissions();

  subdivisionList: any[] = [];
  circleInspectorList: any[] = [];
  stationList: any[] = [];
  majorHeads: any[] = [];
  subMajorHeads: any[] = [];
  selectedDistrict: any;
  form: any;
  cidExcelForm: any;
  toast: any;

  constructor(
    private global: GlobalFunctionsService,
    private router: Router,
    private apiService: ApiCallerService,
    private modelService: ModelService,
    private appStore: Store<{ app: any }>,
    private toaster: ToasterService,
    private http: HttpClient,
    private fb: UntypedFormBuilder,
  ) {
    this.global.checkForUserPermission(this.router.url);

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

    this.initDownloadForm();
    this.loadDistrictsBasedOnUser();
  }

  // Initialize download form
  initDownloadForm() {
    this.downloadForm = this.fb.group({
      // districtName: ['', Validators.required],
      // srsNsrsType: ['', Validators.required],
      // downloadFormat: ['excel', Validators.required]
      districtName: [''],
      srsNsrsType: [''],
      downloadFormat: ['excel']

    });
  }

  // Load districts based on user role
  // loadDistrictsBasedOnUser() {
  //   const userDistrictId = localStorage.getItem('userDistrictId');
  //   const userDistrictName = localStorage.getItem('userDistrict');
  //   const userRole = localStorage.getItem('userRole');

  //   this.appStore.dispatch(new AppLoadderShow({}));

  //   this.apiService.apiGetCall('getDistricts', true).subscribe({
  //     next: (data) => {
  //       if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
  //         this.filteredDistricts = data.districtDTOs;
  //       } else {
  //         if (userDistrictId) {
  //           this.filteredDistricts = data.districtDTOs.filter(
  //             (d) => d.id.toString() === userDistrictId
  //           );
  //         }

  //         if (this.filteredDistricts.length === 0 && userDistrictName) {
  //           this.filteredDistricts = data.districtDTOs.filter(
  //             (d) => d.districtName === userDistrictName
  //           );
  //         }

  //         if (this.filteredDistricts.length === 0) {
  //           console.warn('No matching district found for user');
  //           this.filteredDistricts = data.districtDTOs;
  //         }
  //       }

  //       // Auto-select if only one district available
  //       if (this.filteredDistricts.length === 1) {
  //         this.downloadForm.patchValue({
  //           districtName: this.filteredDistricts[0].districtName
  //         });
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error loading districts:', err);
  //       this.toaster.getToastMessage('Failed to load districts', 'error', 3000, 'top-end');
  //     },
  //     complete: () => {
  //       this.appStore.dispatch(new AppLoadderHide({}));
  //     }
  //   });
  // }

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

  // Open download modal
  openDownloadModal() {
    this.showDownloadModal = true;
  }

  // Close download modal
  closeDownloadModal() {
    this.showDownloadModal = false;
    this.downloadForm.reset({ downloadFormat: 'excel' });
  }

  // Download report
  //   downloadReport() {
  //     if (this.downloadForm.invalid) {
  //       Object.keys(this.downloadForm.controls).forEach((control) => {
  //         this.downloadForm.controls[control].markAsTouched();
  //       });
  //       return;
  //     }

  //     this.appStore.dispatch(new AppLoadderShow({}));

  //     const formData = this.downloadForm.value;

  //   const params = {
  //   pageNumber: 0,
  //   size: 1000000,
  //   sort: true,
  //   prop: [{ prop: 'id', dir: 'desc' }],
  //   filter: {  // Change "filters" to "filter"
  //     id: null,
  //     roleId: null,
  //     srsNsrsType: formData?.srsNsrsType,
  //     districtName: formData?.districtName,
  //     subdivisionName: null,
  //     circleName: null,
  //     policestationName: null,
  //     yearOfCase: null,
  //     caseNo: null,
  //     caseDate: null,
  //     section: null,
  //     ioName: null,
  //     ioDesignationName: null,
  //     maxPunishment: null,
  //     majorHead: null,
  //     subHead: null,
  //     nameComplainant: null,
  //     fslVisit: null,
  //     eSakshyaVideo: null,
  //     remark: null,
  //     active: null,
  //     createdBy: null,
  //     createdDate: null,
  //     accused: null,
  //     caseProceeding: null,
  //     accusedName: null,
  //     specialReportNoYear: null,
  //   },
  //   language: "en"
  // };

  //     // this.apiService.apiPostCall('case/export', params, true).subscribe({
  //     //   next: (response) => {
  //     //     this.appStore.dispatch(new AppLoadderHide({}));

  //     //     if (response.downloadUrl) {
  //     //       // Create a temporary link to trigger download
  //     //       const link = document.createElement('a');
  //     //       link.href = response.downloadUrl;
  //     //       link.download = this.generateFileName(formData);
  //     //       link.click();

  //     //       this.toaster.getToastMessage(
  //     //         'Report downloaded successfully!',
  //     //         'success',
  //     //         3000,
  //     //         'top-end'
  //     //       );
  //     //     } else {
  //     //       this.toaster.getToastMessage(
  //     //         'No data found for the selected criteria',
  //     //         'info',
  //     //         3000,
  //     //         'top-end'
  //     //       );
  //     //     }

  //     //     this.closeDownloadModal();
  //     //   },
  //     //   error: (error) => {
  //     //     this.appStore.dispatch(new AppLoadderHide({}));
  //     //     this.toaster.getToastMessage(
  //     //       error.error?.message || 'Failed to download report',
  //     //       'error',
  //     //       3000,
  //     //       'top-end'
  //     //     );
  //     //   }
  //     // });
  //   // In your component
  // this.apiService.apiPostCall('case/export', params, true).subscribe({
  //   next: (response) => {
  //     this.appStore.dispatch(new AppLoadderHide({}));

  //     if (response.downloadUrl) {
  //       // Use the download method for URL-based downloads
  //       this.apiService.apiPostCallDownloadFile(response.downloadUrl, false, false).subscribe({
  //         next: (blob: Blob) => {
  //           const url = window.URL.createObjectURL(blob);
  //           const link = document.createElement('a');
  //           link.href = url;
  //           link.download = this.generateFileName(formData);
  //           link.click();
  //           window.URL.revokeObjectURL(url);
  //         },
  //         error: (error) => {
  //           this.toaster.getToastMessage(
  //             'Failed to download file',
  //             'error',
  //             3000,
  //             'top-end'
  //           );
  //         }
  //       });

  //       this.toaster.getToastMessage(
  //         'Report downloaded successfully!',
  //         'success',
  //         3000,
  //         'top-end'
  //       );
  //     } else {
  //       this.toaster.getToastMessage(
  //         'No data found for the selected criteria',
  //         'info',
  //         3000,
  //         'top-end'
  //       );
  //     }

  //     this.closeDownloadModal();
  //   },
  //   error: (error) => {
  //     this.appStore.dispatch(new AppLoadderHide({}));
  //     this.toaster.getToastMessage(
  //       error.error?.message || 'Failed to download report',
  //       'error',
  //       3000,
  //       'top-end'
  //     );
  //   }
  // });


  //   }

  // downloadReport() {
  //   if (this.downloadForm.invalid) {
  //     Object.keys(this.downloadForm.controls).forEach((control) => {
  //       this.downloadForm.controls[control].markAsTouched();
  //     });
  //     return;
  //   }

  //   const getValueOrNull = (value: any) => {
  //     return value === '' ? null : value;
  //   };

  //   this.appStore.dispatch(new AppLoadderShow({}));

  //   this.downloadForm.value.downloadFormat = ".xlsx";
  //   const formData = this.downloadForm.value;



  //   const params = {
  //     pageNumber: 0,
  //     size: 1000000,
  //     sort: true,
  //     prop: [{ prop: 'id', dir: 'desc' }],
  //     filter: {
  //       id: null,
  //       roleId: null,
  //       srsNsrsType: getValueOrNull(formData?.srsNsrsType),
  //       districtName: getValueOrNull(formData?.districtName),
  //       subdivisionName: null,
  //       circleName: null,
  //       policestationName: null,
  //       yearOfCase: null,
  //       caseNo: null,
  //       caseDate: null,
  //       section: null,
  //       ioName: null,
  //       ioDesignationName: null,
  //       maxPunishment: null,
  //       majorHead: null,
  //       subHead: null,
  //       nameComplainant: null,
  //       fslVisit: null,
  //       eSakshyaVideo: null,
  //       remark: null,
  //       active: null,
  //       createdBy: null,
  //       createdDate: null,
  //       accused: null,
  //       caseProceeding: null,
  //       accusedName: null,
  //       specialReportNoYear: null,
  //     },
  //     language: "en"
  //   };

  //   this.apiService.apiDataPostCallDownloadFile(
  //     'case/export',
  //     params,
  //     true
  //   ).subscribe({
  //     next: (blob: Blob) => {
  //       try {
  //         this.appStore.dispatch(new AppLoadderHide({}));

  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = this.generateFileName(formData);

  //         document.body.appendChild(a);
  //         a.click();

  //         setTimeout(() => {
  //           window.URL.revokeObjectURL(url);
  //           document.body.removeChild(a);
  //         }, 100);

  //         this.toaster.getToastMessage(
  //           'Report downloaded successfully!',
  //           'success',
  //           3000,
  //           'top-end'
  //         );

  //         this.closeDownloadModal();
  //       } catch (e) {
  //         console.error('Download failed:', e);
  //         this.appStore.dispatch(new AppLoadderHide({}));
  //         this.toaster.getToastMessage(
  //           'Failed to process download',
  //           'error',
  //           3000,
  //           'top-end'
  //         );
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Download failed:', error);
  //       this.appStore.dispatch(new AppLoadderHide({}));
  //       this.toaster.getToastMessage(
  //         error.error?.message || error.message || 'Failed to download report',
  //         'error',
  //         3000,
  //         'top-end'
  //       );
  //     }
  //   });
  // }


  // downloadReport() {
  //   if (this.downloadForm.invalid) {
  //     Object.keys(this.downloadForm.controls).forEach((control) => {
  //       this.downloadForm.controls[control].markAsTouched();
  //     });
  //     return;
  //   }

  //   const getValueOrNull = (value: any) => {
  //     return value === '' ? null : value;
  //   };

  //   this.appStore.dispatch(new AppLoadderShow({}));

  //   this.downloadForm.value.downloadFormat = ".xlsx";
  //   const formData = this.downloadForm.value;

  //   const params = {
  //     pageNumber: 0,
  //     size: 1000000,
  //     sort: true,
  //     prop: [{ prop: 'id', dir: 'desc' }],
  //     filter: {
  //       id: null,
  //       roleId: null,
  //       srsNsrsType: getValueOrNull(formData?.srsNsrsType),
  //       districtName: getValueOrNull(formData?.districtName),
  //       subdivisionName: null,
  //       circleName: null,
  //       policestationName: null,
  //       yearOfCase: null,
  //       caseNo: null,
  //       caseDate: null,
  //       section: null,
  //       ioName: null,
  //       ioDesignationName: null,
  //       maxPunishment: null,
  //       majorHead: null,
  //       subHead: null,
  //       nameComplainant: null,
  //       fslVisit: null,
  //       eSakshyaVideo: null,
  //       remark: null,
  //       active: null,
  //       createdBy: null,
  //       createdDate: null,
  //       accused: null,
  //       caseProceeding: null,
  //       accusedName: null,
  //       specialReportNoYear: null,
  //     },
  //     language: "en"
  //   };


  //   if (!confirm('This download may take time. Do not close the browser during download.')) {
  //     this.appStore.dispatch(new AppLoadderHide({}));
  //     return;
  //   }

  //   this.apiService.apiDataPostCallDownloadFile(
  //     'case/export',
  //     params,
  //     true
  //   ).subscribe({
  //     next: (blob: Blob) => {
  //       try {
  //         this.appStore.dispatch(new AppLoadderHide({}));

  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = this.generateFileName(formData);

  //         document.body.appendChild(a);
  //         a.click();

  //         setTimeout(() => {
  //           window.URL.revokeObjectURL(url);
  //           document.body.removeChild(a);
  //         }, 100);

  //         this.toaster.getToastMessage(
  //           'Report downloaded successfully!',
  //           'success',
  //           3000,
  //           'top-end'
  //         );

  //         this.closeDownloadModal();
  //       } catch (e) {
  //         console.error('Download processing failed:', e);
  //         this.appStore.dispatch(new AppLoadderHide({}));
  //         this.toaster.getToastMessage(
  //           'Failed to process download file',
  //           'error',
  //           3000,
  //           'top-end'
  //         );
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Download failed:', error);
  //       this.appStore.dispatch(new AppLoadderHide({}));

  //       let errorMessage = 'Failed to download report';

  //       if (error.name === 'TimeoutError') {
  //         errorMessage = 'Download timed out. Please try again.';
  //       } else if (error.status === 0) {
  //         errorMessage = 'Connection lost. Please check your internet connection.';
  //       } else if (error.error instanceof Blob) {
  //         this.readBlobError(error.error).then(message => {
  //           this.toaster.getToastMessage(
  //             message || errorMessage,
  //             'error',
  //             3000,
  //             'top-end'
  //           );
  //         });
  //         return;
  //       }

  //       this.toaster.getToastMessage(
  //         error.error?.message || error.message || errorMessage,
  //         'error',
  //         3000,
  //         'top-end'
  //       );
  //     }
  //   });
  // }

  downloadReport() {
    // Set loading state
    this.isDownloading = true;

    if (this.downloadForm.invalid) {
      Object.keys(this.downloadForm.controls).forEach((control) => {
        this.downloadForm.controls[control].markAsTouched();
      });
      // this.isDownloading = false; // Reset loading state
      return;
    }

    const getValueOrNull = (value: any) => {
      return value === '' ? null : value;
    };

    this.appStore.dispatch(new AppLoadderShow({}));

    this.downloadForm.value.downloadFormat = ".xlsx";
    const formData = this.downloadForm.value;

    const params = {
      pageNumber: 0,
      size: 1000000,
      sort: true,
      prop: [{ prop: 'id', dir: 'desc' }],
      filter: {
        id: null,
        roleId: null,
        srsNsrsType: getValueOrNull(formData?.srsNsrsType),
        districtName: getValueOrNull(formData?.districtName),
        subdivisionName: null,
        circleName: null,
        policestationName: null,
        yearOfCase: null,
        caseNo: null,
        caseDate: null,
        section: null,
        ioName: null,
        ioDesignationName: null,
        maxPunishment: null,
        majorHead: null,
        subHead: null,
        nameComplainant: null,
        fslVisit: null,
        eSakshyaVideo: null,
        remark: null,
        active: null,
        createdBy: null,
        createdDate: null,
        accused: null,
        caseProceeding: null,
        accusedName: null,
        specialReportNoYear: null,
      },
      language: "en"
    };

    if (!confirm('This download may take time. Do not close the browser during download.')) {
      this.appStore.dispatch(new AppLoadderHide({}));
      this.isDownloading = false; // Reset loading state
      return;
    }

    this.apiService.apiDataPostCallDownloadFile(
      'case/export',
      params,
      true
    ).subscribe({
      next: (blob: Blob) => {
        try {
          this.appStore.dispatch(new AppLoadderHide({}));
          this.isDownloading = false; // Reset loading state

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.generateFileName(formData);

          document.body.appendChild(a);
          a.click();

          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }, 100);

          this.toaster.getToastMessage(
            'Report downloaded successfully!',
            'success',
            3000,
            'top-end'
          );

          this.closeDownloadModal();
        } catch (e) {
          console.error('Download processing failed:', e);
          this.appStore.dispatch(new AppLoadderHide({}));
          this.isDownloading = false; // Reset loading state
          this.toaster.getToastMessage(
            'Failed to process download file',
            'error',
            3000,
            'top-end'
          );
        }
      },
      error: (error) => {
        console.error('Download failed:', error);
        this.appStore.dispatch(new AppLoadderHide({}));
        this.isDownloading = false; // Reset loading state

        let errorMessage = 'Failed to download report';

        if (error.name === 'TimeoutError') {
          errorMessage = 'Download timed out. Please try again.';
        } else if (error.status === 0) {
          errorMessage = 'Connection lost. Please check your internet connection.';
        } else if (error.error instanceof Blob) {
          this.readBlobError(error.error).then(message => {
            this.toaster.getToastMessage(
              message || errorMessage,
              'error',
              3000,
              'top-end'
            );
          });
          return;
        }

        this.toaster.getToastMessage(
          error.error?.message || error.message || errorMessage,
          'error',
          3000,
          'top-end'
        );
      }
    });
  }

  private readBlobError(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result as string;
          const error = JSON.parse(text);
          resolve(error.message || error.msg || 'Unknown error');
        } catch (e) {
          resolve('Failed to parse error response');
        }
      };
      reader.readAsText(blob);
    });
  }

  // Generate file name based on selection
  // generateFileName(formData: any): string {
  //   const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  //   return `CID_Report_${formData.districtName}_${formData.srsNsrsType}_${timestamp}.${formData.downloadFormat}`;
  // }

  generateFileName(formData: any): string {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    return `CID_Report_${formData?.districtName || 'all'}_${formData?.srsNsrsType || 'all'}_${timestamp}.${formData?.downloadFormat || 'xlsx'}`;
  }

  fetchAccuseds = (id: any) => {
    this.apiService
      .apiPostCall('getCIDCrimeDataAccused', { id: id }, true)
      .subscribe((data) => {
        this.accuseds = data.cidCrimeAccusedPeople;
      });
  };
}
