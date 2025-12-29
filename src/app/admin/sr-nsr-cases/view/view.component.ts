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
import { AppLoadderShow, AppLoadderHide } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnDestroy {
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

    this.fetchTrails();
    this.fetchAccuseds();
    this.fetchDeceaseds();
    this.fetchVictims();
    this.fetchCaseProceeding();
  }
  ngOnInit(): void {
    this.iniTrailForm(null);
  }
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
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
    // this.fetchDeceaseds();
  };
  toggle1 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = !this.isCollapsed1;
    this.isCollapsed2 = false;
    this.isCollapsed3 = false;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
    // this.fetchVictims();
    // this.fetchDeceaseds();
  };
  toggle2 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = !this.isCollapsed2;
    this.isCollapsed3 = false;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
    // this.fetchAccuseds();
  };
  toggle3 = () => {
    this.isCollapsed = false;
    this.isCollapsed1 = false;
    this.isCollapsed2 = false;
    this.isCollapsed3 = !this.isCollapsed3;
    this.isCollapsed4 = false;
    this.isCollapsed5 = false;
    
    // this.fetchCaseProceeding();
    // this.fetchRunningStatus();
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
  
  fetchVictims = () => {
    this.apiCaller
      .apiPostCall('getCIDCrimeDataVictim', { id: this.entry.id }, true)
      .subscribe((data) => {
        this.victims = data.cidCrimeVictimPeople;
      });
  };

  fetchDeceaseds = () => {
    this.apiCaller
      .apiPostCall('getCIDCrimeDataDeceased', { id: this.entry.id }, true)
      .subscribe((data) => {
        this.deceasseds = data.cidCrimeDeceasedPeople;
      });
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
 

  // Add Trail Form Data
  
  loading = false;
  TrailForm: FormGroup;
  TrailList: any[] = [];

  iniTrailForm = (data: any) => {
    // console.log('Initial TrailForm value:', this.TrailForm.controls['id'].value);
    this.TrailForm = this.fb.group({
      id: data && data.id ? data.id : null,
      cidCrimeDataId: [
        this.entry.id,
        Validators.compose([Validators.required]),
      ],
      
      courtType: [
        data && data.courtType ? data.courtType : null,
      ],
      courtName: data && data.courtName ? data.courtName : null,
      courtCaseNo: data && data.courtCaseNo ? data.courtCaseNo : null,
      trialStatus: data && data.trialStatus ? data.trialStatus : null,
      hearingDate: data && data.hearingDate ? data.hearingDate : null,
      hearingNextDate: [data && data.hearingNextDate ? data.hearingNextDate : null],
      witnessPresent : [data && data.witnessPresent  ? data.hearingNextDate : null],
      complainantPresent: [data && data.complainantPresent ? data.hearingNextDate : null],
      superVisedBy: [data && data.superVisedBy ? data.hearingNextDate : null],
      remarks: [data && data.remarks ? data.hearingNextDate : null],
      document: [data && data.document ? data.hearingNextDate : null],
    });
  };

  document: File = null;
  
  handleFileChange = (file: FileList) => {
    this.document = file.item(0);
  };
  saveTrail = () => {
    console.log("Clicked");
    const value = this.TrailForm.value;
    console.log(("value "+JSON.stringify(value,null,2)));
    
    
    this.appStore.dispatch(new AppLoadderShow({}));
    // console.log("1018");
    const controls = this.TrailForm.controls;
    // console.log("1020");
    if (this.TrailForm.invalid) {
      // console.log("1022");
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      // console.log("1025");
      this.loading = false;
      // console.log("1027");
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;
    console.log("before api hit");

    var formData = new FormData();

    if(this.TrailForm.value['id'])formData.append("id", this.TrailForm.value['id']);
    // formData.append("cidAccusedId", this.TrailForm.value['cidAccusedId']);
    formData.append("cidCrimeDataId", this.TrailForm.value['cidCrimeDataId']);
    formData.append("courtType", this.TrailForm.value['courtType']);
    formData.append("courtName", this.TrailForm.value['courtName']);
    formData.append("courtCaseNo", this.TrailForm.value['courtCaseNo']);
    formData.append("trialStatus", this.TrailForm.value['trialStatus']);
    formData.append("hearingDate", this.TrailForm.value['hearingDate']);
    formData.append("hearingNextDate", this.TrailForm.value['hearingNextDate']);
    formData.append("witnessPresent", this.TrailForm.value['witnessPresent']);
    formData.append("complainantPresent", this.TrailForm.value['complainantPresent']);
    formData.append("superVisedBy", this.TrailForm.value['superVisedBy']);
    formData.append("remarks", this.TrailForm.value['remarks']);
    if(this.document){
      formData.append("document", this.document, this.document.name);
    }
   

    this.apiService
    .apiFormDataPostCall('addTrialStatus', formData, true)
    .subscribe(
      (data) => {
          // console.log("DAta ",JSON.stringify(data,null,2));
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.fetchTrails();
          this.TrailForm.reset();
          this.iniTrailForm(null);

        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
          this.toaster.getToastMessage(
            error.message,
            'error',
            3000,
            'top-end'
          );
        }
      );
      console.log("after api hit")
  };

  
  fetchTrails = () => {
    this.apiCaller
      .apiPostCall(
        'getTrialStatusList',
        { id: this.entry.id },
        true
      )
      .subscribe((data) => {
        console.log("data " + JSON.stringify(data,null,2));
        
        this.TrailList = data.trailList;
      });
  };

}
