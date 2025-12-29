import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LangModule } from 'src/app/models/LangModule';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

import { select, Store } from '@ngrx/store';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { ModelService } from 'src/app/common/popup/model.service';

const APP = {
  id: null,
  passportType: null,
  dob: null,
  applicationId: null,
  name: null,
  email: null,
  mobileNo: null,
  stationId: null,
  stationName: null,
  districtId: null,
  districtName: null,
  comments: null,
};

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss'],
})
export class PassportComponent implements OnInit, OnDestroy {
  subscription: any;
  //Check Status Variable

  passportCheckStatusGroup: UntypedFormGroup;
  isOtp: boolean = false;
  showData: boolean = false;
  errorMsg: string = '';
  alertType: string = '';

  srNo: string = '';
  name: string = '';
  appliedDate: string = '';
  dataStatus: string = '';
  appDate: string = '';
  appShift: string = '';
  dataMessage: string = '';

  //Check Status Variable End

  districtList: any[];
  stationList: any[];

  APP_ID: string = '';
  PASS_TYPE: string = '';
  currrentLang: string;
  isCompleted: boolean = false;
  isError: boolean = false;
  myDate = new Date();
  passport: any;
  loading = false;
  max: Date = new Date();
  currentYear = this.max.getFullYear();
  currentMonth = this.max.getMonth();
  currentDay = this.max.getDate();
  currentTime = this.max.getHours();

