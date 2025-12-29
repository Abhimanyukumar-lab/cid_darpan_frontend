import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FileSaver from 'file-saver';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

// import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import { jsPDF } from "jspdf";

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'app-view-court-supreme',
  templateUrl: './view-court-supreme.component.html',
  styleUrls: ['./view-court-supreme.component.scss'],
})
export class ViewCourtSupremeComponent implements OnDestroy {
  baseUrl: string = AppConstants.backServer;
  entry: any;

  runningStatuses: any[]=[];

  isCollapsed = true;
  isCollapsed3 = true;

  
  prisonerReleasedVerification :any;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    // this.global.checkForUserPermission(this.router.url);
    // console.log("this.router.ur  "+this.router.url);
    
    this.entry = this.localStorage.getStoredValue('viewData');
    // console.log("Value "+JSON.stringify(this.entry,null,2))
    
    this.fetchRunningStatus(); 

    
  }

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsed3 = false;
    // this.fetchDeceaseds();
  };
  toggle3 = () => {
    this.isCollapsed = false;
    this.isCollapsed3 = !this.isCollapsed3;
    
    // this.fetchRunningStatus();
  };

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
  }

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }


   fetchRunningStatus = () => {
      this.apiCaller
        .apiPostCall(
          'getUserTrainingTypeList',
          {id: this.entry.id},
          true
        )
        .subscribe(
          (data) => {
            console.log("Running Status Fetched ", JSON.stringify(data,null,2));
            
            this.runningStatuses = data.userTrainingTypeList;
          },
        );
    };

  exportData = () => {
    this.apiCaller
      .apiPostCallDownloadFile('generateCIDCaseData?id=' + this.entry.id, true)
      .subscribe((data) => {
        FileSaver.saveAs(
          data,
          'Case Details ' + this.entry.id + EXCEL_EXTENSION
        );
      });
  };

}
