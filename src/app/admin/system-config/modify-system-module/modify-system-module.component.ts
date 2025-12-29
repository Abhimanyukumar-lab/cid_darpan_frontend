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
  selector: 'app-modify-system-module',
  templateUrl: './modify-system-module.component.html',
  styleUrls: ['./modify-system-module.component.scss'],
})
export class ModifySystemModuleComponent implements OnInit, OnDestroy {
  systemModule: any;
  loading = false;
  systemModuleForm: UntypedFormGroup;

  ADD_SYS_MODULE: boolean;
  EDIT_SYS_MODULE: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  SYS_MODULE_PARAMS = {
    ID: null,
    MODULENAME: '',
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
    this.systemModule = this.localStorage.getStoredValue('editData');

    if (this.systemModule) {
      this.SYS_MODULE_PARAMS.ID = this.systemModule.id;
      this.SYS_MODULE_PARAMS.MODULENAME = this.systemModule.moduleName;
    }

    this.ADD_SYS_MODULE = this.global.checkForUserButtonPermission(
      AppConstants.SYS_MODULE_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SYS_MODULE = this.global.checkForUserButtonPermission(
      AppConstants.SYS_MODULE_MODULE.EDIT_SUBMIT_DATA
    );
    this.ADD_URL = AppConstants.SYS_MODULE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SYS_MODULE_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateSystemConfigForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initiateSystemConfigForm = () => {
    this.systemModuleForm = this.fb.group({
      id: this.SYS_MODULE_PARAMS.ID,
      moduleName: [
        this.SYS_MODULE_PARAMS.MODULENAME,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.systemModuleForm.controls;
    if (this.systemModuleForm.invalid && !this.systemModuleForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.systemModuleForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.systemModuleForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.systemModuleForm.value, true)
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
    const control = this.systemModuleForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.systemModuleForm.controls[controlName];
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
