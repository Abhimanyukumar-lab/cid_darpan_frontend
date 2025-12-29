import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CircleInspector } from 'src/app/models/CircleInspector';
import { District } from 'src/app/models/District';
import { LangModule } from 'src/app/models/LangModule';
import { Subdivision } from 'src/app/models/Subdivision';
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
  selector: 'app-modify-circle-inspector',
  templateUrl: './modify-circle-inspector.component.html',
  styleUrls: ['./modify-circle-inspector.component.scss'],
})
export class ModifyCircleInspectorComponent implements OnInit, OnDestroy {
  subscription: any;
  circleInspector: any;
  loading = false;
  circleInspectorForm: UntypedFormGroup;


  ADD_CIRCLE_INSPECTOR: boolean;
  EDIT_CIRCLE_INSPECTOR: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  max: Date = new Date();
  HEAD_IMAGE: File = null;
  language: string;
  designationList: string;

  CIRCLE_INSPECTOR_PARAMS = {
    ID: null,
    rangeId: null,
    districtId: null,
    SUBDIVISION_ID: null,
    SUBDIVISION_NAME: null,
    DESIGNATION_ID: null,
    DESIGNATION: '',
    NAME: '',
    NAMEHI: '',
    OFFICER_NAME: '',
    OFFICER_NAMEHI: '',
    CONTACT_NO: '',
    MOBILE_NO: '',
    EMAIL: '',
    JOIN_DATE: '',
    ADDRESS: '',
    HEAD_IMAGE: '',
    PRIORITY: '',
  };

  isCollapsed = true;
  
  RangeList: Range[];
  DistrictList: District[];
  SubDivisionList: Subdivision[];
  circleInspectorList: CircleInspector[];
  
  selectedDistrict : District[] = [];
  selectedSubDivisoin : Subdivision[] = [];
  selectedCircle: CircleInspector[] = [];

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
    this.circleInspector = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    if (this.circleInspector) {
      this.CIRCLE_INSPECTOR_PARAMS.ID = this.circleInspector.id;
      this.CIRCLE_INSPECTOR_PARAMS.NAME = this.circleInspector.circleName;
      this.CIRCLE_INSPECTOR_PARAMS.NAMEHI = this.circleInspector.circleNameHi;
      this.CIRCLE_INSPECTOR_PARAMS.OFFICER_NAME =
        this.circleInspector.circleOfficerName;
      this.CIRCLE_INSPECTOR_PARAMS.OFFICER_NAMEHI =
        this.circleInspector.circleOfficerNameHi;
      this.CIRCLE_INSPECTOR_PARAMS.rangeId =
        this.circleInspector.rangeId;
      this.CIRCLE_INSPECTOR_PARAMS.districtId =
        this.circleInspector.districtId;
      this.CIRCLE_INSPECTOR_PARAMS.SUBDIVISION_ID =
        this.circleInspector.subdivisionId;
      this.CIRCLE_INSPECTOR_PARAMS.SUBDIVISION_NAME =
        this.circleInspector.subdivisionName;
      this.CIRCLE_INSPECTOR_PARAMS.DESIGNATION_ID =
        this.circleInspector.designationId;
      this.CIRCLE_INSPECTOR_PARAMS.DESIGNATION =
        this.circleInspector.designationName;
      this.CIRCLE_INSPECTOR_PARAMS.CONTACT_NO =
        this.circleInspector.circleContact;
      this.CIRCLE_INSPECTOR_PARAMS.MOBILE_NO =
        this.circleInspector.circleMobile;
      this.CIRCLE_INSPECTOR_PARAMS.EMAIL = this.circleInspector.circleEmail;
      // this.CIRCLE_INSPECTOR_PARAMS.ADDRESS = this.circleInspector.circleAddress;
      this.CIRCLE_INSPECTOR_PARAMS.PRIORITY = this.circleInspector.priority;
      this.CIRCLE_INSPECTOR_PARAMS.JOIN_DATE = this.circleInspector.joiningDate;
    }

