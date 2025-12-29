import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
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

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one &&
  two &&
  two.year === one.year &&
  two.month === one.month &&
  two.day === one.day;

@Component({
  selector: 'app-view-leave-application',
  templateUrl: './view-leave-application.component.html',
  styleUrls: ['./view-leave-application.component.scss'],
})
export class ViewLeaveApplicationComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  leaveApplication: any;

  leaveApplicationForm: UntypedFormGroup;

  changeStatusPath: string =
    AppConstants.LEAVE_APPLICATION_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'LEAVE';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.LEAVE_APPLICATION_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'LEAVE';
  forwardDestinationId: number = null;

  forwardOfficerList: string =
    AppConstants.LEAVE_APPLICATION_MODULE.USER_FORMWARD_LIST;

  smsSendingPath: string = AppConstants.LEAVE_APPLICATION_MODULE.FETCH_SMS_URL;
  smsSendingModule: string = 'LEAVE';
  smsSendingId: number = null;

  leaveApplicationSMS: string = 'leaveApplication';

  // change status dropdown options
  changeStatusForModule: string = 'LEAVE';
  
  moduleStatus: string = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;
  smsSendingSubmitURL: string;

  rejectReacson = new UntypedFormControl('');
  receiptNo = new UntypedFormControl('');
  isComplete: boolean = false;
  isPending: boolean = false;
  isAccepted: boolean = false;
  permissions: Permissions = new Permissions();
  table: boolean = false;
  view: boolean = false;

  leaveRes: UntypedFormGroup;

  todayDate: Date = new Date();
  minStartDate: NgbDateStruct;
  maxEndDate: NgbDateStruct;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  allowedNoOfDays: number;
  allowedToSelectedDate: boolean = false;

  message: string;

  isSelected: boolean = false;
  isSelectedLEaveType: string = null;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private modelService: ModelService,
    private fb: UntypedFormBuilder
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.leaveApplication = this.localStorage.getStoredValue('viewData');

    this.minStartDate = calendar.getToday();

    this.leaveRes = fb.group({
      newStartDate: new UntypedFormControl('', Validators.required),
      newEndDate: new UntypedFormControl('', Validators.required),
      leaveDescription: new UntypedFormControl('', Validators.required),
      leaveNoOffDays: new UntypedFormControl(
        { value: '', disabled: true },
        Validators.required
      ),
    });

    this.fetchData();

    this.changeStatusId = this.leaveApplication.id;
    this.forwardDestinationId = this.leaveApplication.id;
    this.smsSendingId = this.leaveApplication.id;

    this.changeStatusSubmitURL =
      AppConstants.LEAVE_APPLICATION_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.LEAVE_APPLICATION_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.LEAVE_APPLICATION_MODULE.FORWARD_TO_DESTINATION_SUBMIT;
    this.smsSendingSubmitURL =
      AppConstants.LEAVE_APPLICATION_MODULE.SMS_SENDING_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.LEAVE_APPLICATION_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.LEAVE_APPLICATION_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.LEAVE_APPLICATION_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.LEAVE_APPLICATION_MODULE.DETELE_FORWARD_URL;

    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.LEAVE_APPLICATION_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.LEAVE_APPLICATION_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.LEAVE_APPLICATION_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.LEAVE_APPLICATION_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.LEAVE_APPLICATION_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_APPLICATION_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList =
      this.global.checkForUserButtonPermission(
        AppConstants.LEAVE_APPLICATION_MODULE.SMS_TO_USER_TABLE
      );

    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.LEAVE_APPLICATION_MODULE.ACCEPT_REJECT
    );

    this.permissions.view_url =
      AppConstants.LEAVE_APPLICATION_MODULE.ACCEPT_REJECT_URL;

    appStore.dispatch(new StopEditFormData({}));
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
        AppConstants.LEAVE_APPLICATION_MODULE.FETCH_VIEW_DATA,
        { id: this.leaveApplication.id },
        true
      )
      .subscribe((data) => {
        this.leaveApplication = data.leaveDto;

        this.moduleStatus = this.leaveApplication.status;

        this.isComplete =
          AppConstants.LEAVE_APPLICATION_MODULE.COPM_CLOSED !=
          this.leaveApplication.leaveStatus
            ? AppConstants.LEAVE_APPLICATION_MODULE.COPM_REJECT !=
              this.leaveApplication.leaveStatus
            : false;
            
        this.isPending = this.leaveApplication.status == AppConstants.PENDING;
        this.isAccepted = this.leaveApplication.status == AppConstants.ACCEPT;
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
        AppConstants.LEAVE_APPLICATION_MODULE.ACCEPT_REJECT_URL,
        {
          id: this.leaveApplication.id,
          agreeReject: acceptReject,
          discription: this.rejectReacson.value,
        },
        true
      )
      .subscribe((data) => {
        this.rejectReacson.setValue('');
        this.closeModal(id);
        this.fetchData();
      });
  };

  acceptAppWithChanges = (acceptReject: number, id: string) => {
    this.apiCaller
      .apiPostCall(
        AppConstants.LEAVE_APPLICATION_MODULE.ACCEPT_REJECT_WITH_CHNG_URL,
        {
          id: this.leaveApplication.id,
          agreeReject: acceptReject,
          newStartDate: this.leaveRes.controls['newStartDate'].value,
          newEndDate: this.leaveRes.controls['newEndDate'].value,
          leaveNoOffDays: this.leaveRes.controls['leaveNoOffDays'].value,
          leaveDescription: this.leaveRes.controls['leaveDescription'].value,
        },
        true
      )
      .subscribe((data) => {
        // this.rejectReacson.setValue('');
        this.closeModal(id);
        this.appStore.dispatch(new RefreshTableAndForm({}));
      });
  };

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.leaveApplicationForm?.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.leaveApplicationForm?.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  //RANGE DATE PICKER
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.leaveRes.patchValue({
        newStartDate: this.fromDate,
      });

      // this.maxEndDate = this.calendar.getNext(date, 'd', this.allowedNoOfDays);
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      (equals(date, this.fromDate) || date.after(this.fromDate))
    ) {
      this.toDate = date;

      var date1 = new Date(
        this.fromDate.month + '/' + this.fromDate.day + '/' + this.fromDate.year
      );
      var date2 = new Date(
        this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year
      );

      var Time = date2.getTime() - date1.getTime();
      var Days = Time / (1000 * 3600 * 24); //Diference in Days

      this.leaveRes.patchValue({
        newEndDate: this.toDate,
        leaveNoOffDays: Days + 1,
      });
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.leaveRes.patchValue({
        newStartDate: this.fromDate,
      });

      // this.maxEndDate = this.calendar.getNext(date, 'd', this.allowedNoOfDays);
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
