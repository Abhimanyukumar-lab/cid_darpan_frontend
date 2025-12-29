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
  selector: 'app-modify-sms-module',
  templateUrl: './modify-sms-module.component.html',
  styleUrls: ['./modify-sms-module.component.scss'],
})
export class ModifySmsModuleComponent implements OnInit, OnDestroy {
  subscription: any;
  smsModule: any;
  loading = false;
  smsModuleForm: UntypedFormGroup;

  ADD_SMS_MOD: boolean;
  EDIT_SMS_MOD: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;
  smsProvidersList: Options[];
  smsTemplateList: Options[];

  SMS_MOD_PARAMS = {
    ID: null,
    MODULE_NAME: '',
    SMS_SERVICE_PROVIDER_ID: null,
    SMS_SERVICE_PROVIDER_NAME: '',
    SMS_TEMPLATE_ID: null,
    SMS_TEMPLATE_NAME: '',
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
    this.smsModule = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.smsModule) {
      this.SMS_MOD_PARAMS.ID = this.smsModule.id;
      this.SMS_MOD_PARAMS.MODULE_NAME = this.smsModule.moduleName;
      this.SMS_MOD_PARAMS.SMS_SERVICE_PROVIDER_ID =
        this.smsModule.smsServiceProviderId;
      this.SMS_MOD_PARAMS.SMS_SERVICE_PROVIDER_NAME =
        this.smsModule.smsServiceProviderName;
      this.SMS_MOD_PARAMS.SMS_TEMPLATE_ID = this.smsModule.smsTemplateId;
      this.SMS_MOD_PARAMS.SMS_TEMPLATE_NAME = this.smsModule.smsTemplateName;
    }

    this.ADD_SMS_MOD = this.global.checkForUserButtonPermission(
      AppConstants.SMS_MODULE_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SMS_MOD = this.global.checkForUserButtonPermission(
      AppConstants.SMS_MODULE_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SMS_MODULE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SMS_MODULE_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.SMS_MODULE_MODULE.FETCH_SMS_PROVIDER, true)
      .subscribe((data) => {
        this.smsProvidersList = data.smsServiceProviderDTOs;
      });

    this.apiService
      .apiGetCall(AppConstants.SMS_MODULE_MODULE.FETCH_SMS_TEMP, true)
      .subscribe((data) => {
        this.smsTemplateList = data.smsTemplateDTOs;
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
    this.smsModuleForm = this.fb.group({
      id: this.SMS_MOD_PARAMS.ID,
      moduleName: [
        this.SMS_MOD_PARAMS.MODULE_NAME,
        Validators.compose([Validators.required]),
      ],
      smsServiceProviderId: [
        this.SMS_MOD_PARAMS.SMS_SERVICE_PROVIDER_ID,
        Validators.compose([Validators.required]),
      ],
      smsTemplateId: [
        this.SMS_MOD_PARAMS.SMS_TEMPLATE_ID,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.smsModuleForm.controls;
    if (this.smsModuleForm.invalid && !this.smsModuleForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.smsModuleForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.smsModuleForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.smsModuleForm.value, true)
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
    const control = this.smsModuleForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.smsModuleForm.controls[controlName];
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
