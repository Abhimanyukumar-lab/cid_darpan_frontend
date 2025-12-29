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
  selector: 'app-modify-leave-type',
  templateUrl: './modify-leave-type.component.html',
  styleUrls: ['./modify-leave-type.component.scss'],
})
export class ModifyLeaveTypeComponent implements OnInit, OnDestroy {
  subscription: any;
  leaveType: any;
  loading = false;
  leaveTypeForm: UntypedFormGroup;

  ADD_LEAVE_TYPE: boolean;
  EDIT_LEAVE_TYPE: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  LEAVE_TYPE_PARAMS = {
    ID: null,
    LEAVE_TYPE: null,
    LEAVE_CODE: null,
    ALLOWED_LEAVE: null,
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
    this.leaveType = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.leaveType) {
      this.LEAVE_TYPE_PARAMS.ID = this.leaveType.id;
      this.LEAVE_TYPE_PARAMS.LEAVE_TYPE = this.leaveType.leaveType;
      this.LEAVE_TYPE_PARAMS.LEAVE_CODE = this.leaveType.leaveCode;
      this.LEAVE_TYPE_PARAMS.ALLOWED_LEAVE = this.leaveType.allowedLeave;
    }

    this.ADD_LEAVE_TYPE = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_TYPE_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_LEAVE_TYPE = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_TYPE_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.LEAVE_TYPE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.LEAVE_TYPE_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initHolidayForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initHolidayForm = () => {
    this.leaveTypeForm = this.fb.group({
      id: this.LEAVE_TYPE_PARAMS.ID,
      leaveType: [
        this.LEAVE_TYPE_PARAMS.LEAVE_TYPE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      leaveCode: [
        this.LEAVE_TYPE_PARAMS.LEAVE_CODE,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(320),
        ]),
      ],
      allowedLeave: [
        this.LEAVE_TYPE_PARAMS.ALLOWED_LEAVE,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.leaveTypeForm.controls;
    if (this.leaveTypeForm.invalid && !this.leaveTypeForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.leaveTypeForm.value['id'])
      this.apiService
        .apiFormDataPostCall(this.EDIT_URL, this.leaveTypeForm.value, true)
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
        .apiFormDataPostCall(this.ADD_URL, this.leaveTypeForm.value, true)
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
    const control = this.leaveTypeForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.leaveTypeForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
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

  focusOut = (event, name) => {
    this.leaveTypeForm.patchValue({
      [name]: event.target.value,
    });
  };

}
