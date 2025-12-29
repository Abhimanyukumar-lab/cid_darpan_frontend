import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { select, Store } from '@ngrx/store';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  subscription: any;
  entry: any;
  loading = false;
  entryForm: FormGroup;

  ADD_ENTRY: boolean;
  EDIT_ENTRY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  ENTRY_PARAMS = {
    ID: null,
    cidCrimeCategoryId: null,
    typeOfCrime: null,
    typeOfCrimeHi: null,
    allowAccused: null,
    allowDeceased: null,
    allowVictim: null,
    allowCashCollection: null,
    allowLootedItems: null,
    allowOtherEvidence: null,
  };

  majorHeads: any[] = [];

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: FormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location
  ) {
    this.entry = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.entry) {
      this.ENTRY_PARAMS.ID = this.entry.id;
      this.ENTRY_PARAMS.cidCrimeCategoryId = this.entry.cidCrimeCategoryId;
      this.ENTRY_PARAMS.typeOfCrime = this.entry.typeOfCrime;
      this.ENTRY_PARAMS.typeOfCrimeHi = this.entry.typeOfCrimeHi;
      this.ENTRY_PARAMS.allowAccused = this.entry.allowAccused;
      this.ENTRY_PARAMS.allowDeceased = this.entry.allowDeceased;
      this.ENTRY_PARAMS.allowVictim = this.entry.allowVictim;
      this.ENTRY_PARAMS.allowCashCollection = this.entry.allowCashCollection;
      this.ENTRY_PARAMS.allowLootedItems = this.entry.allowLootedItems;
      this.ENTRY_PARAMS.allowOtherEvidence = this.entry.allowOtherEvidence;
    }

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SRS_NSRS_SUB_MEJOR_HEAD_MODULE.EDIT_SUBMIT_URL;

    this.fetchMajorHead();
  }

  ngOnInit(): void {
    this.initiateForm();
  }
  
  isCollapsed = true;
  
  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  };
  

  initiateForm = () => {
    this.entryForm = this.fb.group({
      id: this.ENTRY_PARAMS.ID,
      cidCrimeCategoryId: [
        this.ENTRY_PARAMS.cidCrimeCategoryId,
        Validators.compose([Validators.required]),
      ],
      typeOfCrime: [
        this.ENTRY_PARAMS.typeOfCrime,
        Validators.compose([Validators.required]),
      ],
      typeOfCrimeHi: [
        this.ENTRY_PARAMS.typeOfCrimeHi,
        Validators.compose([Validators.required]),
      ],
      allowAccused: [
        this.ENTRY_PARAMS.allowAccused ? this.ENTRY_PARAMS.allowAccused : false,
      ],
      allowDeceased: [
        this.ENTRY_PARAMS.allowDeceased
          ? this.ENTRY_PARAMS.allowDeceased
          : false,
      ],
      allowVictim: [
        this.ENTRY_PARAMS.allowVictim ? this.ENTRY_PARAMS.allowVictim : false,
      ],
      allowCashCollection: [
        this.ENTRY_PARAMS.allowCashCollection
          ? this.ENTRY_PARAMS.allowCashCollection
          : false,
      ],
      allowLootedItems: [
        this.ENTRY_PARAMS.allowLootedItems
          ? this.ENTRY_PARAMS.allowLootedItems
          : false,
      ],
      allowOtherEvidence: [
        this.ENTRY_PARAMS.allowOtherEvidence
          ? this.ENTRY_PARAMS.allowOtherEvidence
          : false,
      ],
    });
  };

  fetchMajorHead = () => {
    this.apiService.apiGetCall('getCIDCrimeCategoryList', true).subscribe(
      (data) => {
        this.majorHeads = data.cidCrimeCategories;
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.entryForm.controls;
    if (this.entryForm.invalid && !this.entryForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.entryForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.entryForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.entryForm.value, true)
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
    const control = this.entryForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.entryForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this.localStorage.destroyStoredValue('editData');
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
    this.entryForm.patchValue({
      [name]: event.target.value,
    });
  };
}
