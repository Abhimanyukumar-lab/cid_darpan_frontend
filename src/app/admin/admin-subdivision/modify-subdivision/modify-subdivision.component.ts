import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { District } from 'src/app/models/District';
import { LangModule } from 'src/app/models/LangModule';
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
  selector: 'app-modify-subdivision',
  templateUrl: './modify-subdivision.component.html',
  styleUrls: ['./modify-subdivision.component.scss'],
})
export class ModifySubdivisionComponent implements OnInit, OnDestroy {
  subscription: any;
  subdivision: any;
  loading = false;
  subdivisionForm: UntypedFormGroup;

  ADD_SUBDIVISION: boolean;
  EDIT_SUBDIVISION: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  sdpoList: [];
  language: string;

  RangeList: Range[];
  DistrictList: District[];

  selectedDistrict : District[] = [];

  SUBDIVISION_PARAMS = {
    ID: null,
    rangeId: '',
    districtId: '',
    NAME: '',
    NAMEHI: '',
    DESCRIPTION: '',
    SDPO_ID: null,
    SDPO_NAME: null,
  };

  isCollapsed = true;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule
  ) {
    this.subdivision = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.subdivision) {
      this.SUBDIVISION_PARAMS.ID = this.subdivision.id;
      this.SUBDIVISION_PARAMS.rangeId = this.subdivision.rangeId;
      this.SUBDIVISION_PARAMS.districtId = this.subdivision.districtId;
      this.SUBDIVISION_PARAMS.NAME = this.subdivision.name;
      this.SUBDIVISION_PARAMS.NAMEHI = this.subdivision.nameHi;
      this.SUBDIVISION_PARAMS.DESCRIPTION = this.subdivision.description;
      this.SUBDIVISION_PARAMS.SDPO_ID = this.subdivision.sdpoId;
      this.SUBDIVISION_PARAMS.SDPO_NAME = this.subdivision.sdpoName;
    }

    this.ADD_SUBDIVISION = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SUBDIVISION = this.global.checkForUserButtonPermission(
      AppConstants.SUBDIVISION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SUBDIVISION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SUBDIVISION_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSDPO, false)
      .subscribe((data) => {
        this.sdpoList = data.sdpoDTO;
      });

    this.apiService
    .apiPostCall('getRange',{ stateId: 1 },true)
    .subscribe((data) => {
      this.RangeList = data.rangeDTOs;
    });

    this.apiService
    .apiGetCall('getDistricts',true)
    .subscribe((data) => {
      this.DistrictList = data.districtDTOs;
      // console.log("getDistricts " + JSON.stringify(this.DistrictList,null,2));
      
      this.selectRange();
    });

    
  }

  ngOnInit(): void {
    this.initSubdivisionForm();
  }

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  };
  
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initSubdivisionForm = () => {
    this.subdivisionForm = this.fb.group({
      id: this.SUBDIVISION_PARAMS.ID,
      
      rangeId: [
        this.SUBDIVISION_PARAMS.rangeId,
        Validators.compose([Validators.required]),
      ],
      districtId: [
        this.SUBDIVISION_PARAMS.districtId,
        Validators.compose([Validators.required]),
      ],

      name: [
        this.SUBDIVISION_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
          //  Validators.pattern('^[a-zA-Z0-9 ]+$')
        ]),
      ],
      nameHi: [
        this.SUBDIVISION_PARAMS.NAMEHI,
       Validators.compose([Validators.required]),
        //  Validators.pattern('^[a-zA-Z0-9 ]+$')
      ],
      // description: [
      //   this.SUBDIVISION_PARAMS.DESCRIPTION,
      // ],
      // sdpoId: [
      //   this.SUBDIVISION_PARAMS.SDPO_ID,
      //   Validators.compose([Validators.required]),
      // ],
      // sdpoName: [this.SUBDIVISION_PARAMS.SDPO_NAME],
    });

    this.selectRange();
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.subdivisionForm.controls;
    if (this.subdivisionForm.invalid && !this.subdivisionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.subdivision)
      formData.append('id', this.subdivisionForm.value['id']);
    formData.append('rangeId', this.subdivisionForm.value['rangeId']);
    formData.append('districtId', this.subdivisionForm.value['districtId']);
    formData.append('name', this.subdivisionForm.value['name']);
    formData.append('nameHi', this.subdivisionForm.value['nameHi']);
    // formData.append('description', this.subdivisionForm.value['description']);
    // formData.append('sdpoId', this.subdivisionForm.value['sdpoId']);
    // formData.append('sdpoName', this.subdivisionForm.value['sdpoName']);

    if (this.subdivisionForm.value['id'])
      this.apiService
        .apiFormDataPostCall(this.EDIT_URL, formData, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.goBack();
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    else
      this.apiService
        .apiFormDataPostCall(this.ADD_URL, formData, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.goBack();
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.subdivisionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.subdivisionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // validAplpha(event) {
  //   const charCode = event.which ? event.which : event.KeyCode;

  //   if (
  //     (charCode >= 65 && charCode <= 90) ||
  //     (charCode >= 97 && charCode <= 122) ||
  //     charCode == 32
  //   ) {
  //     return true;
  //   } else return false;
  // }


validAplpha(event: KeyboardEvent) {
  const charCode = event.key.charCodeAt(0);
  // Allow A-Z, a-z, 0-9 and space (charCode 32)
  if (
    !(charCode >= 48 && charCode <= 57) &&  // 0-9
    !(charCode >= 65 && charCode <= 90) &&  // A-Z
    !(charCode >= 97 && charCode <= 122) && // a-z
    charCode !== 32                         // space
  ) {
    event.preventDefault();
  }
}



  focusOut = (event, name) => {
    this.subdivisionForm.patchValue({
      [name]: event.target.value,
    });
  };

  selectRange = () => {
    var rangeID = this.subdivisionForm.value['rangeId'];
    if (rangeID)
      this.selectedDistrict = this.DistrictList?.filter(
        (a) => a.rangeId == rangeID
      );

      // console.log("selectRange " + JSON.stringify(this.selectedDistrict,null,2));
  };
  
}