    this.ADD_CIRCLE_INSPECTOR = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_CIRCLE_INSPECTOR = this.global.checkForUserButtonPermission(
      AppConstants.CIRCLE_INSPECTOR_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.CIRCLE_INSPECTOR_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.CIRCLE_INSPECTOR_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSUBDIVISION, true)
      .subscribe((data) => {
        this.SubDivisionList = data.subdivisionDTOs;
        this.selectDistrict();
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
        this.selectRange();
      });
    
  }

  ngOnInit(): void {
    this.initSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  };

  initSectionForm = () => {
    this.circleInspectorForm = this.fb.group({
      id: this.CIRCLE_INSPECTOR_PARAMS.ID,
      rangeId: [
        this.CIRCLE_INSPECTOR_PARAMS.rangeId,
        Validators.compose([Validators.required]),
      ],
      districtId: [
        this.CIRCLE_INSPECTOR_PARAMS.districtId,
        Validators.compose([Validators.required]),
      ],
      subdivisionId: [
        this.CIRCLE_INSPECTOR_PARAMS.SUBDIVISION_ID,
        Validators.compose([Validators.required]),
      ],
      designationId: [
        this.CIRCLE_INSPECTOR_PARAMS.DESIGNATION_ID,
      ],
      circleOfficerName: [
        this.CIRCLE_INSPECTOR_PARAMS.OFFICER_NAME,
      ],
      circleName: [
        this.CIRCLE_INSPECTOR_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      circleOfficerNameHi: [
        this.CIRCLE_INSPECTOR_PARAMS.OFFICER_NAMEHI,
      ],
      circleNameHi: [
        this.CIRCLE_INSPECTOR_PARAMS.NAMEHI,
        Validators.compose([Validators.required]),
      ],
      circleContact: [this.CIRCLE_INSPECTOR_PARAMS.CONTACT_NO],
      circleMobile: [
        this.CIRCLE_INSPECTOR_PARAMS.MOBILE_NO,
      ],
      joiningDate: [
        this.CIRCLE_INSPECTOR_PARAMS.JOIN_DATE,
      ],
      circleEmail: [this.CIRCLE_INSPECTOR_PARAMS.EMAIL],

      circleImageSource: [this.CIRCLE_INSPECTOR_PARAMS.HEAD_IMAGE],
      // circleAddress: [
      //   this.CIRCLE_INSPECTOR_PARAMS.ADDRESS,
      //   Validators.compose([Validators.required]),
      // ],
      priority: [
        this.CIRCLE_INSPECTOR_PARAMS.PRIORITY,
      ],
    });

    this.selectRange();
    this.selectDistrict();
    
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.circleInspectorForm.controls;
    if (this.circleInspectorForm.invalid && !this.circleInspectorForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.circleInspector)
      formData.append('id', this.circleInspectorForm.value['id']);
    formData.append('circleName', this.circleInspectorForm.value['circleName']);
    formData.append('circleNameHi', this.circleInspectorForm.value['circleNameHi']);
    formData.append(
      'rangeId',
      this.circleInspectorForm.value['rangeId']
    );
    formData.append(
      'districtId',
      this.circleInspectorForm.value['districtId']
    );
    formData.append(
      'subdivisionId',
      this.circleInspectorForm.value['subdivisionId']
    );
    formData.append(
      'subdivisionName',
      this.circleInspectorForm.value['subdivisionName']
    );
    // formData.append(
    //   'designationId',
    //   this.circleInspectorForm.value['designationId']
    // );
    // formData.append(
    //   'designationName',
    //   this.circleInspectorForm.value['designationName']
    // );
    // formData.append(
    //   'circleOfficerName',
    //   this.circleInspectorForm.value['circleOfficerName']
    // );
    // formData.append(
    //   'circleOfficerNameHi',
    //   this.circleInspectorForm.value['circleOfficerNameHi']
    // );
    // formData.append(
    //   'circleContact',
    //   this.circleInspectorForm.value['circleContact']
    // );
    // formData.append(
    //   'circleMobile',
    //   this.circleInspectorForm.value['circleMobile']
    // );
    // formData.append(
    //   'circleEmail',
    //   this.circleInspectorForm.value['circleEmail']
    // );
    // formData.append(
    //   'circleAddress',
    //   this.circleInspectorForm.value['circleAddress']
    // );
    // formData.append('priority', this.circleInspectorForm.value['priority']);
    // formData.append(
    //   'joiningDate',
    //   this.circleInspectorForm.value['joiningDate']
    // );
    formData.append('language', this.language);

    if (this.HEAD_IMAGE) {
      formData.append(
        'circleImageSource',
        this.HEAD_IMAGE,
        this.HEAD_IMAGE.name
      );
    }

    if (this.circleInspectorForm.value['id'])
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
    const control = this.circleInspectorForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.circleInspectorForm.controls[controlName];
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


  handleFileChange = (file: FileList) => {
    this.HEAD_IMAGE = file.item(0);
  };

  focusOut = (event, name) => {
    this.circleInspectorForm.patchValue({
      [name]: event.target.value,
    });
  };
  
  selectRange = () => {
    var rangeID = this.circleInspectorForm.value['rangeId'];
    if (rangeID)
      this.selectedDistrict = this.DistrictList?.filter(
        (a) => a.rangeId == rangeID
      );
  };

  selectDistrict = () => {
    var districtID = this.circleInspectorForm.value['districtId'];
    if (districtID)
      this.selectedSubDivisoin = this.SubDivisionList?.filter(
        (a) => a.districtId == districtID
      );
      // console.log("selectDistrict " +JSON.stringify(this.selectedSubDivisoin,null,2));
      
  };
}
