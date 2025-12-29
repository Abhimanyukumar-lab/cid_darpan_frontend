import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
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
  selector: 'app-notification-list-modify',
  templateUrl: './notification-list-modify.component.html',
  styleUrls: ['./notification-list-modify.component.scss'],
})
export class NotificationListModifyComponent implements OnInit, OnDestroy {
  subscription: any;
  lists: any;
  loading = false;
  listsForm: UntypedFormGroup;

  ADD_LINK: boolean;
  EDIT_LINK: boolean;
  VIEW_LINK: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  VIEW_URL: string;
  language: string;

  LIST_PARAMS = {
    ID: null,
    NAME_EN: '',
  };

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location
  ) {
    this.lists = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.lists) {
      this.LIST_PARAMS.ID = this.lists.id;
      this.LIST_PARAMS.NAME_EN = this.lists.listName;
    }

    this.ADD_LINK = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_LINK = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.EDIT_SUBMIT_DATA
    );
    this.VIEW_LINK = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_MODULE.VIEW_DATA
    );

    this.ADD_URL = AppConstants.NOTIFICATION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.NOTIFICATION_MODULE.EDIT_SUBMIT_URL;
    this.VIEW_URL = AppConstants.NOTIFICATION_MODULE.VIEW_URL;
  }

  ngOnInit(): void {
    this.initiateLinksForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateLinksForm = () => {
    this.listsForm = this.fb.group({
      id: this.LIST_PARAMS.ID,
      listName: [
        this.LIST_PARAMS.NAME_EN,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.listsForm.controls;
    if (this.listsForm.invalid && !this.listsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.listsForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.listsForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.listsForm.value, true)
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
    const control = this.listsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.listsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  focusOut = (event, name) => {
    this.listsForm.patchValue({
      [name]: event.target.value,
    });
  };
}
