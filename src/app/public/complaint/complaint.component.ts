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
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ModelService } from 'src/app/common/popup/model.service';
import { Complaint } from 'src/app/models/Complaint';

const APP = {
  id: null,
  stationId: null,
  stationName: null,
  complaintSubject: null,
  complaintDate: null,
  complaintImage: null,
  complaintType: null,
  complaintArea: null,
  complaintComment: null,

  citizenName: null,
  citizenEmail: null,
  citizenMobile: null,
  citizenAddress: null,
  citizenAddress1: null,
  districtId: null,
  districtName: null,
  otherDistrictName: null,
};
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss'],
})
export class ComplaintComponent implements OnInit, OnDestroy {
  subscription: any;
  //Check Status Variable

  complaintCheckStatusGroup: UntypedFormGroup;
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
  currrentLang: string;
  isCompleted: boolean = false;

  complaint: any;
  loading = false;
  complaintImage: File = null;

  isOtherDistrict: boolean = false;
  isCaseNumber: boolean = false;
  isNamuberFormat: boolean = false;
  isError: boolean = false;

  max: Date = new Date();
  thisYear = this.max.getFullYear();

  CHARACTER_MSG_EN: string;
  CHARACTER_MSG_HI: string;

  baseUrl: string = AppConstants.backServer;
  complaints: Complaint;

