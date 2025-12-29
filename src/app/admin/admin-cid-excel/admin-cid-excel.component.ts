import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AppLoadderHide, AppLoadderShow } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { HttpClient } from '@angular/common/http';
import { CIDUploadCase } from 'src/app/models/CIDUploadCase';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-cid-excel',
  templateUrl: './admin-cid-excel.component.html',
  styleUrls: ['./admin-cid-excel.component.scss']
})
export class AdminCidExcelComponent implements OnInit {

  page = new Page(0, 0, 0, 0, true, [], new CIDUploadCase(true, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null));

  rows: CIDUploadCase[] = [];
  cidExcelForm: UntypedFormGroup;
  excelFile: File = null;

  ADD_CID_EXCEL: boolean;
  EDIT_CID_EXCEL: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  path: string = AppConstants.EXCEL_MODULE.FETCH_URL;

  allColumns = [
    { key: 'srNSR', label: 'Sr. No. (क्रमांक)' },
    { key: 'districtName', label: 'District' },
    { key: 'subdivisionName', label: 'Subdivision' },
    { key: 'policestationName', label: 'Police Station' },
    { key: 'reportDate', label: 'Special Rpt No/Year' },
    { key: 'caseNo', label: 'Case No' },
    { key: 'caseDate', label: 'Case Date' },
    { key: 'section', label: 'Section' },
    { key: 'ioName', label: 'IO Name' },
    { key: 'maxPunishment', label: 'Max Punishment' },
    { key: 'majorHead', label: 'Major Head' },
    { key: 'subHead', label: 'Sub Head' },
    { key: 'nameComplainant', label: 'Complainant Name' },
    { key: 'accusedName', label: 'Accused Name' },
    { key: 'supervisionDate', label: 'Supervision Date' },
    { key: 'supervisionNoteDate', label: 'Supervision Note Date' },
    { key: 'supervisoryOfficerName', label: 'Supervisory Officer Name' },
    { key: 'supervisoryOfficerDesignation', label: 'Supervisory Officer Designation' },
    { key: 'accusedFoundSupervision', label: 'Accused Found Supervision' },
    { key: 'specialRptIssueDate', label: 'Special Report Issue Date' },
    { key: 'accusedFoundSpecialRpt', label: 'Accused Found Special Report' },
    { key: 'progressRptDateOfficer', label: 'Progress Report Date Officer' },
    { key: 'lastReviewDateOfficer', label: 'Last Review Date Officer' },
    { key: 'reviewNoteDate', label: 'Review Note Date' },
    { key: 'fslVisit', label: 'FSL Visit' },
    { key: 'eSakshyaVideo', label: 'eSakshya Video' },
    { key: 'chargesheetStatus', label: 'Charge Sheet Status' },
    { key: 'remark', label: 'Remark' },
  ];


  displayedColumns = this.allColumns.map(col => col.key);
  dataSource = new MatTableDataSource<any>([]);
  data: any[] = [];

  pageSizeOptions = [5, 10, 25, 50];
  pageSize = 10;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyPagination() {
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    private http: HttpClient,
    private router: Router
  ) {
    this.global.checkForUserPermission(this.router.url);
    this.ADD_CID_EXCEL = this.global.checkForUserButtonPermission(AppConstants.EXCEL_MODULE.ADD_SUBMIT_DATA);
    this.EDIT_CID_EXCEL = this.global.checkForUserButtonPermission(AppConstants.EXCEL_MODULE.EDIT_SUBMIT_DATA);
    this.ADD_URL = AppConstants.EXCEL_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.EXCEL_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initCidExcelForm();
    this.fetchExcelData(); // Fetch on load


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
  }

  onPageSizeChange(event: any) {
    this.dataSource.paginator.pageSize = event.value;
  }


   
  initCidExcelForm() {
    this.cidExcelForm = this.fb.group({
      firType: ['', Validators.required],
      districtId: ['', Validators.required],
      firDoc: ['', Validators.required],
    });
  }

  uploadExcelData = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    if (this.cidExcelForm.invalid) {
      Object.keys(this.cidExcelForm.controls).forEach(control => {
        this.cidExcelForm.controls[control].markAsTouched();
      });
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    const formData = new FormData();
    formData.append('firType', this.cidExcelForm.value['firType']);
    formData.append('districtId', this.cidExcelForm.value['districtId']);
    if (this.excelFile) {
      formData.append('firDoc', this.excelFile, this.excelFile.name);
    }

    this.apiService.apiFormDataPostCall(this.ADD_URL, formData, true).subscribe({
      next: (data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
        this.cidExcelForm.reset();
        this.excelFile = null;
        this.fetchExcelData(); // refresh list
        this.appStore.dispatch(new AppLoadderHide({}));
      },
      error: () => {
        this.toaster.getToastMessage('Upload failed.', 'error', 3000, 'top-end');
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    });
  };

  fetchExcelData() {
    this.appStore.dispatch(new AppLoadderShow({}));
    const request = {
      firType: this.cidExcelForm.value['firType'] || '',
      districtId: this.cidExcelForm.value['districtId'] || '',
      userId: this.localStorage.getStoredValue('userId') || null
    };

    this.apiService.apiPostCall(this.path, request, true).subscribe({
      next: (response: any) => {
        if (response.status === 'OK') {
           this.dataSource.data = response.caseUploadExcelList;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.rows = response.caseUploadExcelList || [];
          console.log(" response "+ JSON.stringify(response,null,2));
          
        } else {
          this.rows = [];
          this.toaster.getToastMessage('No data found.', 'info', 3000, 'top-end');
        }
        this.appStore.dispatch(new AppLoadderHide({}));
      },
      error: () => {
        this.rows = [];
        this.toaster.getToastMessage('Failed to fetch data.', 'error', 3000, 'top-end');
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    });
  }

  handleFileChange = (file: FileList) => {
    this.excelFile = file.item(0);
  };

  goBack() {
    this._location.back();
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
        alert('Sample file not found. Please contact support.');
      }
    });
  }
}
