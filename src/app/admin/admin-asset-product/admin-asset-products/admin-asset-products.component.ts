import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
  selector: 'app-admin-asset-products',
  templateUrl: './admin-asset-products.component.html',
  styleUrls: ['./admin-asset-products.component.scss'],
})
export class AdminAssetProductsComponent implements OnInit {
  subscription: any;

  suppliersProducts: any;
  loading = false;
  suppliersProductsForm: UntypedFormGroup;

  ADD_PRODUCTS: boolean;
  EDIT_PRODUCTS: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  priceData: any;
  quantityData: any;

  assetTypeList: any[];
  suppliersList: any[];
  language: string;
  isDatePresent: boolean = false;
  isPrice: boolean = false;
  isQuantity: boolean = false;
  max: Date = new Date();

  INVOICE: File = null;

  PRODUCTS_PARAMS = {
    ID: null,
    SUPPLIERID: null,
    SUPPLIERNAME: '',
    ASSETTYPEID: null,
    ASSETETYPE: '',
    AMCSTATUS: null,
    PRODAMCSTARTDATE: '',
    PRODAMCENDDATE: '',
    PRODNAME: '',
    PRODPRICE: 0,
    PRODTOTALPRICE: 0,
    PRODORDEREDBY: '',
    PRODORDERDATE: '',
    PRODREQUESTEDBY: '',
    DESCIPTION: '',
    INVOICE: null,
    PRODQUANTITY: 0,
    PURCHASEDATE: null,
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
    this.suppliersProducts = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.suppliersProducts) {
      this.PRODUCTS_PARAMS.ID = this.suppliersProducts.id;
      this.PRODUCTS_PARAMS.SUPPLIERID = this.suppliersProducts.supplierId;
      this.PRODUCTS_PARAMS.SUPPLIERNAME = this.suppliersProducts.supplierName;
      this.PRODUCTS_PARAMS.ASSETTYPEID = this.suppliersProducts.assetTypeId;
      this.PRODUCTS_PARAMS.ASSETETYPE = this.suppliersProducts.assetTypeName;
      this.PRODUCTS_PARAMS.AMCSTATUS =
        this.suppliersProducts.suppliersProductsAmcDTO.amcStatus;
      this.PRODUCTS_PARAMS.PRODAMCSTARTDATE =
        this.suppliersProducts.suppliersProductsAmcDTO.amcStartDate;
      this.PRODUCTS_PARAMS.PRODAMCENDDATE =
        this.suppliersProducts.suppliersProductsAmcDTO.amcEndDate;
      this.PRODUCTS_PARAMS.PRODNAME = this.suppliersProducts.productName;
      this.PRODUCTS_PARAMS.PRODPRICE = this.suppliersProducts.productPrice;
      this.PRODUCTS_PARAMS.PRODTOTALPRICE = this.suppliersProducts.totalPrice;
      this.PRODUCTS_PARAMS.PRODORDEREDBY = this.suppliersProducts.orderedBy;
      this.PRODUCTS_PARAMS.PRODORDERDATE = this.suppliersProducts.orderedDate;
      this.PRODUCTS_PARAMS.PRODREQUESTEDBY = this.suppliersProducts.requiredBy;
      this.PRODUCTS_PARAMS.DESCIPTION = this.suppliersProducts.decription;
      this.PRODUCTS_PARAMS.PRODQUANTITY =
        this.suppliersProducts.productQuantity;

      var date = this.suppliersProducts.purchaseDate.split('T')[0].split('-');
      this.PRODUCTS_PARAMS.PURCHASEDATE =
        date[0] + '-' + date[1] + '-' + date[2];

      if (this.suppliersProducts.suppliersProductsAmcDTO.amcStatus == 'Yes') {
        this.isDatePresent = true;
      }
    }

    this.ADD_PRODUCTS = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_PRODUCTS = this.global.checkForUserButtonPermission(
      AppConstants.ASSETPRODUCT_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ASSETPRODUCT_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ASSETPRODUCT_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.ASSETPRODUCT_MODULE.ASSET_TYPE_LIST, true)
      .subscribe((data) => {
        this.assetTypeList = data.assetTypeDTOs;
      });