  CHARACTER_ERROR_MSG_EN: string;
  CHARACTER_ERROR_MSG_HI: string;
  appForm: UntypedFormGroup;
  constructor(
    private appStore: Store<{ app: any }>,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private localStorage: LocalstorageService,
    public langModule: LangModule,
    private apiCaller: ApiCallerService,
    private toaster: ToasterService,
    private modelService: ModelService
  ) {
    this.complaint = this.localStorage.getStoredValue('editData');
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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initAppForm() {
    this.appForm = this.fb.group({
      id: [APP.id],
      stationId: [APP.stationId, Validators.compose([Validators.required])],
      complaintSubject: [
        APP.complaintSubject,
        Validators.compose([Validators.required]),
      ],
      complaintDate: [
        APP.complaintDate,
        Validators.compose([Validators.required]),
      ],
      complaintImage: [APP.complaintImage],
      complaintType: [
        APP.complaintType,
        Validators.compose([Validators.required]),
      ],
      complaintArea: [APP.complaintArea],
      complaintComment: [
        APP.complaintComment,
        Validators.compose([Validators.required]),
      ],
      citizenName: [APP.citizenName, Validators.compose([Validators.required])],
      citizenEmail: [
        APP.citizenEmail,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
      citizenMobile: [
        APP.citizenMobile,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      citizenAddress: [
        APP.citizenAddress,
        Validators.compose([Validators.required]),
      ],
      citizenAddress1: [
        APP.citizenAddress1,
        Validators.compose([Validators.required]),
      ],
      districtId: [APP.districtId, Validators.compose([Validators.required])],
      otherDistrictName: [APP.otherDistrictName],
    });
  }

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

    var formData = new FormData();

    if (this.appForm)
      formData.append('stationId', this.appForm.value['stationId']);
    formData.append('complaintSubject', this.appForm.value['complaintSubject']);

    var date: any[] = this.appForm.value['complaintDate'].split('-');

    formData.append(
      'complaintDate',
      `${date[0]}-${date[1]}-${date[2]}T00:00:00.000`
    );

    formData.append('complaintType', this.appForm.value['complaintType']);
    formData.append('complaintComment', this.appForm.value['complaintComment']);
    if (this.appForm.value['complaintArea']) {
      var year = this.appForm.value['complaintArea'].split('/');
      if (year > this.thisYear) {
        // this.isNamuberFormat = true;
        return false;
      }
      formData.append('complaintArea', this.appForm.value['complaintArea']);
    }
    formData.append('citizenName', this.appForm.value['citizenName']);
    formData.append('citizenMobile', this.appForm.value['citizenMobile']);
    formData.append('citizenEmail', this.appForm.value['citizenEmail']);
    formData.append('citizenAddress', this.appForm.value['citizenAddress']);
    formData.append('districtId', this.appForm.value['districtId']);
    formData.append('citizenAddress1', this.appForm.value['citizenAddress1']);
    if (this.appForm.value['otherDistrictName'])
      formData.append('oherDistrName', this.appForm.value['otherDistrictName']);

    if (this.complaintImage) {
      formData.append(
        'complaintImage',
        this.complaintImage,
        this.complaintImage.name
      );
    }

    this.apiCaller
      .apiFormDataPostCall(
        AppConstants.PUBLIC_APIS.COMPLAINTADD,
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

          this.APP_ID = data.id;
          this.CHARACTER_MSG_EN = `Your complaint successfully registered. Your Complaint Id Number : ${this.APP_ID}/${this.thisYear}`;
          this.CHARACTER_MSG_HI = `आपका शिकायत सफलतापूर्वक दर्ज कर ली गई है । आपका शिकायत क्रमांक संख्या है : ${this.APP_ID}/${this.thisYear}`;

          this.isCompleted = true;
          this.isError = false;
          this.appForm.reset();
          this.isOtherDistrict = false;
          this.isCaseNumber = false;
        },
        (error) => {
          this.isError = true;
          this.CHARACTER_ERROR_MSG_EN = error.message;
          this.CHARACTER_ERROR_MSG_HI = error.message;

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

  handleInvoiceChange = (file: FileList) => {
    this.complaintImage = file.item(0);
  };

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 47 || charCode > 57)) {
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

  doCheckDistrict = (value) => {
    var district = value.options[value.selectedIndex].text;
    if (district == 'Other' || district == 'अन्य') {
      this.isOtherDistrict = true;
    } else {
      this.isOtherDistrict = false;
      this.appForm.patchValue({
        otherDistrictName: null,
      });
    }
  };

  doCheckComplaintType = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Case Related' || type == 'कांड संबंधित') {
      this.isCaseNumber = true;
    } else {
      this.isCaseNumber = false;
      this.appForm.patchValue({
        compalintArea: null,
      });
    }
  };

  //Check Status

  initCheckStatusForm = () => {
    this.complaintCheckStatusGroup = this.fb.group({
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
    const controls = this.complaintCheckStatusGroup.controls;
    if (
      this.complaintCheckStatusGroup.invalid &&
      !this.complaintCheckStatusGroup.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'Complaint Id and Mobile No both are Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.COMPLAINT_OTP_CHECKSTATUS,
        this.complaintCheckStatusGroup.value,
        false,
        false,
        false
      )
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;

          this.complaintCheckStatusGroup.controls['id'].disable();
          this.complaintCheckStatusGroup.controls['mobile'].disable();

          this.isOtp = true;
          this.complaintCheckStatusGroup.controls['otp'].patchValue(
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
    this.complaintCheckStatusGroup.controls['id'].enable();
    this.complaintCheckStatusGroup.controls['mobile'].enable();
    var data = this.complaintCheckStatusGroup.value;
    this.complaintCheckStatusGroup.controls['id'].disable();
    this.complaintCheckStatusGroup.controls['mobile'].disable();

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.complaintCheckStatusGroup.controls;
    if (
      this.complaintCheckStatusGroup.invalid &&
      !this.complaintCheckStatusGroup.valid
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
        AppConstants.PUBLIC_APIS.COMPLAINT_CHECKSTATUS,
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

          this.complaintCheckStatusGroup.controls['id'].enable();
          this.complaintCheckStatusGroup.controls['mobile'].enable();
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

    this.complaintCheckStatusGroup.controls['id'].enable();
    this.complaintCheckStatusGroup.controls['mobile'].enable();
    this.complaintCheckStatusGroup.reset();
  };

  focusOut = (event, name) => {
    this.appForm.patchValue({
      [name]: event.target.value,
    });
  };
}
