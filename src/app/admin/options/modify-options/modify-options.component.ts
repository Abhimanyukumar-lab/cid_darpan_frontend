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
  selector: 'app-modify-options',
  templateUrl: './modify-options.component.html',
  styleUrls: ['./modify-options.component.scss'],
})
export class ModifyOptionsComponent implements OnInit, OnDestroy {
  subscription: any;
  option: any;
  loading = false;
  optionForm: UntypedFormGroup;

  ADD_OPTION: boolean;
  EDIT_OPTION: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  OPTION_PARAMS = {
    ID: null,
    EN_NAME: '',
    HI_NAME: '',
    VALUE: '',
    FORM_ID: '',
    PRIORITY: '',
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
    this.option = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.option) {
      this.OPTION_PARAMS.ID = this.option.id;
      this.OPTION_PARAMS.EN_NAME = this.option.optionNameEn;
      this.OPTION_PARAMS.HI_NAME = this.option.optionNameHi;
      this.OPTION_PARAMS.VALUE = this.option.optionValue;
      this.OPTION_PARAMS.FORM_ID = this.option.formId;
      this.OPTION_PARAMS.PRIORITY = this.option.priority;
    }

    this.ADD_OPTION = this.global.checkForUserButtonPermission(
      AppConstants.OPTION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_OPTION = this.global.checkForUserButtonPermission(
      AppConstants.OPTION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.OPTION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.OPTION_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateOptionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateOptionForm = () => {
    this.optionForm = this.fb.group({
      id: this.OPTION_PARAMS.ID,
      optionNameEn: [
        this.OPTION_PARAMS.EN_NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      optionNameHi: [this.OPTION_PARAMS.HI_NAME],
      optionValue: [
        this.OPTION_PARAMS.VALUE,
        Validators.compose([Validators.required]),
      ],
      formId: [
        this.OPTION_PARAMS.FORM_ID,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.OPTION_PARAMS.PRIORITY,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.optionForm.controls;
    if (this.optionForm.invalid && !this.optionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.option) formData.append('id', this.optionForm.value['id']);
    formData.append('optionNameEn', this.optionForm.value['optionNameEn']);
    if (this.OPTION_PARAMS.HI_NAME) {
      formData.append('optionNameHi', this.optionForm.value['optionNameHi']);
    }
    formData.append('optionValue', this.optionForm.value['optionValue']);
    formData.append('formId', this.optionForm.value['formId']);
    formData.append('priority', this.optionForm.value['priority']);
    formData.append('language', this.language);

    if (this.optionForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.optionForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.optionForm.value, true)
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
    const control = this.optionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.optionForm.controls[controlName];
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


}
