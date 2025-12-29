import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-modify-role',
  templateUrl: './modify-role.component.html',
  styleUrls: ['./modify-role.component.scss'],
})
export class ModifyRoleComponent implements OnInit, OnDestroy {
  role: any;
  roleForm: UntypedFormGroup;
  loading = false;

  ADD_ROLE: boolean;
  EDIT_ROLE: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  ROLE_PARAMS = {
    ROLE_ID: null,
    ROLE_NAME: '',
  };

  constructor(
    private appStore: Store<{ auth: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    private router: Router
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.role = this.localStorage.getStoredValue('editData');
    if (this.role) {
      this.ROLE_PARAMS.ROLE_ID = this.role.id;
      this.ROLE_PARAMS.ROLE_NAME = this.role.roleName;
    }

    this.ADD_ROLE = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.ADD_SUBMIT_DATA
    );

    this.EDIT_ROLE = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ROLE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ROLE_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initRoleForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initRoleForm() {
    this.roleForm = this.fb.group({
      roleId: this.ROLE_PARAMS.ROLE_ID,
      name: [
        this.ROLE_PARAMS.ROLE_NAME,
        Validators.compose([Validators.required]),
      ],
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.roleForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.roleForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.roleForm.controls;
    if (this.roleForm.invalid && !this.roleForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.roleForm.value['roleId'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.roleForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.roleForm.value, true)
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
}
