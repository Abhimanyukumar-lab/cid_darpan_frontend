import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModelService } from 'src/app/common/popup/model.service';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  RefreshTableAndForm,
  RefreshViewDataStop,
  StopEditFormData,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-character',
  templateUrl: './view-character.component.html',
  styleUrls: ['./view-character.component.scss'],
})
export class ViewCharacterComponent implements OnInit, OnDestroy {
  subscription: any;

  baseUrl: string = AppConstants.backServer;
  character: any;
  characterForm: any;

  language: string;

  changeStatusPath: string = AppConstants.CHARACTER_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'CHARACTER';
  changeStatusId: number = null;

  changeStatusExtraInputLabel = 'CHARACTER.DIST_MEMO_NO';
  changeStatusExtraInputPlaceholder = 'CHARACTER.ENTR_DIST_MEMO_NO';
  changeStatusExtraInputName = 'districtMemoNo';
  changeStatusExtraInputFormControl = new UntypedFormControl(null);

  forwardDestinationPath: string =
    AppConstants.CHARACTER_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'CHARACTER';
  forwardDestinationId: number = null;

  forwardExtraInputLabel = 'CHARACTER.ADHI_SW_NO';
  forwardExtraInputPlaceholder = 'CHARACTER.ENTR_ADHI_SW_NO';
  forwardExtraInputName = 'add_soft_no';
  forwardExtraInputFormControl = new UntypedFormControl(null);
  forwardExtranInputConditions = null;

  smsSendingPath: string = AppConstants.CHARACTER_MODULE.FETCH_SMS_URL;
  smsSendingModule: string = 'CHARACTER';
  smsSendingId: number = null;

  characterSMS: string = 'character';
  // change status dropdown options
  changeStatusForModule: string = 'CHARACTER';
  characterModuleStatus: string = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;
  smsSendingSubmitURL: string;

  status = new UntypedFormControl(null);
  discription = new UntypedFormControl('');
  rejectReacson = new UntypedFormControl('');
  receiptNo = new UntypedFormControl('');
  isComplete: boolean = false;
  permissions: Permissions = new Permissions();
  table: boolean = false;
  view: boolean = false;

  fileName: string = '';
  isPending: boolean = false;
  isRejected: boolean = false;

  uploadCertSubmitURL: string;
  uploadCertId: number = null;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private modelService: ModelService
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.character = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.character.id;
    this.forwardExtranInputConditions = this.character.addSoftNo;
    this.forwardDestinationId = this.character.id;
    this.smsSendingId = this.character.id;
    this.uploadCertId = this.character.id;

    this.changeStatusSubmitURL =
      AppConstants.CHARACTER_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.CHARACTER_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.CHARACTER_MODULE.FORWARD_TO_DESTINATION_SUBMIT;
    this.smsSendingSubmitURL = AppConstants.CHARACTER_MODULE.SMS_SENDING_SUBMIT;
    this.uploadCertSubmitURL = AppConstants.CHARACTER_MODULE.UPLOADCERT_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.CHARACTER_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.CHARACTER_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.CHARACTER_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.CHARACTER_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.CHARACTER_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.CHARACTER_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.CHARACTER_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.CHARACTER_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.CHARACTER_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList =
      this.global.checkForUserButtonPermission(
        AppConstants.CHARACTER_MODULE.SMS_TO_USER_TABLE
      );

    this.permissions.uploadCertPermission =
      this.global.checkForUserButtonPermission(
        AppConstants.CHARACTER_MODULE.UPLOAD_CERT_FORM
      );

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.ACCEPT_REJECT
    );

    this.permissions.view_url = AppConstants.CHARACTER_MODULE.ACCEPT_REJECT_URL;

    this.permissions.addForm = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.ADD_CHAR_FORM
    );
    this.permissions.addFormUrl =
      AppConstants.CHARACTER_MODULE.ADD_CHAR_FORM_URL;

    this.permissions.editForm = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.EDIT_CHAR_FORM
    );
    this.permissions.editFormUrl =
      AppConstants.CHARACTER_MODULE.EDIT_CHAR_FORM_URL;

    this.permissions.viewForm = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.VIEW_CHAR_FORM
    );
    this.permissions.viewFormUrl =
      AppConstants.CHARACTER_MODULE.VIEW_CHAR_FORM_URL;

    appStore.dispatch(new StopEditFormData({}));
  }
  ngOnDestroy(): void {
    //this.localStorage.destroyStoredValue('viewData');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;

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

  goToOfficerFormPage = () => {
    this.router.navigate(['/official/character/addForm']);
  };

  goToOfficerEditFormPage = () => {
    this.router.navigate(['/official/character/editForm']);
  };

  goToOfficerViewPage = () => {
    this.router.navigate(['/official/character/viewForm']);
  };

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.CHARACTER_MODULE.FETCH_VIEW_DATA,
        { id: this.character.id },
        true
      )
      .subscribe((data) => {
        this.character = data.characterDetailsDTO;

        this.localStorage.setStoredValue('viewData', this.character);
        this.localStorage.setStoredValue('characterValue', this.character.id);
        this.localStorage.setStoredValue('characterUrl', '/official/character');

        this.forwardExtranInputConditions = this.character.addSoftNo;
        this.characterModuleStatus = this.character.status;

        this.isComplete =
          AppConstants.CHARACTER_MODULE.COPM_CLOSED != this.character.status
            ? AppConstants.CHARACTER_MODULE.COPM_REJECT != this.character.status
            : false;

        this.isPending = this.character.status == AppConstants.PENDING;
        if (
          this.character.status == AppConstants.CHARACTER_MODULE.COPM_REJECT
        ) {
          this.isRejected = true;
        }
      });
  };

  openModal = (id: string) => {
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };

  acceptApp = (acceptReject: number, id: string) => {
    if (acceptReject == 0) {
      this.status.patchValue('Character Rejected');
    }
    this.apiCaller
      .apiPostCall(
        AppConstants.CHARACTER_MODULE.ACCEPT_REJECT_URL,
        {
          id: this.character.id,
          agreeReject: acceptReject,
          rejectReason: this.rejectReacson.value,
          status: this.status.value,
          discription: this.discription.value,
          reciptNo: this.receiptNo.value,
        },
        true
      )
      .subscribe((data) => {
        this.rejectReacson.setValue('');
        this.receiptNo.setValue('');
        this.status.setValue('');
        this.discription.setValue('');
        this.closeModal(id);
        // this.appStore.dispatch(new RefreshViewDataStop({}));
        this.appStore.dispatch(new RefreshTableAndForm(true));
        this.fetchData();
      });
    //}
  };

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 31 || charCode < 48 || charCode > 57) &&
      charCode >= 65 &&
      charCode <= 90 &&
      charCode >= 97 &&
      charCode <= 122 &&
      charCode == 32
    ) {
      return false;
    }
    return true;
  }

  focusOut = (event, name) => {
    this.character.patchValue({
      [name]: event.target.value,
    });
  };
}
