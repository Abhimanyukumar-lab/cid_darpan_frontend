import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
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
  selector: 'app-modify-sms-template',
  templateUrl: './modify-sms-template.component.html',
  styleUrls: ['./modify-sms-template.component.scss'],
})
export class ModifySmsTemplateComponent implements OnInit, OnDestroy {
  subscription: any;
  smsTemplate: any;
  loading = false;
  smsTemplateForm: UntypedFormGroup;

  ADD_SMS_TEMP: boolean;
  EDIT_SMS_TEMP: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  SMS_TEMPLATE_PARAMS = {
    ID: null,
    TEMPLATENAME: '',
    BODY: '',
    TEMPLATEID: '',
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
    this.smsTemplate = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.smsTemplate) {
      this.SMS_TEMPLATE_PARAMS.ID = this.smsTemplate.id;
      this.SMS_TEMPLATE_PARAMS.TEMPLATENAME = this.smsTemplate.templateName;
      this.SMS_TEMPLATE_PARAMS.BODY = this.smsTemplate.body;
      this.SMS_TEMPLATE_PARAMS.TEMPLATEID = this.smsTemplate.templateId;
    }

    this.ADD_SMS_TEMP = this.global.checkForUserButtonPermission(
      AppConstants.SMS_TEMPLATE_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SMS_TEMP = this.global.checkForUserButtonPermission(
      AppConstants.SMS_TEMPLATE_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SMS_TEMPLATE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SMS_TEMPLATE_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initSectionForm = () => {
    this.smsTemplateForm = this.fb.group({
      id: this.SMS_TEMPLATE_PARAMS.ID,
      templateId: this.SMS_TEMPLATE_PARAMS.TEMPLATEID,
      templateName: [
        this.SMS_TEMPLATE_PARAMS.TEMPLATENAME,
        Validators.compose([Validators.required]),
      ],
      body: [
        this.SMS_TEMPLATE_PARAMS.BODY,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.smsTemplateForm.controls;
    if (this.smsTemplateForm.invalid && !this.smsTemplateForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.smsTemplateForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.smsTemplateForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.smsTemplateForm.value, true)
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
    const control = this.smsTemplateForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.smsTemplateForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }
}
