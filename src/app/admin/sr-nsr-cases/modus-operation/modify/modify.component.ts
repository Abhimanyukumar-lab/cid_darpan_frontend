import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { select, Store } from '@ngrx/store';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
})
export class ModifyComponent {
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
    cidCrimeSubCategoryId: null,
    name: null,
    nameHi: null,
    descriptionDetails: null,
  };

  majorHeads: any[] = [];
  subMajorHeads: any[] = [];
  selectedSubMajerHead: any[] = [];

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
      this.ENTRY_PARAMS.cidCrimeSubCategoryId =
        this.entry.cidCrimeSubCategoryId;
      this.ENTRY_PARAMS.name = this.entry.name;
      this.ENTRY_PARAMS.nameHi = this.entry.nameHi;
      this.ENTRY_PARAMS.descriptionDetails = this.entry.descriptionDetails;
    }

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL =
      AppConstants.SRS_NSRS_MODUS_OPERATION_MODULE.EDIT_SUBMIT_URL;

    this.fetchMajorHead();
    this.fetchSubMajorHead();
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
      cidCrimeSubCategoryId: [
        this.ENTRY_PARAMS.cidCrimeSubCategoryId,
        Validators.compose([Validators.required]),
      ],
      name: [this.ENTRY_PARAMS.name],
      nameHi: [this.ENTRY_PARAMS.nameHi],
      desc: [this.ENTRY_PARAMS.descriptionDetails],
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

  fetchSubMajorHead = () => {
    this.apiService.apiGetCall('getCIDCrimeCategoryTypeData', true).subscribe(
      (data) => {
        this.subMajorHeads = data.cidCrimeCategories;
        this.showSubMajorHead();
      },
      (error) => {
        this.loading = false;
        this.appStore.dispatch(new AppLoadderHide({}));
      }
    );
  };

  showSubMajorHead = () => {
    var categoryId = this.entryForm.value['cidCrimeCategoryId'];
    if (categoryId)
      this.selectedSubMajerHead = this.subMajorHeads.filter(
        (a) => a.cidCrimeCategoryId == categoryId
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
