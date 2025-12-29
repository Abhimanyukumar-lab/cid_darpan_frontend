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
  selector: 'app-modify-transfer-list',
  templateUrl: './modify-transfer-list.component.html',
  styleUrls: ['./modify-transfer-list.component.scss'],
})
export class ModifyTransferListComponent implements OnInit, OnDestroy {
  subscription: any;
  transferList: any;
  loading = false;
  transferListForm: UntypedFormGroup;

  ADD_TRANSFER_LIST: boolean;
  EDIT_TRANSFER_LIST: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  TRANSFER_LIST_PARAMS = {
    ID: null,
    TITLE: '',
    DESCRIPTION: '',
    RELEASEBY: '',
    TYPE: '',
    PRIORITY: '',
    DATE: '',
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
    this.transferList = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.transferList) {
      this.TRANSFER_LIST_PARAMS.ID = this.transferList.id;
      this.TRANSFER_LIST_PARAMS.TITLE = this.transferList.title;
      this.TRANSFER_LIST_PARAMS.RELEASEBY = this.transferList.releasedBy;
      this.TRANSFER_LIST_PARAMS.DESCRIPTION = this.transferList.description;
      this.TRANSFER_LIST_PARAMS.TYPE = this.transferList.type;
      this.TRANSFER_LIST_PARAMS.PRIORITY = this.transferList.priority;
      this.TRANSFER_LIST_PARAMS.DATE = this.transferList.date;
    }

    this.ADD_TRANSFER_LIST = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_LIST_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_TRANSFER_LIST = this.global.checkForUserButtonPermission(
      AppConstants.TRANSFER_LIST_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.TRANSFER_LIST_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.TRANSFER_LIST_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initTransferListForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initTransferListForm = () => {
    this.transferListForm = this.fb.group({
      id: this.TRANSFER_LIST_PARAMS.ID,
      title: [
        this.TRANSFER_LIST_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.TRANSFER_LIST_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      releasedBy: [
        this.TRANSFER_LIST_PARAMS.RELEASEBY,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.TRANSFER_LIST_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date: [
        this.TRANSFER_LIST_PARAMS.DATE,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.transferListForm.controls;
    if (this.transferListForm.invalid && !this.transferListForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.transferList)
      formData.append('id', this.transferListForm.value['id']);
    formData.append('title', this.transferListForm.value['title']);
    formData.append('description', this.transferListForm.value['description']);
    formData.append('releasedBy', this.transferListForm.value['releasedBy']);
    formData.append('type', 'TRANSFER');
    formData.append('priority', this.transferListForm.value['priority']);
    formData.append('language', this.language);
    formData.append('date', this.transferListForm.value['date']);

    if (this.transferListForm.value['id'])
      this.apiService
        .apiFormDataPostCall(this.EDIT_URL, formData, true)
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
        .apiFormDataPostCall(this.ADD_URL, formData, true)
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
    const control = this.transferListForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.transferListForm.controls[controlName];
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
    this.transferListForm.patchValue({
      [name]: event.target.value,
    });
  };
}