    this.apiService
      .apiGetCall(AppConstants.ASSETPRODUCT_MODULE.SUPPLIERS_LIST, true)
      .subscribe((data) => {
        this.suppliersList = data.assetSupplierDTOs;
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
    this.suppliersProductsForm = this.fb.group({
      id: this.PRODUCTS_PARAMS.ID,
      amcStatus: [
        this.PRODUCTS_PARAMS.AMCSTATUS,
        Validators.compose([Validators.required]),
      ],
      amcStartDate: [this.PRODUCTS_PARAMS.PRODAMCSTARTDATE],
      amcEndDate: [this.PRODUCTS_PARAMS.PRODAMCENDDATE],
      supplierId: [
        this.PRODUCTS_PARAMS.SUPPLIERID,
        Validators.compose([Validators.required]),
      ],
      assetTypeId: [
        this.PRODUCTS_PARAMS.ASSETTYPEID,
        Validators.compose([Validators.required]),
      ],
      productName: [this.PRODUCTS_PARAMS.PRODNAME],
      productPrice: [
        this.PRODUCTS_PARAMS.PRODPRICE,
        Validators.compose([Validators.required]),
      ],
      totalPrice: new UntypedFormControl(
        { value: this.PRODUCTS_PARAMS.PRODTOTALPRICE, disabled: true },
        Validators.required
      ),
      orderedBy: [
        this.PRODUCTS_PARAMS.PRODORDEREDBY,
        Validators.compose([Validators.required]),
      ],
      orderedDate: [
        this.PRODUCTS_PARAMS.PRODORDERDATE,
        Validators.compose([Validators.required]),
      ],
      requiredBy: [
        this.PRODUCTS_PARAMS.PRODREQUESTEDBY,
        Validators.compose([Validators.required]),
      ],
      decription: [this.PRODUCTS_PARAMS.DESCIPTION],
      productQuantity: [
        this.PRODUCTS_PARAMS.PRODQUANTITY,
        Validators.compose([Validators.required]),
      ],
      invoice: [this.PRODUCTS_PARAMS.INVOICE],
      purchaseDate: [
        this.PRODUCTS_PARAMS.PURCHASEDATE,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.suppliersProductsForm.controls;
    if (
      this.suppliersProductsForm.invalid &&
      !this.suppliersProductsForm.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.suppliersProducts)
      formData.append('id', this.suppliersProductsForm.value['id']);
    formData.append(
      'supplierId',
      this.suppliersProductsForm.value['supplierId']
    );
    formData.append(
      'assetTypeId',
      this.suppliersProductsForm.value['assetTypeId']
    );
    formData.append(
      'productName',
      this.suppliersProductsForm.value['productName']
    );
    formData.append(
      'productPrice',
      this.suppliersProductsForm.value['productPrice']
    );

    var prodPrice = this.suppliersProductsForm.controls['productPrice'].value;
    var prodQuentity =
      this.suppliersProductsForm.controls['productQuantity'].value;
    formData.append(
      'totalPrice',
      prodPrice.valueOf() * prodQuentity.valueOf() + ''
    );
    formData.append('orderedBy', this.suppliersProductsForm.value['orderedBy']);
    formData.append(
      'orderedDate',
      this.suppliersProductsForm.value['orderedDate']
    );
    formData.append(
      'requiredBy',
      this.suppliersProductsForm.value['requiredBy']
    );
    formData.append(
      'decription',
      this.suppliersProductsForm.value['decription']
    );
    formData.append(
      'productQuantity',
      this.suppliersProductsForm.value['productQuantity']
    );
    formData.append('amcStatus', this.suppliersProductsForm.value['amcStatus']);
    formData.append(
      'amcStartDate',
      this.suppliersProductsForm.value['amcStartDate']
    );
    formData.append(
      'amcEndDate',
      this.suppliersProductsForm.value['amcEndDate']
    );

    var date: any[] =
      this.suppliersProductsForm.value['purchaseDate'].split('-');
    formData.append(
      'purchaseDate',
      this.suppliersProductsForm.value['purchaseDate']
    );

    if (this.INVOICE) {
      formData.append('invoice', this.INVOICE, this.INVOICE.name);
    }

    if (this.suppliersProductsForm.value['id'])
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

  isControlHasError(controlName: string, validationSupplier: string): boolean {
    const control = this.suppliersProductsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationSupplier) &&
      (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.suppliersProductsForm.controls[controlName];
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

  doCheckAMCStatus = (value) => {
    var status = value.options[value.selectedIndex].text;
    if (status == 'Yes') {
      this.isDatePresent = true;
      this.suppliersProductsForm.controls['amcStartDate'].setValidators([
        Validators.required,
      ]);
      this.suppliersProductsForm.controls['amcEndDate'].setValidators([
        Validators.required,
      ]);
      this.suppliersProductsForm.patchValue({
        amcStartDate: null,
        amcEndDate: null,
      });
    } else {
      this.isDatePresent = false;
      this.suppliersProductsForm.controls['amcStartDate'].clearValidators();
      this.suppliersProductsForm.controls['amcEndDate'].clearValidators();
      this.suppliersProductsForm.patchValue({
        amcStartDate: null,
        amcEndDate: null,
      });
    }
  };

  setDataRecipt = (value: number, type: string) => {
    var prodPrice = this.suppliersProductsForm.controls['productPrice'].value;
    var prodQuentity =
      this.suppliersProductsForm.controls['productQuantity'].value;

    if (type == 'price') prodPrice = value;
    if (type == 'quentity') prodQuentity = value;
    this.suppliersProductsForm.patchValue({
      totalPrice: prodPrice.valueOf() * prodQuentity.valueOf(),
    });
  };

  handleFileChange = (file: FileList) => {
    this.INVOICE = file.item(0);
  };

  focusOut = (event, name) => {
    this.suppliersProductsForm.patchValue({
      [name]: event.target.value,
    });
  };

  startDateChanged = () => {
    this.suppliersProductsForm.patchValue({
      amcEndDate: null,
    });

    document
      .getElementById('amcEndDate')
      .setAttribute(
        'min',
        this.suppliersProductsForm.controls['amcStartDate'].value
      );
  };
}
