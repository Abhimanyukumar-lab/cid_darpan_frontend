import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RefreshViewDataStop } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-procecution',
  templateUrl: './view-procecution.component.html',
  styleUrls: ['./view-procecution.component.scss'],
})
export class ViewProcecutionComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  procecution: any;

  procecutionDetailsPath: string =
    AppConstants.PROCECUTION_DETAILS_MODULE.FETCH_PROC_DETAILS_LIST;
  procecutionDetailsDeleteCode: string = null;
  procecutionDetailsDeleteUrl: string = null;
  procecutionDetailsModule: string = 'PROCECUTION';
  procecutionDetailsId: number = null;

  changeStatusPath: string = AppConstants.PROCECUTION_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'PROCECUTION';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.PROCECUTION_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'PROCECUTION';
  forwardDestinationId: number = null;

  forwardExtraInputLabel = 'CHARACTER.DISPATCH_NO';
  forwardExtraInputPlaceholder = 'CHARACTER.SEL_DISPATCH_NO';
  forwardExtraInputName = 'dispatchNo';
  forwardExtraInputFormControl = new UntypedFormControl(null);

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;

  // change status dropdown options
  changeStatusForModule: string = 'PROCECUTION';
  moduleStatus: string = null;

  receiptNo = new UntypedFormControl('');
  isReceiptBlock: boolean = false;
  isComplete: boolean = false;
  permissions: Permissions = new Permissions();

  view: boolean = false;
  table: boolean = false;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.procecution = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.procecutionDetailsId = this.procecution.id;
    this.changeStatusId = this.procecution.id;
    this.forwardDestinationId = this.procecution.id;

    this.changeStatusSubmitURL =
      AppConstants.PROCECUTION_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.PROCECUTION_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.PROCECUTION_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.PROCECUTION_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.PROCECUTION_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.PROCECUTION_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.PROCECUTION_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.PROCECUTION_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.PROCECUTION_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.PROCECUTION_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.PROCECUTION_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.PROCECUTION_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.procecutionList = this.global.checkForUserButtonPermission(
      AppConstants.PROCECUTION_MODULE.PROC_DETAILS_TABLE
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
        AppConstants.PROCECUTION_MODULE.FETCH_VIEW_DATA,
        { id: this.procecution.id },
        true
      )
      .subscribe((data) => {
        this.procecution = data.procecutionDTO;

        if (!this.procecution.reciptNo) {
          this.isReceiptBlock = true;
        } else {
          this.isReceiptBlock = false;
        }
        
        this.moduleStatus = this.procecution.status;

        this.isComplete =
          AppConstants.PROCECUTION_MODULE.COPM_CLOSED != this.procecution.status
            ? AppConstants.PROCECUTION_MODULE.COPM_REJECT !=
              this.procecution.status
            : false;
      });
  };

  submitRecieptNo = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.PROCECUTION_MODULE.SUBMIT_REC_NO,
        {
          id: this.procecution.id,
          reciptNo: this.receiptNo.value,
        },
        true
      )
      .subscribe((data) => {
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
