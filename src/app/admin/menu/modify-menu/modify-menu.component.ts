import { Component, OnDestroy, OnInit } from '@angular/core';

import { Location } from '@angular/common';
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
  selector: 'app-modify-menu',
  templateUrl: './modify-menu.component.html',
  styleUrls: ['./modify-menu.component.scss'],
})
export class ModifyMenuComponent implements OnInit, OnDestroy {
  subscription: any;
  menu: any;
  loading = false;
  menuForm: UntypedFormGroup;

  ADD_MENU: boolean;
  EDIT_MENU: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  MENU_PARAMS = {
    ID: null,
    NAME: '',
    NAMEHI: '',
    MENU_ICON: '',
    URL: '',
    PRIORITY: '',
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
    this.menu = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.menu) {
      this.MENU_PARAMS.ID = this.menu.id;
      this.MENU_PARAMS.NAME = this.menu.menuName;
      this.MENU_PARAMS.NAMEHI = this.menu.menuNameHi;
      this.MENU_PARAMS.URL = this.menu.menuUrl;
      this.MENU_PARAMS.MENU_ICON = this.menu.menuIcon;
      this.MENU_PARAMS.PRIORITY = this.menu.priority;
    }

    this.ADD_MENU = this.global.checkForUserButtonPermission(
      AppConstants.MENU_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_MENU = this.global.checkForUserButtonPermission(
      AppConstants.MENU_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.MENU_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.MENU_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateMenuForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateMenuForm = () => {
    this.menuForm = this.fb.group({
      id: this.MENU_PARAMS.ID,
      menuName: [
        this.MENU_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      menuNameHi: [
        this.MENU_PARAMS.NAMEHI,
        Validators.compose([Validators.required]),
      ],
      menuUrl: [
        this.MENU_PARAMS.URL,
        Validators.compose([Validators.required]),
      ],
      menuIcon: [this.MENU_PARAMS.MENU_ICON],
      priority: [
        this.MENU_PARAMS.PRIORITY,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.menuForm.controls;
    if (this.menuForm.invalid && !this.menuForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.menu) formData.append('id', this.menuForm.value['id']);
    formData.append('menuName', this.menuForm.value['menuName']);
    formData.append('menuNameHi', this.menuForm.value['menuNameHi']);
    formData.append('menuUrl', this.menuForm.value['menuUrl']);
    formData.append('priority', this.menuForm.value['priority']);
    formData.append('menuIcon', this.menuForm.value['menuIcon']);

    if (this.menuForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.menuForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.menuForm.value, true)
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
    const control = this.menuForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.menuForm.controls[controlName];
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
    this.menuForm.patchValue({
      [name]: event.target.value,
    });
  };
}
