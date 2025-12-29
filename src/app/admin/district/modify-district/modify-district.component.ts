import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AppLoadderShow, AppLoadderHide } from 'src/app/storage/actions/app.actions';

@Component({
  selector: 'app-modify-district',
  templateUrl: './modify-district.component.html',
  styleUrls: ['./modify-district.component.scss']
})
export class ModifyDistrictComponent implements OnInit, OnDestroy {
  
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

  
  StateList: any[];
  RangeList: any[];

  ENTRY_PARAMS = {
    
    id: null,
    stateId: null,
    rangeId: null,
    district_name: null,
    districtNameHi: null,
    

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
      
    this.apiService
    .apiGetCall('getStates', true)
    .subscribe((data) => {
      this.StateList = data.stateDTOs;
    });

    // this.apiService
    // .apiPostCall('getRange',{ stateId: this.entryForm.value['stateId'] },true)
    // .subscribe((data) => {
    //   this.RangeList = data.rangeDTOs;
    // });

    if (this.entry) {
        
        this.ENTRY_PARAMS.id = this.entry.id;
        this.ENTRY_PARAMS.stateId = 1;
        this.ENTRY_PARAMS.rangeId = this.entry.rangeId;
        this.ENTRY_PARAMS.district_name = this.entry.districtName;
        this.ENTRY_PARAMS.districtNameHi = this.entry.districtNameHi;
        

    }
    
    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      'ADDAPI'
    );
    // this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
    //   AppConstants.SR_NSR_CASES_MODULE.EDIT_SUBMIT_DATA
    // );

    this.ADD_URL = 'addDistrict';
    // this.EDIT_URL = 'editRange';

  }
  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  };

  ngOnInit(): void {
    this.initiateForm();
    this.changeRangeData(1);
  }

  initiateForm = () => {
    this.entryForm = this.fb.group({
      id: this.ENTRY_PARAMS.id,
      
      stateId: [
        this.ENTRY_PARAMS.stateId,
      ],
      
      rangeId: [
        this.ENTRY_PARAMS.rangeId,
        Validators.compose([Validators.required]),
      ],
      district_name: [
        this.ENTRY_PARAMS.district_name,
        Validators.compose([Validators.required]),
      ],
      districtNameHi: [
        this.ENTRY_PARAMS.districtNameHi,
      ],
      
    });

  };
  

  changeRangeData = (value) => {
    // console.log("value  "+value);
    // console.log("this.entryForm.value['stateId'] " + this.entryForm.value['stateId'] );
    
    this.apiService
    .apiPostCall('getRange',{ stateId: this.entryForm.value['stateId'] },true)
    .subscribe((data) => {
      this.RangeList = data.rangeDTOs;
    });
  }

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
console.log(this.entryForm.value['districtNameHi']);
    
    var formData = new FormData();

    if (this.entry) formData.append('id', this.entryForm.value['id']);
    formData.append('rangeId', this.entryForm.value['rangeId']);
    formData.append('district_name', this.entryForm.value['district_name']);
    formData.append('districtNameHi', this.entryForm.value['districtNameHi']);

    this.apiService
    .apiFormDataPostCall(this.ADD_URL, formData, true)
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
          this.localStorage.destroyStoredValue('editData');
          this._location.back();

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

  focusOut = (event, name) => {
    this.entryForm.patchValue({
      [name]: event.target.value,
    });
  };

}
