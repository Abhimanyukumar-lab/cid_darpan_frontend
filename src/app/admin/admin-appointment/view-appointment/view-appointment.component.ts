import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ModelService } from 'src/app/common/popup/model.service';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  RefreshTableAndForm,
  RefreshViewDataStop,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss'],
})
export class ViewAppointmentComponent implements OnInit, OnDestroy {
  subscription: any;

  baseUrl: string = AppConstants.backServer;
  appointment: any;

  language: string;

  changeStatusPath: string = AppConstants.APPOINTMENT_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'APPOINTMENT';
  changeStatusId: number = null;

  changeStatusExtraInputLabel = 'APPOINTMENT.VISITOT_ID';
  changeStatusExtraInputPlaceholder = 'APPOINTMENT.ENTR_VISITOT_ID';
  changeStatusExtraInputName = 'visitor_id';
  changeStatusExtraInputFormControl = new UntypedFormControl(null);

  smsSendingPath: string = AppConstants.APPOINTMENT_MODULE.FETCH_SMS_URL;
  smsSendingModule: string = 'APPOINTMENT';
  smsSendingId: number = null;

  complaintSMS: string = 'appointment';
  // change status dropdown options
  changeStatusForModule: string = 'APPOINTMENT';
  moduleStatus: string = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  smsSendingSubmitURL: string;

  isComplete: boolean = false;
  isPending: boolean = false;
  isAccepted: boolean = false;
  isRejected: boolean = false;
  permissions: Permissions = new Permissions();

  view: boolean = false;
  table: boolean = false;

  discription = new UntypedFormControl('');
  appDate = new UntypedFormControl('');
  shift = new UntypedFormControl('');

  showshift10to12: boolean = false;
  showshift12to02: boolean = false;
  showshift02to04: boolean = false;
  showshift04to06: boolean = false;

  min: Date = new Date();

  currentYear = this.min.getFullYear();
  currentMonth = this.min.getMonth();
  currentDay = this.min.getDate();
  currentTime = this.min.getHours();

  appHistoryPermission: boolean = false;
  appHistoryPath: string =
    AppConstants.APPOINTMENT_MODULE.APPOINTMENT_HISTORY_URL;

  time = { hour: 10, minute: 0 };
  meridian = true;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    private modelService: ModelService
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.appointment = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.appointment.id;
    this.smsSendingId = this.appointment.id;

    this.changeStatusSubmitURL =
      AppConstants.APPOINTMENT_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.APPOINTMENT_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.smsSendingSubmitURL =
      AppConstants.APPOINTMENT_MODULE.SMS_SENDING_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.APPOINTMENT_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.APPOINTMENT_MODULE.DETELE_CHECK_STATUS_URL;

    this.permissions.changeStatusForm = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.CHANGE_STATUS_FORM
    );

    this.permissions.asssignToOfficer = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.ASSIGN_TO_OFFICER_FORM
    );

    this.permissions.changeStatusList = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.CHANGE_STATUS_TABLE
    );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.SMS_TO_USER_TABLE
    );

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.ACCEPT_REJECT
    );

    this.appHistoryPermission = this.global.checkForUserButtonPermission(
      AppConstants.APPOINTMENT_MODULE.APPOINTMENT_HISTORY
    );

    this.permissions.view_url =
      AppConstants.APPOINTMENT_MODULE.ACCEPT_REJECT_URL;

    var shift = this.min.getHours();
    if (shift <= 8) {
      this.showshift10to12 = true;
      this.showshift12to02 = true;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    } else if (shift >= 8 && shift <= 10) {
      this.showshift10to12 = false;
      this.showshift12to02 = true;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    } else if (shift >= 10 && shift <= 12) {
      this.showshift10to12 = false;
      this.showshift12to02 = false;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    } else if (shift >= 12 && shift <= 14) {
      this.showshift10to12 = false;
      this.showshift12to02 = false;
      this.showshift02to04 = false;
      this.showshift04to06 = true;
    } else if (shift > 14) {
      this.min.setDate(this.min.getDate() + 1);

      this.showshift10to12 = true;
      this.showshift12to02 = true;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    }
  }
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
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

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.APPOINTMENT_MODULE.FETCH_VIEW_DATA,
        { id: this.appointment.id },
        true
      )
      .subscribe((data) => {
        this.appointment = data.appointmentDTO;

        this.moduleStatus = this.appointment.status;

        this.isComplete =
          AppConstants.APPOINTMENT_MODULE.COPM_CANCELE != this.appointment.status
            ? AppConstants.APPOINTMENT_MODULE.COPM_COMPLETE !=
              this.appointment.status
            : false;

        this.isPending = this.appointment.status == AppConstants.PENDING;
        this.isAccepted = this.appointment.status == AppConstants.ACCEPT;
        this.isRejected = this.appointment.status == AppConstants.REJECT;
      });
  };

  openModal = (id: string) => {
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };

  acceptApp = (acceptReject: number, id: string) => {
    this.apiCaller
      .apiPostCall(
        AppConstants.APPOINTMENT_MODULE.ACCEPT_REJECT_URL,
        {
          id: this.appointment.id,
          agreeReject: acceptReject,
          discription: this.discription.value,
        },
        true
      )
      .subscribe((data) => {
        this.discription.setValue('');
        this.closeModal(id);
        this.fetchData();
      });
  };

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

  doCkeckTodayDate = () => {
    var date = new Date(this.appDate.value);
    var shift = date.getHours();
    if (shift <= 8) {
      this.showshift10to12 = true;
      this.showshift12to02 = true;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    } else if (shift >= 8 && shift <= 10) {
      this.showshift10to12 = false;
      this.showshift12to02 = true;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    } else if (shift >= 10 && shift <= 12) {
      this.showshift10to12 = false;
      this.showshift12to02 = false;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    } else if (shift >= 12 && shift <= 14) {
      this.showshift10to12 = false;
      this.showshift12to02 = false;
      this.showshift02to04 = false;
      this.showshift04to06 = true;
    } else if (shift > 14) {
      this.min.setDate(this.min.getDate() + 1);

      this.showshift10to12 = true;
      this.showshift12to02 = true;
      this.showshift02to04 = true;
      this.showshift04to06 = true;
    }
  };

  rescheduleApp = (id: string) => {
    this.apiCaller
      .apiPostCall(
        AppConstants.APPOINTMENT_MODULE.RESCHEDULE_URL,
        {
          id: this.appointment.id,
          discription: this.discription.value,
          shift:
            (this.time.hour > 12 ? this.time.hour - 12 : this.time.hour) +
            ':' +
            (this.time.minute == 0
              ? '0' + this.time.minute
              : this.time.minute < 10
              ? '0' + this.time.minute
              : this.time.minute) +
            ' ' +
            (this.time.hour >= 12 ? 'PM' : 'AM'),
          appDate: this.appDate.value,
        },
        true
      )
      .subscribe((data) => {
        this.discription.setValue('');
        this.shift.setValue('');
        this.appDate.setValue('');
        this.closeModal(id);
        this.fetchData();

        this.appStore.dispatch(new RefreshTableAndForm(true));
      });
  };

  
  focusOut = (event, name) => {
    this.appointment.patchValue({
      [name]: event.target.value,
    });
  };
}
