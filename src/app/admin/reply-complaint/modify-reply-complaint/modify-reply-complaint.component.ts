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
  selector: 'app-modify-reply-complaint',
  templateUrl: './modify-reply-complaint.component.html',
  styleUrls: ['./modify-reply-complaint.component.scss'],
})
export class ModifyReplyComplaintComponent implements OnInit, OnDestroy {
  replyComplaint: any;
  loading = false;
  replyComplaintForm: UntypedFormGroup;

  EDIT_PERMISSION: boolean;
  EDIT_URL: string;

  REPLYCOMPLAINT_PARAMS = {
    ID: null,
    DESCRIPTION: '',
    STATUS: '',
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
    this.replyComplaint = this.localStorage.getStoredValue('editData');

    if (this.replyComplaint) {
      this.REPLYCOMPLAINT_PARAMS.ID = this.replyComplaint.id;
      this.REPLYCOMPLAINT_PARAMS.DESCRIPTION =
        this.replyComplaint.replyDescription;
      this.REPLYCOMPLAINT_PARAMS.STATUS = this.replyComplaint.replyStatus;
    }

    this.EDIT_PERMISSION = this.global.checkForUserButtonPermission(
      AppConstants.REPLYCOMPLAINT_MODULE.EDIT_SUBMIT_DATA
    );

    this.EDIT_URL = AppConstants.REPLYCOMPLAINT_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiatePermissionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initiatePermissionForm = () => {
    this.replyComplaintForm = this.fb.group({
      id: this.REPLYCOMPLAINT_PARAMS.ID,
      replyDescription: [this.REPLYCOMPLAINT_PARAMS.DESCRIPTION],
      replyStatus: [this.REPLYCOMPLAINT_PARAMS.STATUS],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.replyComplaintForm.controls;
    if (this.replyComplaintForm.invalid && !this.replyComplaintForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.replyComplaintForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.replyComplaintForm.value, true)
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
    const control = this.replyComplaintForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.replyComplaintForm.controls[controlName];
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

    if (charCode >= 65 && charCode <= 90) {
      return true;
    } else return false;
  }
}
