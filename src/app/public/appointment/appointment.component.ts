import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
import { TranslateService } from 'src/app/services/translate.service';

const APP = {
  id: null,
  districtId: null,
  districtName: null,
  name: null,
  shift: null,
  stationId: null,
  stationName: null,
  mobileNo: null,
  appDate: null,
  purpose: null,
  address: null,
  otpUser: null,
  sendOTP: null,
  verifyOTO: null,
  otherDistrict: null,
  otherPoliceStation: null,
  document: null,
};

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit, OnDestroy {
  subscription: any;
  //Check Status Variable

  currrentLang: string;
  appointmentCheckStatusGroup: UntypedFormGroup;
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
  isCompleted: boolean = false;

  min: Date = new Date();

  currentYear = this.min.getFullYear();
  currentMonth = this.min.getMonth();
  currentDay = this.min.getDate() + 1;
  currentTime = this.min.getHours();

  isOtherDistrict: boolean = false;
  isVerifyOtp: boolean = false;

  isTenToTwelve: boolean = false;
  isTwelveToTwo: boolean = false;
  isTwoToFour: boolean = false;
  isFourToSix: boolean = false;

  showshift10to12: boolean = false;
  showshift12to02: boolean = false;
  showshift02to04: boolean = false;
  showshift04to06: boolean = false;

  isDisabled: boolean = false;

  APPOINTMENT_MSG_EN: string;
  APPOINTMENT_MSG_HI: string;

  appForm: UntypedFormGroup;
  constructor(
    private appStore: Store<{ app: any }>,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    public langModule: LangModule,
    private apiCaller: ApiCallerService,
    private toaster: ToasterService,
    private modelService: ModelService
  ) {
    this.min.setDate(this.min.getDate() + 1);

    this.initAppForm();
    this.initCheckStatusForm();

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currrentLang = data.defaultLang;
    });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.DISTRICTSFETCH, false)
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
      id: [APP.id],
      stationId: [APP.stationId],
      districtId: [APP.districtId, Validators.compose([Validators.required])],
      name: [
        APP.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      shift: [APP.shift, Validators.compose([Validators.required])],
      mobileNo: [
        APP.mobileNo,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],

      appDate: [APP.appDate, Validators.compose([Validators.required])],
      purpose: [
        APP.purpose,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ]),
      ],
      address: [APP.address, Validators.compose([Validators.required])],
      verifyOTP: [APP.verifyOTO],
      otherDistrict: [APP.otherDistrict],
      otherStationName: [APP.otherPoliceStation],
      otpUser: [APP.otpUser],
      document: [APP.document],
    });
  }

  isControlHasErrors = (name: string) => {
    return this.global.isControlHasErrors(this.appForm, name);
  };

  isControlHasError = (name: string, methode: string) => {
    return this.global.isControlHasError(this.appForm, name, methode);
  };

  doCheckDistrict = (value) => {
    var district = value.options[value.selectedIndex].text;
    if (district == 'Other' || district == 'अन्य') {
      this.isOtherDistrict = true;
      this.appForm.patchValue({ stationId: null });
    } else {
      this.isOtherDistrict = false;
      this.appForm.patchValue({
        otherDistrict: null,
        otherPoliceStation: null,
      });
    }
  };

  doCkeckTodayDate = (event: any) => {
    var today: Date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    var date = new Date(this.appForm.value['appDate']);
    var shift = this.currentTime;
    if (date.getDate() == today.getDate()) {
      if (shift <= 8) {
        this.showshift10to12 = true;
        this.showshift12to02 = true;
        this.showshift02to04 = true;
        this.showshift04to06 = true;
      } else if (shift >= 8 && shift <= 10) {
        this.showshift10to12 = false;
        this.showshift12to02 = true;
        this.showshift02to04 = true;
        this.showshift04to06 = true;
      } else if (shift >= 10 && shift <= 12) {
        this.showshift10to12 = false;
        this.showshift12to02 = false;
        this.showshift02to04 = true;
        this.showshift04to06 = true;
      } else if (shift >= 12 && shift <= 14) {
        this.showshift10to12 = false;
        this.showshift12to02 = false;
        this.showshift02to04 = false;
        this.showshift04to06 = true;
      } else if (shift > 14) {
        this.showshift10to12 = false;
        this.showshift12to02 = false;
        this.showshift02to04 = false;
        this.showshift04to06 = false;
      }
    } else {
      this.showshift10to12 = true;
      this.showshift12to02 = true;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    }
  };

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

  doSendOTP = () => {
    var data = this.appForm.value;

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.appForm.controls;
    if (this.appForm.invalid && !this.appForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.appForm.enable();
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    var name = this.appForm.value['name'];
    var mobile = this.appForm.value['mobileNo'];
    if (mobile != null && name != null) {
      this.appForm.disable();
    }

    this.appForm.controls.verifyOTP.enable();
    this.isVerifyOtp = true;

    data['language'] = this.currrentLang;

    var formData = new FormData();

    if (data['id']) formData.append('id', data['id']);
    if (data['stationId']) formData.append('stationId', data['stationId']);
    formData.append('districtId', data['districtId']);
    formData.append('name', data['name']);
    formData.append('shift', data['shift']);
    formData.append('mobileNo', data['mobileNo']);
    formData.append('appDate', data['appDate']);
    formData.append('purpose', data['purpose']);
    formData.append('address', data['address']);
    formData.append('verifyOTP', data['verifyOTP']);
    formData.append('otherDistrict', data['otherDistrict']);
    formData.append('otherStationName', data['otherStationName']);
    formData.append('otpUser', data['otpUser']);
    formData.append('language', this.currrentLang);
    if (this.document) {
      formData.append('document', this.document, this.document.name);
      this.document = null;
    }

    this.apiCaller
      .apiFormDataPostCall(
        AppConstants.PUBLIC_APIS.APPOINTMENTADD,
        formData,
        false
      )
      .subscribe((data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
        this.isVerifyOtp = true;
        this.appForm.patchValue({
          id: data.id,
        });
      });
  };

  doVerifyOTP = () => {
    this.appForm.enable();
    var data = this.appForm.value;

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.appForm.controls;
    if (this.appForm.invalid && !this.appForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    if (!data.verifyOTP) {
      Object.keys(controls).forEach((controlName) => {
        if (controlName != 'verifyOTP') {
          controls[controlName].disable();
        }
      });

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    } else {
      this.appForm.disable();
    }

    var formData = new FormData();

    if (data['id']) formData.append('id', data['id']);
    if (data['stationId']) formData.append('stationId', data['stationId']);
    formData.append('districtId', data['districtId']);
    formData.append('name', data['name']);
    formData.append('shift', data['shift']);
    formData.append('mobileNo', data['mobileNo']);
    formData.append('appDate', data['appDate']);
    formData.append('purpose', data['purpose']);
    formData.append('address', data['address']);
    formData.append('verifyOTP', data['verifyOTP']);
    formData.append('otherDistrict', data['otherDistrict']);
    formData.append('otherStationName', data['otherStationName']);
    formData.append('otpUser', data['otpUser']);
    formData.append('language', this.currrentLang);
    if (this.document) {
      formData.append('document', this.document, this.document.name);
      this.document = null;
    }

    this.apiCaller
      .apiFormDataPostCall(
        AppConstants.PUBLIC_APIS.APPOINTMENTADD,
        formData,
        false
      )
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            4000,
            'top-end'
          );

          this.APP_ID = data.srNo;

          this.APPOINTMENT_MSG_EN = `Your appointment has been scheduled. Ones the appointment is Confirmed you will get notified! Your Appointment ID is ${this.APP_ID}`;
          this.APPOINTMENT_MSG_HI = `आपकी अपॉइंटमेंट निर्धारित कर ली गई है। अपॉइंटमेंट की पुष्टि होने पर आपको सूचित किया जाएगा! आपकी अपॉइंटमेंट आईडी है : ${this.APP_ID}`;

          this.isCompleted = true;
          this.isVerifyOtp = false;
          this.appForm.reset();
          this.appForm.enable();
        },
        (error) => {
          this.appStore.dispatch(new AppLoadderHide({}));
          this.appForm.disable();
          this.appForm.controls['verifyOTP'].enable();
        }
      );
  };

  //Check Status

  initCheckStatusForm = () => {
    this.appointmentCheckStatusGroup = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
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
    const controls = this.appointmentCheckStatusGroup.controls;
    if (
      this.appointmentCheckStatusGroup.invalid &&
      !this.appointmentCheckStatusGroup.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'Appointment Id is Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.APPOINTMENT_CHECKSTATUS,
        this.appointmentCheckStatusGroup.value,
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

          this.appointmentCheckStatusGroup.reset();
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
    this.appointmentCheckStatusGroup.reset();
  };

  focusOut = (event, name) => {
    this.appForm.patchValue({
      [name]: event.target.value,
    });
  };

  document: File = null;
  handleInvoiceChange = (file: FileList) => {
    this.document = file.item(0);
  };
}
