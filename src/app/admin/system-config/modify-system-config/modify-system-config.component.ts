import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
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
  selector: 'app-modify-system-config',
  templateUrl: './modify-system-config.component.html',
  styleUrls: ['./modify-system-config.component.scss'],
})
export class ModifySystemConfigComponent implements OnInit, OnDestroy {
  systemConfig: any;
  loading = false;
  systemConfigForm: UntypedFormGroup;

  ADD_SYS_CONFIG: boolean;
  EDIT_SYS_CONFIG: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  SYS_CONFIG_PARAMS = {
    ID: null,
    DATA: '',
    VALUE: '',
    TYPE: null,
    MODULE: '',
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
    this.systemConfig = this.localStorage.getStoredValue('editData');

    if (this.systemConfig) {
      this.SYS_CONFIG_PARAMS.ID = this.systemConfig.id;
      this.SYS_CONFIG_PARAMS.VALUE = this.systemConfig.value;
      this.SYS_CONFIG_PARAMS.DATA = this.systemConfig.data;
      this.SYS_CONFIG_PARAMS.TYPE = this.systemConfig.type;
      this.SYS_CONFIG_PARAMS.MODULE = this.systemConfig.module;
    }

    this.ADD_SYS_CONFIG = this.global.checkForUserButtonPermission(
      AppConstants.SYS_CONFIG_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SYS_CONFIG = this.global.checkForUserButtonPermission(
      AppConstants.SYS_CONFIG_MODULE.EDIT_SUBMIT_DATA
    );
    this.ADD_URL = AppConstants.SYS_CONFIG_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SYS_CONFIG_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateSystemConfigForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initiateSystemConfigForm = () => {
    this.systemConfigForm = this.fb.group({
      id: this.SYS_CONFIG_PARAMS.ID,
      value: [
        this.SYS_CONFIG_PARAMS.VALUE,
        Validators.compose([Validators.required]),
      ],
      data: [this.SYS_CONFIG_PARAMS.DATA],
      type: [this.SYS_CONFIG_PARAMS.TYPE],
      module: [this.SYS_CONFIG_PARAMS.MODULE],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.systemConfigForm.controls;
    if (this.systemConfigForm.invalid && !this.systemConfigForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.systemConfigForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.systemConfigForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.systemConfigForm.value, true)
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
    const control = this.systemConfigForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.systemConfigForm.controls[controlName];
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