  PASSPORT_MSG_EN: string;
  PASSPORT_MSG_HI: string;
  PASSPORT_ERROR_MSG_EN: string;
  PASSPORT_ERROR_MSG_HI: string;
  appForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    public langModule: LangModule,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private modelService: ModelService
  ) {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });

    this.initAppForm();
    this.initCheckStatusForm();

    // this.apiCaller
    //   .apiPostCall(
    //     AppConstants.PUBLIC_APIS.OPTIONSFETCH,
    //     { formId: 'public_passport_type' },
    //     false
    //   )
    //   .subscribe((data) => {
    //     this.passTypesList = data.optionsDTO;
    //   });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.ONLYDISTFETCH, false)
      .subscribe((data) => {
        this.districtList = data.districtDTOs;
      });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.STATIONSFETCH, false)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  initAppForm() {
    this.appForm = this.fb.group({
      passportType: [
        APP.passportType,
        Validators.compose([Validators.required]),
      ],
      dob: [APP.dob, Validators.compose([Validators.required])],
      applicationId: [
        APP.applicationId,
        Validators.compose([Validators.required]),
      ],
      name: [APP.name, Validators.compose([Validators.required])],
      email: [
        APP.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      mobileNo: [
        APP.mobileNo,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      stationId: [APP.stationId, Validators.compose([Validators.required])],
      districtId: [APP.districtId, Validators.compose([Validators.required])],
      comments: [APP.comments, Validators.compose([Validators.required])],
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validAplpha(event) {
    const charCode = event.which ? event.which : event.KeyCode;

    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode == 32
    ) {
      return true;
    } else return false;
  }

  openStatusPopup = () => {};

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.appForm.controls;
    if (this.appForm.invalid && !this.appForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    var data = this.appForm.value;
    data['language'] = this.currrentLang;

    this.apiCaller
      .apiPostCall(AppConstants.PUBLIC_APIS.PASSPORTADD, data, false)
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            4000,
            'top-end'
          );

          this.APP_ID = data.id;
          this.PASS_TYPE = data.srNo;
          this.PASSPORT_MSG_EN = `Your  ${this.PASS_TYPE} Complaint Request successfully registered. Your ${this.PASS_TYPE} Complaint Id Number : ${this.APP_ID}/${this.currentYear}`;
          this.PASSPORT_MSG_HI = `आपका ${this.PASS_TYPE} संबंधित शिकायत अनुरोध सफलतापूर्वक पंजीकृत कर ली गई है। आपका ${this.PASS_TYPE} संबंधित शिकायत क्रमांक संख्या है : ${this.APP_ID}/${this.currentYear}`;

          this.isCompleted = true;
          this.isError = false;
          this.appForm.reset();
        },
        (error) => {
          this.isError = true;
          this.PASSPORT_ERROR_MSG_EN = error.message;
          this.PASSPORT_ERROR_MSG_HI = error.message;

          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  isControlHasErrors = (name: string) => {
    return this.global.isControlHasErrors(this.appForm, name);
  };

  isControlHasError = (name: string, methode: string) => {
    return this.global.isControlHasError(this.appForm, name, methode);
  };

  //Check Status

  initCheckStatusForm = () => {
    this.passportCheckStatusGroup = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      otp: '',
    });
  };

  openModal = (id: string) => {
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.closeAlert();
    this.modelService.close(id);
  };

  submitData = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.passportCheckStatusGroup.controls;
    if (
      this.passportCheckStatusGroup.invalid &&
      !this.passportCheckStatusGroup.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'Character Id and Mobile No both are Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.PASSPORT_OTP_CHECKSTATUS,
        this.passportCheckStatusGroup.value,
        false,
        false,
        false
      )
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;

          this.passportCheckStatusGroup.controls['id'].disable();
          this.passportCheckStatusGroup.controls['mobile'].disable();

          this.isOtp = true;
          this.passportCheckStatusGroup.controls['otp'].patchValue(
            '',
            Validators.compose([Validators.required])
          );

          this.showData = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        },
        (error) => {
          this.alertType = 'danger';
          this.errorMsg = error.message;
          this.srNo = '';
          this.name = '';
          this.appliedDate = '';
          this.dataStatus = '';
          this.appDate = '';
          this.appShift = '';
          this.dataMessage = '';
          this.showData = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  submitOTPData = () => {
    this.passportCheckStatusGroup.controls['id'].enable();
    this.passportCheckStatusGroup.controls['mobile'].enable();
    var data = this.passportCheckStatusGroup.value;
    this.passportCheckStatusGroup.controls['id'].disable();
    this.passportCheckStatusGroup.controls['mobile'].disable();

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.passportCheckStatusGroup.controls;
    if (
      this.passportCheckStatusGroup.invalid &&
      !this.passportCheckStatusGroup.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'OTP is Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.PASSPORT_CHECKSTATUS,
        data,
        false,
        false,
        false
      )
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;
          this.srNo = data.srNo;
          this.name = data.name;
          this.appliedDate = data.appliedDate;
          this.dataStatus = data.dataStatus;
          this.appDate = data.appDate;
          this.appShift = data.appShift;
          this.dataMessage = data.dataMessage;

          this.showData = true;
          this.isOtp = false;

          this.passportCheckStatusGroup.controls['id'].enable();
          this.passportCheckStatusGroup.controls['mobile'].enable();
          this.initCheckStatusForm();
          this.appStore.dispatch(new AppLoadderHide({}));
        },
        (error) => {
          this.alertType = 'danger';
          this.errorMsg = error.message;
          this.srNo = '';
          this.name = '';
          this.appliedDate = '';
          this.dataStatus = '';
          this.appDate = '';
          this.appShift = '';
          this.dataMessage = '';
          this.showData = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  closeAlert = () => {
    this.errorMsg = '';
    this.alertType = '';
    this.srNo = '';
    this.name = '';
    this.appliedDate = '';
    this.dataStatus = '';
    this.appDate = '';
    this.appShift = '';
    this.dataMessage = '';
    this.showData = false;

    this.passportCheckStatusGroup.controls['id'].enable();
    this.passportCheckStatusGroup.controls['mobile'].enable();
    this.passportCheckStatusGroup.reset();
  };

  focusOut = (event, name) => {
    this.appForm.patchValue({
      [name]: event.target.value,
    });
  };
}
