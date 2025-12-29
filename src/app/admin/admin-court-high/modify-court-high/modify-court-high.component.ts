import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { LangModule } from 'src/app/models/LangModule';
import { PoliceStation } from 'src/app/models/PoliceStation';
import { StationUser } from 'src/app/models/StationUser';
import { Subdivision } from 'src/app/models/Subdivision';
import { User } from 'src/app/models/user';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-modify-court-high',
  templateUrl: './modify-court-high.component.html',
  styleUrls: ['./modify-court-high.component.scss'],
})
export class ModifyCourtHighComponent implements OnInit, OnDestroy {
  
  selectedRange: string;
  selectedDistrict: string;
  selectedCrimeHead: string;
  selectedCrimeSubHead: string;

  subscription: any;
  subscriptionDistrict: any;
  entry: any;
  loading = false;
  entryForm: FormGroup;

  ADD_ENTRY: boolean;
  EDIT_ENTRY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  districtId: number;

  today = new Date();

  ENTRY_PARAMS = {
    
    id: null,
    trainingNameEn: null,
    trainingNameHi: null,
    

  };
  
  isCollapsed = true;
  

  constructor(
    private appStore: Store<{ app: any }>,
    private userStore: Store<{ auth: User }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: FormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {

    this.entry = this.localStorage.getStoredValue('editData');


    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.subscriptionDistrict = this.userStore
      .pipe(select('auth'))
      .subscribe((data) => {
        this.districtId = data.user.districtId;
      });
      
    if (this.entry) {
        
        this.ENTRY_PARAMS.id = this.entry.id;
        this.ENTRY_PARAMS.trainingNameEn = this.entry.trainingNameEn;
        this.ENTRY_PARAMS.trainingNameHi = this.entry.trainingNameHi;
      

    }
    // console.log("Ranggggggggge ",this.entryForm.get('range').value);

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.HIGH_COURT_MODULE.ADD_SUBMIT_URL;
    // this.EDIT_URL = AppConstants.HIGH_COURT_MODULE.EDIT_SUBMIT_URL;

  }
  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  };

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm = () => {
    this.entryForm = this.fb.group({
      id: this.ENTRY_PARAMS.id,
      
      trainingNameEn: [
        this.ENTRY_PARAMS.trainingNameEn,
        Validators.compose([Validators.required]),
      ],
      trainingNameHi: [
        this.ENTRY_PARAMS.trainingNameHi,
        Validators.compose([Validators.required]),
      ],
      
    });

  };
  



  saveBasicDetails(): void {
    
    
    const obj = this.entryForm.value;
    
    
    const controls = this.entryForm.controls;
    
    this.appStore.dispatch(new AppLoadderShow({}));
    
    if (this.entryForm.invalid && !this.entryForm.valid) {
      
      Object.keys(controls).forEach((controlName) => {
        
        var subControlls = (this.entryForm.controls[controlName] as FormGroup)
          .controls;

        if (subControlls)
          Object.keys(subControlls).forEach((subControlName) => {
            
            subControlls[subControlName].markAsTouched();
          });
        else controls[controlName].markAsTouched();
      });
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;
    
    this.apiService
    .apiPostCall(this.ADD_URL, this.entryForm.value, true)
    .subscribe(
      (data) => {
          // console.log("DAta ",JSON.stringify(data,null,2));
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.entryForm.patchValue({
            id: data.dataId,
          });
          
          this.loading = false;

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
      // console.log("after api hit")
  };

  isControlHasError(
    controlName: string,
    validationType: string,
    form: FormGroup,
    subForm?: string
  ): boolean {
    var control = null;

    if (subForm)
      control = (form.controls[subForm] as FormGroup).controls[controlName];
    else control = form.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(
    controlName: string,
    form: FormGroup,
    subForm?: string
  ): boolean {
    var control = null;

    if (subForm)
      control = (form.controls[subForm] as FormGroup).controls[controlName];
    else control = form.controls[controlName];

    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this.localStorage.destroyStoredValue('editData');
    this._location.back();
  }


 
  // ============

 
  
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }


}
