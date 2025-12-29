import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import FileSaver from 'file-saver';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderShow,
  AppLoadderHide,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-view-cid-upload',
  templateUrl: './view-cid-upload.component.html',
  styleUrls: ['./view-cid-upload.component.scss'],
})
export class ViewCidUploadComponent implements OnDestroy {
  baseUrl: string = AppConstants.backServer;
  entry: any;

  victims: any[] = [];
  deceasseds: any[] = [];
  accuseds: any[] = [];
  cidCrimeCaseProceeding: any;

  isCollapsed = true;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.entry = this.localStorage.getStoredValue('viewData');
    console.log(JSON.stringify(this.entry, null, 2));

    this.accuseds = this.entry.accused;
    this.cidCrimeCaseProceeding = this.entry.caseProceeding;
  }
  ngOnInit(): void {
    if (this.entry?.caseProceeding?.updateHistories?.length > 0) {
    this.groupHistoryByField(this.entry.caseProceeding.updateHistories);
  }
  }


  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');

  }

  groupedHistory: any = {};

  groupHistoryByField(updateHistories: any[]) {
    this.groupedHistory = {};

    updateHistories.forEach((history) => {
      if (!this.groupedHistory[history.fieldName]) {
        this.groupedHistory[history.fieldName] = [];
      }
      this.groupedHistory[history.fieldName].push(history);
    });
    for (let field in this.groupedHistory) {
      this.groupedHistory[field].sort((a, b) => a.id - b.id);
    }
  }

  objectKeys = Object.keys;

  getCurrentValue(fieldName: string) {
    return this.entry.caseProceeding[fieldName];
  }

  goBack() {
    this._location.back();
  }

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
  };
  toggle1 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = !this.isCollapsed1;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
  };
  toggle2 = () => {
  };
  toggle3 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = !this.isCollapsed3;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
  };
  toggle4 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
    this.isCollapsed4 = !this.isCollapsed4;
    this.isCollapsed5 = false;
  };
  toggle5 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
    this.isCollapsed4 = false;
    this.isCollapsed5 = !this.isCollapsed5;
  };

  fetchAccuseds = () => {
    this.apiCaller
      .apiPostCall('getCIDCrimeDataAccused', { id: this.entry.id }, true)
      .subscribe((data) => {
        this.accuseds = data.cidCrimeAccusedPeople;
      });
  };

  fetchCaseProceeding = () => {
    this.apiCaller
      .apiPostCall(
        'getCIDCrimeDataCaseProceeding',
        { cidCrimeDataId: this.entry.id },
        true
      )
      .subscribe((data) => {
        this.cidCrimeCaseProceeding = data.cidCrimeCaseProceeding;
      });
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
