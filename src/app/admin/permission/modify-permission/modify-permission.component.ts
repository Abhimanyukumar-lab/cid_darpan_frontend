import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
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
  selector: 'app-modify-permission',
  templateUrl: './modify-permission.component.html',
  styleUrls: ['./modify-permission.component.scss'],
})
export class ModifyPermissionComponent implements OnInit, OnDestroy {
  permission: any;
  loading = false;
  permissionForm: UntypedFormGroup;

  ADD_PERMISSION: boolean;
  EDIT_PERMISSION: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  PERMISSION_PARAMS = {
    ID: null,
    NAME: '',
    CODE: '',
    URL: '',
  };

  constructor(
    private appStore: Store<{ auth: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location
  ) {
    this.permission = this.localStorage.getStoredValue('editData');

    if (this.permission) {
      this.PERMISSION_PARAMS.ID = this.permission.id;
      this.PERMISSION_PARAMS.NAME = this.permission.permissionName;
      this.PERMISSION_PARAMS.CODE = this.permission.permissionCode;
      this.PERMISSION_PARAMS.URL = this.permission.permissionUrl;
    }

    this.ADD_PERMISSION = this.global.checkForUserButtonPermission(
      AppConstants.PERMISSION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_PERMISSION = this.global.checkForUserButtonPermission(
      AppConstants.PERMISSION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.PERMISSION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.PERMISSION_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiatePermissionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initiatePermissionForm = () => {
    this.permissionForm = this.fb.group({
      id: this.PERMISSION_PARAMS.ID,
      permissionName: [
        this.PERMISSION_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      permissionCode: [
        this.PERMISSION_PARAMS.CODE,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
      ],
      permissionUrl: [
        this.PERMISSION_PARAMS.URL,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.permissionForm.controls;
    if (this.permissionForm.invalid && !this.permissionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.permissionForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.permissionForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.permissionForm.value, true)
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
    const control = this.permissionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.permissionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
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
  validAplphaCap(event) {
    const charCode = event.which ? event.which : event.KeyCode;

    if (
      (charCode >= 65 && charCode <= 90) 
     ) {
      return true;
    } else return false;
  }
}
