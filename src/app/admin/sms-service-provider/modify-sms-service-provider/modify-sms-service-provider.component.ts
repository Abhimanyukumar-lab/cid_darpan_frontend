import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { Options } from 'src/app/models/Options';
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
  selector: 'app-modify-sms-service-provider',
  templateUrl: './modify-sms-service-provider.component.html',
  styleUrls: ['./modify-sms-service-provider.component.scss'],
})
export class ModifySmsServiceProviderComponent implements OnInit, OnDestroy {
  subscription: any;
  smsServiceProvider: any;
  loading = false;
  smsServiceProviderForm: UntypedFormGroup;

  ADD_SMS_PROV: boolean;
  EDIT_SMS_PROV: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;
  requestList: Options[];
  responseList: Options[];

  SMS_PROV_PARAMS = {
    ID: null,
    NAME: '',
    APIKEY: '',
    APIURL: '',
    NOOFSMS: '',
    CHECK_STATUS_API: '',
    BASE_URL: '',
    SENDER_ID: '',
    REQUEST_BODY: null,
    RESPONSE_BODY: null,
  };

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
    this.smsServiceProvider = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.smsServiceProvider) {
      this.SMS_PROV_PARAMS.ID = this.smsServiceProvider.id;
      this.SMS_PROV_PARAMS.NAME = this.smsServiceProvider.serviceProviderName;
      this.SMS_PROV_PARAMS.APIKEY = this.smsServiceProvider.apiKey;
      this.SMS_PROV_PARAMS.APIURL = this.smsServiceProvider.apiUrl;
      this.SMS_PROV_PARAMS.NOOFSMS = this.smsServiceProvider.noOfSms;
      this.SMS_PROV_PARAMS.BASE_URL = this.smsServiceProvider.baseUrl;
      this.SMS_PROV_PARAMS.SENDER_ID = this.smsServiceProvider.senderId;
      this.SMS_PROV_PARAMS.CHECK_STATUS_API =
        this.smsServiceProvider.checkStatusApi;
      this.SMS_PROV_PARAMS.REQUEST_BODY = this.smsServiceProvider.requestBody;
      this.SMS_PROV_PARAMS.RESPONSE_BODY = this.smsServiceProvider.responseBody;
    }

    this.ADD_SMS_PROV = this.global.checkForUserButtonPermission(
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SMS_PROV = this.global.checkForUserButtonPermission(
      AppConstants.SMS_SERVICE_PROVIDER_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SMS_SERVICE_PROVIDER_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SMS_SERVICE_PROVIDER_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiPostCall(
        AppConstants.PUBLIC_APIS.OPTIONSFETCH,
        { formId: 'smsServiceProviderForm' },
        false
      )
      .subscribe((data) => {
        this.requestList = data.optionsDTO;
        this.responseList = data.optionsDTO;
      });
  }

  ngOnInit(): void {
    this.initSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initSectionForm = () => {
    this.smsServiceProviderForm = this.fb.group({
      id: this.SMS_PROV_PARAMS.ID,
      serviceProviderName: [
        this.SMS_PROV_PARAMS.NAME,
        Validators.compose([Validators.required]),
      ],
      apiKey: [
        this.SMS_PROV_PARAMS.APIKEY,
        Validators.compose([Validators.required]),
      ],
      apiUrl: [
        this.SMS_PROV_PARAMS.APIURL,
        Validators.compose([Validators.required]),
      ],
      noOfSms: [
        this.SMS_PROV_PARAMS.NOOFSMS,
        Validators.compose([Validators.required]),
      ],
      baseUrl: [
        this.SMS_PROV_PARAMS.BASE_URL,
        Validators.compose([Validators.required]),
      ],
      senderId: [
        this.SMS_PROV_PARAMS.SENDER_ID,
        Validators.compose([Validators.required]),
      ],
      checkStatusApi: [
        this.SMS_PROV_PARAMS.CHECK_STATUS_API,
        Validators.compose([Validators.required]),
      ],
      requestBody: [this.SMS_PROV_PARAMS.REQUEST_BODY],
      responseBody: [this.SMS_PROV_PARAMS.RESPONSE_BODY],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.smsServiceProviderForm.controls;
    if (
      this.smsServiceProviderForm.invalid &&
      !this.smsServiceProviderForm.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.smsServiceProviderForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.smsServiceProviderForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.smsServiceProviderForm.value, true)
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
    const control = this.smsServiceProviderForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.smsServiceProviderForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
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

  goBack() {
    this._location.back();
  }
}
