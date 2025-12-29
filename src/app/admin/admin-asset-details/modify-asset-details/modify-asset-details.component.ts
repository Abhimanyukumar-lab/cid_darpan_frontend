import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
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
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-modify-asset-details',
  templateUrl: './modify-asset-details.component.html',
  styleUrls: ['./modify-asset-details.component.scss'],
})
export class ModifyAssetDetailsComponent implements OnInit {
  assetallocation: any;
  loading = false;
  assetallocationForm: UntypedFormGroup;
  id: number;

  ADD_ALLOCATION: boolean;
  EDIT_ALLOCATION: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  // officersList: any[];
  productsList: any[];
  language: string;

  ALLOCATION_PARAMS = {
    ID: null,
    CRNO: null,
    PRODUCTID: null,
    PRODUCTNAME: '',
    ALLOCATETOID: null,
    ALLOCATETONAME: null,
    ALLOCATETODATE: null,
    QUANTITY: '',
  };

  // selectedItems: any[] = [];
  officersList: any[] = [];
  selectedOfficerId: string[] = [];
  selectedItems = [];
  dropdownOfficerSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    unSelectAllText: 'UnSelect',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  assetTypeList: any[];

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule,
    private router: Router
  ) {
    this.assetallocation = this.localStorage.getStoredValue('editData');

    if (this.assetallocation) {
      this.ALLOCATION_PARAMS.ID = this.assetallocation.id;
      this.ALLOCATION_PARAMS.PRODUCTID = this.assetallocation.productId;
      this.ALLOCATION_PARAMS.PRODUCTNAME = this.assetallocation.productName;
      this.ALLOCATION_PARAMS.ALLOCATETOID = this.assetallocation.allocatedToId;
      this.ALLOCATION_PARAMS.ALLOCATETONAME =
        this.assetallocation.allocatedToName;
      this.ALLOCATION_PARAMS.QUANTITY = this.assetallocation.quantityAllocated;
      this.ALLOCATION_PARAMS.ALLOCATETODATE =
        this.assetallocation.allocatedDate;
    }

    this.ADD_ALLOCATION = this.global.checkForUserButtonPermission(
      AppConstants.ASSETALLOCATION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ALLOCATION = this.global.checkForUserButtonPermission(
      AppConstants.ASSETALLOCATION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ASSETALLOCATION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ASSETALLOCATION_MODULE.EDIT_SUBMIT_URL;

    // this.apiService
    //   .apiGetCall(AppConstants.ASSETALLOCATION_MODULE.ALLOCATE_TO_LIST, true)
    //   .subscribe((data) => {
    //     this.officersList = data.list;
    //   });

    this.apiService
      .apiGetCall(AppConstants.ASSETALLOCATION_MODULE.PRODUCT_LIST, true)
      .subscribe((data) => {
        this.productsList = data.suppliersProductsDTOs;
      });

    this.apiService
      .apiGetCall(AppConstants.ASSETPRODUCT_MODULE.ASSET_TYPE_LIST, true)
      .subscribe((data) => {
        this.assetTypeList = data.assetTypeDTOs;
      });
  }

  ngOnInit(): void {
    this.initiateAllocationForm();
    this.getOfficerList();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initiateAllocationForm = () => {
    this.assetallocationForm = this.fb.group({
      id: this.ALLOCATION_PARAMS.ID,
      crno: [
        this.ALLOCATION_PARAMS.CRNO,
        Validators.compose([Validators.required]),
      ],
      productId: [
        this.ALLOCATION_PARAMS.PRODUCTID,
        Validators.compose([Validators.required]),
      ],
      allocatedToId: [
        this.ALLOCATION_PARAMS.ALLOCATETOID,
        Validators.compose([Validators.required]),
      ],
      quantityAllocated: [
        this.ALLOCATION_PARAMS.QUANTITY,
        Validators.compose([Validators.required]),
      ],
      allocatedDate: [
        this.ALLOCATION_PARAMS.ALLOCATETODATE,
        Validators.compose([Validators.required]),
      ],
    });
  };

  adduserToList = () => {
    Swal.fire({
      title: 'Are you sure want to add?',
      text: 'You will not be able to edit user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add it!',
      cancelButtonText: 'No, keep editting',
    }).then((result) => {
      if (result.value) {
        this.appStore.dispatch(new AppLoadderShow({}));
        const controls = this.assetallocationForm.controls;
        if (
          this.assetallocationForm.invalid &&
          !this.assetallocationForm.valid
        ) {
          Object.keys(controls).forEach((controlName) =>
            controls[controlName].markAsTouched()
          );
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
          return;
        }

        this.selectedItems.push(this.assetallocationForm.value);
        this.assetallocationForm.reset();
        this.appStore.dispatch(new AppLoadderHide({}));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.assetallocationForm.controls;
    if (this.assetallocationForm.invalid && !this.assetallocationForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    Swal.fire({
      title: 'Are you sure want to finish?',
      text: 'You will not be able to edit users!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add it!',
      cancelButtonText: 'No, keep editting',
    }).then((result) => {
      if (result.value) {
        this.appStore.dispatch(new AppLoadderShow({}));
        this.apiService
          .apiPostCall(this.ADD_URL, this.assetallocationForm.value, true)
          .subscribe(
            (data) => {
              this.toaster.getToastMessage(
                data.message,
                'success',
                3000,
                'top-end'
              );
              this.loading = false;
              this.router.navigate(['/official/assetStock']);
            },
            (error) => {
              this.loading = false;
              this.appStore.dispatch(new AppLoadderHide({}));
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  };

  isControlHasError(controlName: string, validationSupplier: string): boolean {
    const control = this.assetallocationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationSupplier) &&
      (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.assetallocationForm.controls[controlName];
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

  getOfficerList = (): any => {
    this.apiService
      .apiPostCall(AppConstants.NHRC_MODULE.COMM_FORMWARD_LIST, {}, true)
      .subscribe((data) => {
        this.officersList = data.list;
      });
  };

  onItemSelect(item: any) {
    this.selectedOfficerId.push(item.id + '');
    this.assetallocationForm.patchValue({
      allocatedToId: item.id,
    });
  }

  focusOut = (event, name) => {
    this.assetallocationForm.patchValue({
      [name]: event.target.value,
    });
  };
}
