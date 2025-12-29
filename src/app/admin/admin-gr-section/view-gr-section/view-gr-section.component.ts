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
  selector: 'app-view-gr-section',
  templateUrl: './view-gr-section.component.html',
  styleUrls: ['./view-gr-section.component.scss'],
})
export class ViewGrSectionComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  grsection: any;

  grSectionDetailsPath: string = AppConstants.GR_MODULE.FETCH_GR_DETAILS_LIST;
  grSectionDetailsDeleteCode: string = null;
  grSectionDetailsDeleteUrl: string = null;
  grSectionDetailsModule: string = 'GRSECTION';
  grSectionDetailsId: number = null;

  changeStatusPath: string = AppConstants.GR_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'GRSECTION';
  changeStatusId: number = null;

  forwardDestinationPath: string = AppConstants.GR_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'GRSECTION';
  forwardDestinationId: number = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;

  forwardExtraInputLabel = 'CHARACTER.DISPATCH_NO';
  forwardExtraInputPlaceholder = 'CHARACTER.SEL_DISPATCH_NO';
  forwardExtraInputName = 'dispatchNo';
  forwardExtraInputFormControl = new UntypedFormControl(null);

  // change status dropdown options
  changeStatusForModule: string = 'GRSECTION';
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
    this.grsection = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.grSectionDetailsId = this.grsection.id;
    this.changeStatusId = this.grsection.id;
    this.forwardDestinationId = this.grsection.id;

    this.changeStatusSubmitURL = AppConstants.GR_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.GR_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.GR_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.GR_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl = AppConstants.GR_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.GR_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.GR_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.GR_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.GR_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.GR_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.GR_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.GR_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.grSectionList = this.global.checkForUserButtonPermission(
      AppConstants.GR_MODULE.GR_DETAILS_TABLE
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
        AppConstants.GR_MODULE.FETCH_VIEW_DATA,
        { id: this.grsection.id },
        true
      )
      .subscribe((data) => {
        this.grsection = data.grSectionDTO;

        if (!this.grsection.reciptNo) {
          this.isReceiptBlock = true;
        } else {
          this.isReceiptBlock = false;
        }
        this.moduleStatus = this.grsection.status;

        this.isComplete =
          AppConstants.GR_MODULE.COPM_CLOSED != this.grsection.status
            ? AppConstants.GR_MODULE.COPM_REJECT != this.grsection.status
            : false;
      });
  };

  submitRecieptNo = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.GR_MODULE.SUBMIT_REC_NO,
        {
          id: this.grsection.id,
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
