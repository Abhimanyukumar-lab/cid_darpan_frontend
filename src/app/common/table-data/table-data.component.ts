import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { Permissions } from 'src/app/models/Permissions';
import { LangModule } from 'src/app/models/LangModule';
import { Page } from 'src/app/models/Page';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  EditFormData,
  RefreshViewDataStart,
  RefreshViewDataStop,
  UpdateTableDetails,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import Swal from 'sweetalert2';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ModelService } from '../popup/model.service';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Role } from 'src/app/models/Role';
import { Designation } from 'src/app/models/Designation';
import { take } from 'rxjs/operators';
import { SmsServiceProvider } from 'src/app/models/SmsServiceProvider';
import { SmsTemplate } from 'src/app/models/SmsTemplate';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

interface ExcelExportData {
  data: any[];
  headers: {
    name: string;
    width: number;
    style: any;
  }[];
}

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableDataComponent implements OnInit, OnDestroy {
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

  @Input('condition')
  condition: string = null;

  @Input('filterOptions')
  filterOptions: any[] = null;

  @Input('isReadUnRead')
  isReadUnRead: boolean = true;

  @Input('isApiAvailable')
  isApiAvailable: boolean = false;

  loading = false;
  ColumnMode = ColumnMode;
  SortType = SortType;
  itemCounts: any = [50, 100, 500, 1000, 5000, 10000];

  baseURL: string;

  stationList: PoliceStation[];
  roleList: Role[];
  designationList: Designation[];
  smsProvidersList: SmsServiceProvider[];
  smsTemplateList: SmsTemplate[];
  currentLang: string;

  districtList: any[];

  jhanduDistrict = null;
  userRole = null;


  isCollapsed = true;

  selectedRoleIds: number[] = [];
  dropdownRoleSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'roleName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  selectedStationIds: number[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'stationName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  dropdownSettingsHi: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'stationNameHi',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  selectedDesignationId: number[] = [];
  dropdownDesignSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'designationName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  dropdownDesignSettingsHi: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'designationNameHi',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };


  selectedSmsProviderId: number[] = [];
  dropdownSmsProviderSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'serviceProviderName',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };


  selectedSmsTemplateId: number[] = [];
  dropdownSmsTemplateSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'templateName',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  constructor(
    private apiCaller: ApiCallerService,
    private router: Router,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    public langModule: LangModule,
    private appStore: Store<{ app: any }>,
    private globalService: GlobalFunctionsService,
    private modelService: ModelService
  ) {
    this.baseURL =
      this.globalService.getSiteBackUrl() || AppConstants.backServer;

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isTableRefresh == true || data.isViewDataRefresh == true) {
        this.appStore.dispatch(new RefreshViewDataStop({}));
      }

      this.currentLang = data.defaultLang;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  ngOnInit(): void {
    this.page.pageNumber = 0;
    this.page.size = this.itemCounts[0];

    this.loadDistricts();

    if (this.filterOptions) {
      this.filterOptions.forEach((filter) => {
        if (filter.type == 'STATION') {
          this.apiCaller
            .apiGetCall(AppConstants.PUBLIC_APIS.STATIONSFETCH, true)
            .subscribe((data) => {
              this.stationList = data.stationDtos;
            });
        }

        if (filter.type == 'ROLES') {
          this.apiCaller
            .apiGetCall(AppConstants.USER_MODULE.FETCH_ROLE, true)
            .subscribe((data) => {
              this.roleList = data.roleDTOs;
            });
        }

        if (filter.type == 'SMSTEMPLATE') {
          this.apiCaller
            .apiGetCall(AppConstants.SMS_MODULE_MODULE.FETCH_SMS_TEMP, true)
            .subscribe((data) => {
              this.smsTemplateList = data.smsTemplateDTOs;
            });
        }

        if (filter.type == 'SMSPROVIDER') {
          this.apiCaller
            .apiGetCall(AppConstants.SMS_MODULE_MODULE.FETCH_SMS_PROVIDER, true)
            .subscribe((data) => {
              this.smsProvidersList = data.smsServiceProviderDTOs;
            });
        }
      });
    }
  }


  loadDistricts() {
    this.apiService
      .apiGetCall('getDistricts', true)
      .subscribe((data) => {
        this.districtList = data.districtDTOs;
        this.setUserDistrictAndFetchData();
      }, error => {
        console.error('Error loading districts:', error);
      });
  }

  setUserDistrictAndFetchData() {
    const userDistrictId = localStorage.getItem('userDistrictId');
    this.userRole = localStorage.getItem('userRole');



    if (userDistrictId && this.districtList) {
      const userDistrict = this.districtList.find(district => district.id == userDistrictId);

      // if (userDistrict && this.userRole !== 'ADMIN') {
      //   this.page.filter['districtName'] = userDistrict.districtName;
      //   this.jhanduDistrict = userDistrict.districtName;
      // }

      if (userDistrict && this.userRole !== 'ADMIN' && this.userRole !== 'SUPER_ADMIN') {
        this.page.filter['districtName'] = userDistrict.districtName;
        this.jhanduDistrict = userDistrict.districtName;
      }
    }

    this.fetchData();
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

    if (val.length == 0) this.page.filter[name] = null;
    else this.page.filter[name] = val;

    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  updateDateFilter(event, name) {
    var val = event.target.value.toLowerCase();
    if (val.length > 0) val = val + 'T00:00:00.000';
    else val = null;
    this.page.filter[name] = val;
    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  updateDropDownFilter(event, name) {
    const val = event.target.value.toLowerCase();
    if (val != 'null') this.page.filter[name] = val;
    else this.page.filter[name] = null;
    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  updateStationFilter(event, name) {
    var selectedOne = [];
    this.selectedStationIds.forEach((selection: any) => {
      selectedOne.push(selection.id);
    });

    this.page.filter[name] = selectedOne;
    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  updateRoleFilter(event, name) {
    var selectedOne = [];
    this.selectedRoleIds.forEach((selection: any) => {
      selectedOne.push(selection.id);
    });
    this.page.filter[name] = selectedOne;
    this.page.pageNumber = 0;
    this.loading = true;
    this.fetchData();
  }

  updateDesignationFilter(event, name) {
    var selectedOne = [];
    this.selectedDesignationId.forEach((selection: any) => {
      selectedOne.push(selection.id);
    });
    this.page.filter[name] = selectedOne;
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
    // if (this.userRole !== 'ADMIN') {
    //   this.page.filter['districtName'] = this.jhanduDistrict;
    // }

    if (this.userRole !== 'ADMIN' && this.userRole !== 'SUPER_ADMIN') {
      // Retrieve userDistrict from districtList using userDistrictId
      const userDistrictId = localStorage.getItem('userDistrictId');
      const userDistrict = this.districtList?.find(district => district.id == userDistrictId);
      this.page.filter['districtName'] = this.jhanduDistrict || userDistrict?.districtName;
    }
    this.appStore.dispatch(new UpdateTableDetails(false));
    this.appStore.dispatch(new RefreshViewDataStop(false));
    this.apiCaller
      .apiPostCall(this.path, this.page, true, false)
      .subscribe((pagedData) => {
        this.loading = false;
        this.page = pagedData.page;
        this.rows = pagedData.data;
        // console.log(JSON.stringify(pagedData));
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
      confirmButtonText: 'Delete',
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

  editCurrentForm = (data: any) => {
    this.appStore.dispatch(new EditFormData(data));
  };

  goToEditLink = (url: string, data: any) => {
    this.localStorage.setStoredValue('editData', data);
    //this.router.navigate([url]);

    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };

  goToViewLink = (url: string, data: any) => {
    this.localStorage.setStoredValue('viewData', data);
    this.router.navigate([url]);
  };

  goToInsideViewLink = (url: string, data: any) => {
    this.localStorage.setStoredValue('insideViewData', data);
    this.router.navigate([url]);
  };

  getRowClass = (row) => {
    if (row.updateStatus == 'READ' && this.isReadUnRead) {
      return {
        'row-color': true,
      };
    }
  };

  downloadCert = (row: any) => {
    if (row.signedCert) {
      window.open(this.baseURL + row.signedCert, '_blank');
    } else {
      this.localStorage.setStoredValue('characterValue', row.id);
      this.localStorage.setStoredValue('viewData', row);
      this.openModal('downloadCertificate');
    }
  };

  openModal = (id: string) => {
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };

  onItemSelect(item: any) {
    //this.selectedOfficersids.push(item.id + '');
  }
  onSelectAll(items: any[]) {
    // items.forEach((item: any) => {
    //   this.selectedOfficersids.push(item.id + '');
    // });
  }

  // if(window.router.url===)

  isCIDExcelURL(): boolean {
    const allowedURLs = [
      '/official/caseUploadReport',
    ];
    return allowedURLs.includes(this.router.url);
  }

  // export = () => {
  //   this.exportAsExcelFile(this.rows, 'Table Data');
  // };

  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const myworkbook: XLSX.WorkBook = {
  //     Sheets: { data: myworksheet },
  //     SheetNames: ['data'],
  //   };
  //   const excelBuffer: any = XLSX.write(myworkbook, {
  //     bookType: 'xlsx',
  //     type: 'array',
  //   });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE,
  //   });
  //   FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  // }



  // // Main export function
  // export(): void {
  //   const fileName = this.generateExportFileName();
  //   const exportData = this.prepareExcelData(this.rows);
  //   this.exportAsExcelFile(exportData, fileName);
  // }

  // // Generate filename based on SR/NSR filter and district
  // private generateExportFileName(): string {
  //   const districtName = this.jhanduDistrict 
  //     ? this.jhanduDistrict.replace(/[^\w]/g, '_').replace(/_+/g, '_')
  //     : 'AllDistricts';

  //   // Check for SR records
  //   const hasSR = this.rows.some(row => 
  //     row.srsNsrsType === 'SR' || 
  //     (row.srsNsrNo && row.srsNsrNo.includes('SR/'))
  //   );

  //   // Check for NSR records
  //   const hasNSR = this.rows.some(row => 
  //     row.srsNsrsType === 'NSR' || 
  //     (row.srsNsrNo && row.srsNsrNo.includes('NSR/'))
  //   );

  //   const now = new Date();
  //   const timestamp = [
  //     now.getFullYear(),
  //     (now.getMonth() + 1).toString().padStart(2, '0'),
  //     now.getDate().toString().padStart(2, '0'),
  //     '_',
  //     now.getHours().toString().padStart(2, '0'),
  //     now.getMinutes().toString().padStart(2, '0')
  //   ].join('');

  //   // Return appropriate filename
  //   if (hasSR && hasNSR) {
  //     return `SR_NSR_${districtName}_${timestamp}`;
  //   } else if (hasSR) {
  //     return `SR_${districtName}_${timestamp}`;
  //   } else if (hasNSR) {
  //     return `NSR_${districtName}_${timestamp}`;
  //   }
  //   return `${districtName}_${timestamp}`;
  // }

  // // Prepare data with all fields except excluded ones
  // private prepareExcelData(data: any[]): ExcelExportData {
  //   // Define excluded fields
  //   const excludedFields = [
  //     'active', 'createdBy', 'updatedBy', 'roleId',
  //     'createdDate', 'updatedDate', 'districtId',
  //     'circleName', 'accusedName', 'basicId'
  //   ];

  //   // Special handling for nested objects
  //   const nestedHandlers = {
  //     'accused': (val: any[]) => val?.map(a => a.accusedName).join(', ') || 'None',
  //     'caseProceeding': (val: any) => val?.currentCaseStatus || 'No proceedings'
  //   };

  //   // Get all field names
  //   const allFields = Object.keys(data[0] || {})
  //     .filter(field => !excludedFields.includes(field));

  //   // Define column headers with styles
  //   const headers = allFields.map(field => ({
  //     name: this.formatHeaderName(field),
  //     width: this.getColumnWidth(field),
  //     style: this.getHeaderStyle()
  //   }));

  //   // Prepare the data rows
  //   const dataRows = data.map(item => {
  //     const row = {};
  //     allFields.forEach(field => {
  //       if (nestedHandlers[field]) {
  //         row[this.formatHeaderName(field)] = nestedHandlers[field](item[field]);
  //       } else {
  //         row[this.formatHeaderName(field)] = this.formatFieldValue(item[field], field);
  //       }
  //     });
  //     return row;
  //   });

  //   return {
  //     data: dataRows,
  //     headers: headers
  //   };
  // }

  // // Helper methods
  // private formatHeaderName(fieldName: string): string {
  //   const nameMap = {
  //     'srsNsrsType': 'SR/NSR',
  //     'srsNsrNo': 'SR Number',
  //     'districtName': 'District',
  //     'subdivisionName': 'Subdivision',
  //     'policestationName': 'Police Station',
  //     'caseNo': 'Case Number',
  //     'caseDate': 'Case Date',
  //     'section': 'IPC Section',
  //     'ioName': 'IO Name',
  //     'maxPunishment': 'Max Punishment',
  //     'majorHead': 'Major Head',
  //     'subHead': 'Sub Head',
  //     'nameComplainant': 'Complainant',
  //     'fslVisit': 'FSL Visit',
  //     'eSakshyaVideo': 'eSakshya Video'
  //   };
  //   return nameMap[fieldName] || 
  //     fieldName.replace(/([A-Z])/g, ' $1')
  //             .replace(/^./, str => str.toUpperCase());
  // }

  // private getHeaderStyle() {
  //   return { 
  //     font: { 
  //       bold: true, 
  //       color: { rgb: 'FFFFFF' },
  //       sz: 12
  //     }, 
  //     fill: { 
  //       fgColor: { rgb: '4472C4' },
  //       patternType: 'solid'
  //     },
  //     alignment: { 
  //       vertical: 'center',
  //       horizontal: 'center',
  //       wrapText: true
  //     },
  //     border: {
  //       top: { style: 'thin', color: { rgb: '000000' } },
  //       bottom: { style: 'thin', color: { rgb: '000000' } },
  //       left: { style: 'thin', color: { rgb: '000000' } },
  //       right: { style: 'thin', color: { rgb: '000000' } }
  //     }
  //   };
  // }

  // private getColumnWidth(fieldName: string): number {
  //   const widthMap = {
  //     'id': 8,
  //     'srsNsrsType': 12,
  //     'srsNsrNo': 25,
  //     'districtName': 20,
  //     'subdivisionName': 20,
  //     'policestationName': 25,
  //     'caseNo': 25,
  //     'caseDate': 15,
  //     'section': 20,
  //     'ioName': 25,
  //     'maxPunishment': 15,
  //     'majorHead': 15,
  //     'subHead': 20,
  //     'nameComplainant': 30,
  //     'fslVisit': 15,
  //     'eSakshyaVideo': 20,
  //     'accused': 40,
  //     'caseProceeding': 40
  //   };
  //   return widthMap[fieldName] || 15;
  // }

  // private formatFieldValue(value: any, fieldName: string): any {
  //   if (value == null) return '';

  //   // Format dates
  //   if (typeof value === 'string' && fieldName.toLowerCase().includes('date')) {
  //     return value.split('T')[0];
  //   }

  //   // Handle arrays
  //   if (Array.isArray(value)) {
  //     return value.join(', ');
  //   }

  //   // Handle objects
  //   if (typeof value === 'object') {
  //     return JSON.stringify(value);
  //   }

  //   return value;
  // }

  // // Export to Excel with formatting
  // public exportAsExcelFile(exportData: ExcelExportData, fileName: string): void {
  //   // Create worksheet
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
  //     exportData.data,
  //     { header: exportData.headers.map(h => h.name) }
  //   );

  //   // Set column widths
  //   ws['!cols'] = exportData.headers.map(header => ({ 
  //     width: header.width,
  //     wpx: header.width * 7 // Convert to pixel approximation
  //   }));

  //   // Apply header styles
  //   const headerRange = XLSX.utils.decode_range(ws['!ref']);
  //   exportData.headers.forEach((header, colIndex) => {
  //     const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: colIndex });
  //     ws[cellAddress] = ws[cellAddress] || { t: 's' };
  //     ws[cellAddress].s = header.style;
  //   });

  //   // Freeze header row
  //   ws['!freeze'] = { ySplit: 1 };

  //   // Create workbook
  //   const wb: XLSX.WorkBook = {
  //     Sheets: { 'Report': ws },
  //     SheetNames: ['Report']
  //   };

  //   // Generate and save file
  //   const excelBuffer = XLSX.write(wb, { 
  //     bookType: 'xlsx', 
  //     type: 'array',
  //     cellStyles: true 
  //   });

  //   this.saveAsExcelFile(excelBuffer, fileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data = new Blob([buffer], { 
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  //   });
  //   FileSaver.saveAs(data, `${fileName}.xlsx`);
  // }

  // Main export function
  export(): void {
    const fileName = this.generateExportFileName();
    const exportData = this.prepareExcelData(this.rows);
    this.exportAsExcelFile(exportData, fileName);
  }

  private generateExportFileName(): string {
    const districtName = this.jhanduDistrict
      ? this.jhanduDistrict.replace(/[^\w]/g, '_').replace(/_+/g, '_')
      : 'AllDistricts';

    const hasSR = this.rows.some(row =>
      row.srsNsrsType === 'SR' || (row.specialReportNoYear && row.specialReportNoYear.includes('SR/'))
    );

    const hasNSR = this.rows.some(row =>
      row.srsNsrsType === 'NSR' || (row.specialReportNoYear && row.specialReportNoYear.includes('NSR/'))
    );

    const now = new Date();
    const timestamp = [
      now.getFullYear(),
      (now.getMonth() + 1).toString().padStart(2, '0'),
      now.getDate().toString().padStart(2, '0'),
      '_',
      now.getHours().toString().padStart(2, '0'),
      now.getMinutes().toString().padStart(2, '0')
    ].join('');

    if (hasSR && hasNSR) {
      return `SR_NSR_${districtName}_${timestamp}`;
    } else if (hasSR) {
      return `SR_${districtName}_${timestamp}`;
    } else if (hasNSR) {
      return `NSR_${districtName}_${timestamp}`;
    }
    return `${districtName}_${timestamp}`;
  }

  private prepareExcelData(data: any[]): ExcelExportData {
    const headers = [
      { name: 'Sr. No. (क्रमांक)', width: 10 },
      { name: 'District (जिला)', width: 15 },
      { name: 'Sub-Division (अनुमंडल)', width: 18 },
      { name: 'Circle (अंचल)', width: 12 },
      { name: 'Police Station (थाना)', width: 20 },
      { name: 'Special Report No/Year (विशेष प्रतिवेदन संख्या/वर्ष)', width: 35 },
      { name: 'Case Number (कांड संख्या)', width: 18 },
      { name: 'Year of Case (कांड का वर्ष)', width: 15 },
      { name: 'Date (तिथि)', width: 15 },
      { name: 'Section (धारा)', width: 15 },
      { name: 'Name of Investigation Officer (अनुसंधानकर्ता का नाम)', width: 30 },
      { name: 'Designation of I.O.(अनुसंधानकर्ता का पदनाम)', width: 25 },
      { name: 'Max Punishment (<7 or >=7 yrs) (अधिकतम सजा (<7 या >=7 वर्ष))', width: 25 },
      { name: 'Major Head (मुख्य शीर्ष)', width: 20 },
      { name: 'Sub-Head (उप-शीर्ष)', width: 15 },
      { name: 'Complainant (वादी)', width: 20 },
      { name: 'FIR Accused (प्राथमिकी अभियुक्त)', width: 25 },
      { name: 'Supervision Date (पर्यवेक्षण तिथि)', width: 20 },
      { name: 'Supervision Note Date (पर्यवेक्षण टिप्पणी निर्गत करने की तिथि)', width: 25 },
      { name: 'Supervisory Officer Name (पर्यवेक्षी पदाधिकारी नाम)', width: 25 },
      { name: 'Supervisory Officer Designation (पर्यवेक्षी पदाधिकारी का पदनाम)', width: 25 },
      { name: 'Name of the Accused Found True in Supervision (पर्यवेक्षण में सत्य पाये गये अभियुक्त का नाम)', width: 35 },
      { name: 'Special Report Issue Date (विशेष प्रतिवेदन निर्गत तिथि)', width: 25 },
      { name: 'Name of the Accused Found True in Special Report (विशेष प्रतिवेदन में सत्य पाये गये अभियुक्त का नाम)', width: 35 },
      { name: '(Progress Report Date) कांड में प्रगति प्रतिवेदन निर्गत की तिथि', width: 30 },
      { name: 'Name of officer issuing P.R. (प्रगति प्रतिवेदन निर्गत करने वाले पदाधिकारी का नाम)', width: 35 },
      { name: 'Designation of officer issuing P.R. (प्रगति प्रतिवेदन निर्गत करने वाले पदाधिकारी का पदनाम)', width: 35 },
      { name: 'Last Review Date (अंतिम समीक्षा तिथि)', width: 20 },
      { name: 'Name of officer of last review (अंतिम समीक्षा करने वाले पदाधिकारी का नाम)', width: 30 },
      { name: 'Designation of officer of last review (अंतिम समीक्षा करने वाले पदाधिकारी का पदनाम)', width: 30 },
      { name: 'Number of last C.D. (कांड की अंतिम दैनिकी संख्या)', width: 25 },
      { name: 'Date of last C.D. (कांड की अंतिम दैनिकी की तिथि)', width: 25 },
      { name: 'Review Note Date (समीक्षा टिप्पणी तिथि)', width: 20 },
      { name: 'FSL Visit (>7yrs) Y/N (एफएसएल भ्रमण (>7 वर्ष) हाँ/नहीं)', width: 20 },
      { name: 'e-Sakshya Video Uploading-Y/N (ई-साक्ष्य वीडियो अपलोड- हाँ/नहीं)', width: 25 },
      { name: 'Chargesheet/Final Report Status (आरोप पत्र/अंतिम रिपोर्ट की स्थिति)', width: 25 },
      { name: 'Remarks (टिप्पणी)', width: 20 }
    ];

    const dataRows = data.map((item, index) => {
      const caseProceeding = item.caseProceeding || {};
      const accused = item.accused && item.accused.length > 0 ? item.accused[0] : {};

      return {
        'Sr. No. (क्रमांक)': index + 1,
        'District (जिला)': item.districtName || '',
        'Sub-Division (अनुमंडल)': item.subdivisionName || '',
        'Circle (अंचल)': item.circleName || '',
        'Police Station (थाना)': item.policestationName || '',
        'Special Report No/Year (विशेष प्रतिवेदन संख्या/वर्ष)': item.specialReportNoYear || '',
        'Case Number (कांड संख्या)': item.caseNo || '',
        'Year of Case (कांड का वर्ष)': item.yearOfCase || '',
        'Date (तिथि)': this.formatDate(item.caseDate),
        'Section (धारा)': item.section || '',
        'Name of Investigation Officer (अनुसंधानकर्ता का नाम)': item.ioName || '',
        'Designation of I.O.(अनुसंधानकर्ता का पदनाम)': item.ioDesignationName || '',
        'Max Punishment (<7 or >=7 yrs) (अधिकतम सजा (<7 या >=7 वर्ष))': item.maxPunishment || '',
        'Major Head (मुख्य शीर्ष)': item.majorHead || '',
        'Sub-Head (उप-शीर्ष)': item.subHead || '',
        'Complainant (वादी)': item.nameComplainant || '',
        'FIR Accused (प्राथमिकी अभियुक्त)': accused.accusedName || '',
        'Supervision Date (पर्यवेक्षण तिथि)': this.formatDate(caseProceeding.supervisionDate),
        'Supervision Note Date (पर्यवेक्षण टिप्पणी निर्गत करने की तिथि)': this.formatDate(caseProceeding.supervisionNoteDate),
        'Supervisory Officer Name (पर्यवेक्षी पदाधिकारी नाम)': caseProceeding.supervisoryOfficerName || '',
        'Supervisory Officer Designation (पर्यवेक्षी पदाधिकारी का पदनाम)': caseProceeding.supervisoryOfficerDesignation || '',
        'Name of the Accused Found True in Supervision (पर्यवेक्षण में सत्य पाये गये अभियुक्त का नाम)': caseProceeding.nameOfAccuseFoundTinSupervision || '',
        'Special Report Issue Date (विशेष प्रतिवेदन निर्गत तिथि)': this.formatDate(caseProceeding.specialReportIssueDate),
        'Name of the Accused Found True in Special Report (विशेष प्रतिवेदन में सत्य पाये गये अभियुक्त का नाम)': caseProceeding.nameOfAccusedFoundTInSpecialReport || '',
        '(Progress Report Date) कांड में प्रगति प्रतिवेदन निर्गत की तिथि': this.formatDate(caseProceeding.progressReportDate),
        'Name of officer issuing P.R. (प्रगति प्रतिवेदन निर्गत करने वाले पदाधिकारी का नाम)': caseProceeding.nameOfOfficerIssuingPR || '',
        'Designation of officer issuing P.R. (प्रगति प्रतिवेदन निर्गत करने वाले पदाधिकारी का पदनाम)': caseProceeding.designationOfIssuingPR || '',
        'Last Review Date (अंतिम समीक्षा तिथि)': this.formatDate(caseProceeding.lastReviewDate),
        'Name of officer of last review (अंतिम समीक्षा करने वाले पदाधिकारी का नाम)': caseProceeding.nameOfOfficerOfLstReview || '',
        'Designation of officer of last review (अंतिम समीक्षा करने वाले पदाधिकारी का पदनाम)': caseProceeding.designationOfOfficerOfLastReview || '',
        'Number of last C.D. (कांड की अंतिम दैनिकी संख्या)': caseProceeding.noOfLastCaseDiary || '',
        'Date of last C.D. (कांड की अंतिम दैनिकी की तिथि)': this.formatDate(caseProceeding.dateOfLastCaseDiary),
        'Review Note Date (समीक्षा टिप्पणी तिथि)': this.formatDate(caseProceeding.reviewNoteDate),
        'FSL Visit (>7yrs) Y/N (एफएसएल भ्रमण (>7 वर्ष) हाँ/नहीं)': this.formatYesNo(item.fslVisit),
        'e-Sakshya Video Uploading-Y/N (ई-साक्ष्य वीडियो अपलोड- हाँ/नहीं)': this.formatYesNo(item.eSakshyaVideo),
        'Chargesheet/Final Report Status (आरोप पत्र/अंतिम रिपोर्ट की स्थिति)': caseProceeding.chargeSheetedFinalReportStatus || '',
        'Remarks (टिप्पणी)': caseProceeding.remarks || item.remark || ''
      };
    });

    return {
      data: dataRows,
      headers: headers.map(header => ({
        ...header,
        style: this.getHeaderStyle()
      }))
    };
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';

      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }

  private formatYesNo(value: any): string {
    if (value === null || value === undefined) return '';

    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      if (lowerValue === 'yes' || lowerValue === 'y' || lowerValue === 'true') return 'Yes';
      if (lowerValue === 'no' || lowerValue === 'n' || lowerValue === 'false') return 'No';
    }

    return value.toString();
  }

  private getHeaderStyle() {
    return {
      font: {
        bold: true,
        color: { rgb: 'FFFFFF' },
        sz: 10
      },
      fill: {
        fgColor: { rgb: '4472C4' },
        patternType: 'solid'
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center',
        wrapText: true
      },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } }
      }
    };
  }

  public exportAsExcelFile(exportData: ExcelExportData, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      exportData.data,
      { header: exportData.headers.map(h => h.name) }
    );

    // Set column widths
    ws['!cols'] = exportData.headers.map(header => ({
      width: header.width
    }));

    // Apply header styles
    exportData.headers.forEach((header, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });

      if (!ws[cellAddress]) {
        ws[cellAddress] = { t: 's', v: header.name };
      }

      ws[cellAddress].s = header.style;
    });

    // Freeze header row
    ws['!freeze'] = { xSplit: 0, ySplit: 1 };

    // Create workbook
    const wb: XLSX.WorkBook = {
      Sheets: { 'Sheet1': ws },
      SheetNames: ['Sheet1']
    };

    // Generate and save file
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true
    });

    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }

  getTimeDate = (daysToGo: number, fromDate: string): number => {
    if (fromDate) {
      var data = Math.round(
        ((new Date().getTime() - new Date(fromDate).getTime()) /
          (1000 * 3600 * 24) /
          daysToGo) *
        100
      );
      if (data != Infinity) return data;
      else {
        var days = this.getDate(daysToGo, fromDate);

        if (days >= 0) return 100;
        else return 0;
      }
    } else return 0;
  };

  getDate = (daysToGo: number, fromDate: string): number => {
    if (fromDate) {
      var days = Math.round(
        daysToGo -
        (new Date().getTime() - new Date(fromDate).getTime()) /
        (1000 * 3600 * 24)
      );

      return days;
    } else return 0;
  };

  // isSummonUrl(): boolean {
  //   return this.router.url === '/official/procecution/summon';
  // }

  isSummonUrl(): boolean {
    const urls = [
      '/official/procecution/summon',
      '/official/procecution/warrent',
      '/official/procecution/proclaim',
      '/official/procecution/attachment'
    ];
    return urls.includes(this.router.url);
  }


  exportCustomExcel = () => {
    const headerMapping = {
      "id": "ID",
      "serialNoDate": "Serial No.",
      "detailType": "Prosecution Type",
      "courtName": "Court Name",
      "caseNo": "Case No.",
      "procType": "Accused/Witness",
      "proName": "Name",
      "remark": "Father Name",
      "procAddress": "Address",
      "reciptNo": "Receipt No.",
      "dispatchNum": "Dispatch No.",
      "status": "Status",
      "assignTo": "Assign To",
      // Map other keys to custom headers as needed
    };

    // Convert headerMapping object to an array of objects
    const headers = Object.keys(headerMapping).map(key => ({ key, value: headerMapping[key] }));

    // Format the data with bold headers
    const data = [headers.map(header => ({ ...header, isBold: true })), ...this.rows];

    this.exportAsCustomExcelFile(data, 'Table Data', headerMapping);
  };




  exportAsCustomExcelFile(json: any[], excelFileName: string, headerMapping: Record<string, string>): void {
    // Create an array to hold all rows including headers
    const dataRows = [];

    // Extract headers from the header mapping
    const headers = Object.values(headerMapping);

    // Insert headers as the first row
    dataRows.push(headers);

    // Add data rows
    json.forEach(item => {
      const rowData = headers.map(header => item[Object.keys(headerMapping).find(key => headerMapping[key] === header)]);
      dataRows.push(rowData);
    });

    // Convert data to Excel worksheet
    const myworksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataRows);

    // Create workbook
    const myworkbook: XLSX.WorkBook = {
      Sheets: { data: myworksheet },
      SheetNames: ['data'],
    };

    // Write workbook into Excel buffer
    const excelBuffer: any = XLSX.write(myworkbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Save Excel file
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

}
