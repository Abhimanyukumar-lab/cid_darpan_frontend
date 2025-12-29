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
  selector: 'app-modify-asset-type',
  templateUrl: './modify-asset-type.component.html',
  styleUrls: ['./modify-asset-type.component.scss'],
})
export class ModifyAssetTypeComponent implements OnInit {
  subscription: any;

  assetType: any;
  loading = false;
  assetTypeForm: UntypedFormGroup;

  ADD_ASSETTYPE: boolean;
  EDIT_ASSETTYPE: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  catagoryList: any[];
  language: string;

  ASSETTYPE_PARAMS = {
    ID: null,
    ASSETNAMEHI: '',
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
    this.assetType = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.assetType) {
      this.ASSETTYPE_PARAMS.ID = this.assetType.id;
      this.ASSETTYPE_PARAMS.ASSETNAMEHI = this.assetType.assetsName;
      this.ASSETTYPE_PARAMS.PRIORITY = this.assetType.priority;
    }

    this.ADD_ASSETTYPE = this.global.checkForUserButtonPermission(
      AppConstants.ASSETTYPE_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ASSETTYPE = this.global.checkForUserButtonPermission(
      AppConstants.ASSETTYPE_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ASSETTYPE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ASSETTYPE_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiPostCall(
        AppConstants.PUBLIC_APIS.OPTIONSFETCH,
        { formId: 'assetTypeForm' },
        false
      )
      .subscribe((data) => {
        this.catagoryList = data.optionsDTO;
      });
  }

  ngOnInit(): void {
    this.initiateQuestionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateQuestionForm = () => {
    this.assetTypeForm = this.fb.group({
      id: this.ASSETTYPE_PARAMS.ID,
      assetsName: [
        this.ASSETTYPE_PARAMS.ASSETNAMEHI,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.ASSETTYPE_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.assetTypeForm.controls;
    if (this.assetTypeForm.invalid && !this.assetTypeForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.assetTypeForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.assetTypeForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.assetTypeForm.value, true)
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
    const control = this.assetTypeForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.assetTypeForm.controls[controlName];
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
    this.assetTypeForm.patchValue({
      [name]: event.target.value,
    });
  };
}
