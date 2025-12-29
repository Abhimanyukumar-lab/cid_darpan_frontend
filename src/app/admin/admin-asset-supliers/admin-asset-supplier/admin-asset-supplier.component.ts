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
  selector: 'app-admin-asset-supplier',
  templateUrl: './admin-asset-supplier.component.html',
  styleUrls: ['./admin-asset-supplier.component.scss'],
})
export class AdminAssetSupplierComponent implements OnInit {
  subscription: any;
  assetSupplier: any;
  loading = false;
  assetSupplierForm: UntypedFormGroup;

  ADD_ASSETSUPPLIER: boolean;
  EDIT_ASSETSUPPLIER: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  assetTypeList: any[];
  language: string;
  isDatePresent: boolean = false;
  max: Date = new Date();

  ASSETSUPPLIER_PARAMS = {
    ID: null,
    NAME: '',
    ADDRESS: '',
    MOBILENO: '',
    CONTACTNO: '',
    EMAIL: '',
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
    this.assetSupplier = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.assetSupplier) {
      this.ASSETSUPPLIER_PARAMS.ID = this.assetSupplier.id;
      this.ASSETSUPPLIER_PARAMS.NAME = this.assetSupplier.supplierName;
      this.ASSETSUPPLIER_PARAMS.ADDRESS = this.assetSupplier.supplierAddress;
      this.ASSETSUPPLIER_PARAMS.MOBILENO = this.assetSupplier.supplierMobileNo;
      this.ASSETSUPPLIER_PARAMS.CONTACTNO =
        this.assetSupplier.supplierContactNo;
      this.ASSETSUPPLIER_PARAMS.EMAIL = this.assetSupplier.supplierEmail;
    }

    this.ADD_ASSETSUPPLIER = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ASSETSUPPLIER = this.global.checkForUserButtonPermission(
      AppConstants.ASSETSUPPLIERS_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ASSETSUPPLIERS_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ASSETSUPPLIERS_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateQuestionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateQuestionForm = () => {
    this.assetSupplierForm = this.fb.group({
      id: this.ASSETSUPPLIER_PARAMS.ID,
      supplierName: [
        this.ASSETSUPPLIER_PARAMS.NAME,
        Validators.compose([Validators.required]),
      ],
      supplierAddress: [
        this.ASSETSUPPLIER_PARAMS.ADDRESS,
        Validators.compose([Validators.required]),
      ],
      supplierMobileNo: [
        this.ASSETSUPPLIER_PARAMS.MOBILENO,
        Validators.compose([Validators.required]),
      ],
      supplierContactNo: [this.ASSETSUPPLIER_PARAMS.CONTACTNO],
      supplierEmail: [this.ASSETSUPPLIER_PARAMS.EMAIL],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.assetSupplierForm.controls;
    if (this.assetSupplierForm.invalid && !this.assetSupplierForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.assetSupplierForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.assetSupplierForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.assetSupplierForm.value, true)
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

  isControlHasError(controlName: string, validationSupplier: string): boolean {
    const control = this.assetSupplierForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationSupplier) &&
      (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.assetSupplierForm.controls[controlName];
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

  doGetValue = (value) => {
    var amsValue = value.options[value.selectedIndex].text;
    if (amsValue == 'yes') {
      this.isDatePresent = true;
    } else {
      this.isDatePresent = false;
    }
  };

  focusOut = (event, name) => {
    this.assetSupplierForm.patchValue({
      [name]: event.target.value,
    });
  };
}
