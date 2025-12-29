import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  RefreshViewDataStart,
  RefreshViewDataStop,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-ecomm-receipt',
  templateUrl: './view-ecomm-receipt.component.html',
  styleUrls: ['./view-ecomm-receipt.component.scss'],
})
export class ViewEcommReceiptComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  ecomReceipt: any;

  changeStatusPath: string =
    AppConstants.ECOM_RECEIPT_MODULE.FETCH_CHANGE_STATUS_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'RECEIPT';
  assignForModule: string = 'RECEIPT';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.ECOM_RECEIPT_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'RECEIPT';
  forwardDestinationId: number = null;

  forwardExtraInputLabel = 'ECOM_DISPATCH.DISP_NO';
  forwardExtraInputPlaceholder = 'ECOM_DISPATCH.DISP_NO';
  forwardExtraInputName = 'dispatchNo';
  forwardExtraInputFormControl = new UntypedFormControl(null);

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;

  // change status dropdown options
  changeStatusForModule: string = 'RECEIPT';
  moduleStatus: string = null;

  receiptNo = new UntypedFormControl('');
  isComplete: boolean = false;
  isReceiptBlock: boolean = false;
  permissions: Permissions = new Permissions();

  view: boolean = false;
  table: boolean = false;

  createdBy: number = null;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private authStore: Store<{ auth: any }>
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.authStore.pipe(select('auth')).subscribe((data) => {
      if (data) {
        this.createdBy = data.user.id;
      }
    });

    this.global.checkForUserPermission(this.router.url);
    this.ecomReceipt = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.ecomReceipt.id;
    this.forwardDestinationId = this.ecomReceipt.id;

    this.changeStatusSubmitURL =
      AppConstants.ECOM_RECEIPT_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.ECOM_RECEIPT_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.ECOM_RECEIPT_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.ECOM_RECEIPT_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.ECOM_RECEIPT_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.ECOM_RECEIPT_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.ECOM_RECEIPT_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_RECEIPT_MODULE.CHANGE_STATUS_FORM_ALL
      ) ||
      (this.global.checkForUserButtonPermission(
        AppConstants.ECOM_RECEIPT_MODULE.CHANGE_STATUS_FORM
      ) &&
        this.ecomReceipt.createdBy == this.createdBy);

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_RECEIPT_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_RECEIPT_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_RECEIPT_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.ECOM_RECEIPT_MODULE.FORWARD_TO_OFFICER_FORM
      );
  }
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isViewDataRefresh) {
        this.appStore.dispatch(new RefreshViewDataStop({}));
        this.fetchData();
      }

      this.table = data.isTableRefresh;
      this.view = data.isViewDataRefresh;
    });
  }

  goBack() {
    this._location.back();
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.ECOM_RECEIPT_MODULE.FETCH_VIEW_URL,
        { id: this.ecomReceipt.id },
        true
      )
      .subscribe((data) => {
        this.ecomReceipt = data.ecomm;

        if (!this.ecomReceipt.reciptNo) {
          if (
            this.global.checkForUserButtonPermission(
              AppConstants.ECOM_RECEIPT_MODULE.ECOMM_RECIPT_ALLOWED
            )
          ) {
            this.isReceiptBlock = false;
          } else {
            this.isReceiptBlock = true;
          }
        } else {
          this.isReceiptBlock = false;
        }
        // this.isComplete =
        //   AppConstants.ECOM_RECEIPT_MODULE.COPM_CLOSED !=
        //   this.ecomReceipt.updateStatus
        //     ? AppConstants.ECOM_RECEIPT_MODULE.COPM_REJECT !=
        //       this.ecomReceipt.updateStatus
        //     : false;

        this.moduleStatus = this.ecomReceipt.ecommStatus;
      });
  };

  submitRecieptNo = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.ECOM_RECEIPT_MODULE.SUBMIT_REC_NO,
        {
          id: this.ecomReceipt.id,
          shift: this.receiptNo.value,
        },
        true
      )
      .subscribe((data) => {
        this.appStore.dispatch(new RefreshViewDataStart({}));
        this.receiptNo.setValue('');
        this.fetchData();
      });
  };

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
