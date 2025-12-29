import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Resource } from 'src/app/models/Resource';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

// const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
//   one &&
//   two &&
//   two.year === one.year &&
//   two.month === one.month &&
//   two.day === one.day;

const equals = (one: NgbDateStruct, two: NgbDateStruct): boolean => {
  return !!(
    one &&
    two &&
    two.year === one.year &&
    two.month === one.month &&
    two.day === one.day
  );
};



@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'],
})
export class ApplyLeaveComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  leaveForm: UntypedFormGroup;
  isLoading: Boolean = false;
  leaveTypes: any[] = [
    { id: 1, name: 'Sick Leave' },
    { id: 2, name: 'Casual Leave' },
    { id: 3, name: 'Privilege Leave' },
    { id: 4, name: 'Earned Leave' }
  ];
  leaveDaysAllowrd: number = 0;

  resourceId: number;
  districtId: number;

  todayDate: Date = new Date();
  minStartDate: NgbDateStruct;
  maxEndDate: NgbDateStruct;

  leaveFormData: any = {
    LEAVE_TYPE: null,
    START_DATE: null,
    END_DATE: null,
    TOTAL_DAYS: 0,
    REASON: null,
    DESC: null,
  };

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  allowedNoOfDays: number;
  allowedToSelectedDate: boolean = true;

  message: string;
  language: string;

  isSelected: boolean = false;
  isSelectedLEaveType: string = null;

  constructor(
    private fb: UntypedFormBuilder,
    private apiCaller: ApiCallerService,
    private toasterService: ToasterService,
    private globalService: GlobalFunctionsService,
    private router: Router,
    private resourceStore: Store<{ resouce: Resource }>,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private toaster: ToasterService
  ) {
    this.globalService.checkForUserResourcePermission(this.router.url);

    this.subscriptionAuth = this.resourceStore
      .pipe(select('resouce'))
      .subscribe((data) => {
        this.districtId = data.resource.districtId;
        this.resourceId = data.resource.id;
      });

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.minStartDate = calendar.getToday();

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.apiCaller
      .apiPostCall('getLeaveStatus', { id: this.resourceId }, true)
      .subscribe((data) => {
        this.leaveTypes = data.leaveResourceDTO;
      });

    this.initLeaveForm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  initLeaveForm = async () => {
    //const leavetypeIdValue = await this.isSelectedLEaveType();
    this.leaveForm = this.fb.group({
      leavetypeId: [
        this.isSelectedLEaveType,
        Validators.compose([Validators.required]),
      ],
      leaveStartDate: [
        { value: null, disabled: true },
        Validators.compose([Validators.required]),
      ],
      leaveEndDate: [
        { value: null, disabled: true },
        Validators.compose([Validators.required]),
      ],
      leaveNoOffDays: [
        { value: 0, disabled: true },
        Validators.compose([Validators.required]),
      ],
      leaveReason: [null, Validators.compose([Validators.required])],
      leaveDescription: [null, Validators.compose([Validators.required])],
      resourceId: this.resourceId,
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.leaveForm.controls;
    if (this.leaveForm.invalid && !this.leaveForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.isLoading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.leaveForm.enable();
    this.isLoading = true;

    this.leaveForm.value.leavetypeId = this.isSelectedLEaveType;

    this.apiService
      .apiPostCall(
        AppConstants.RESOURCE_LEAVE_MODULE.ADD_SUBMIT_URL,
        this.leaveForm.value,
        true
      )
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );

          this.router.navigate(['officialResource/history']);
          this.leaveForm = null;
          this.initLeaveForm();
          this.allowedToSelectedDate = true;
          this.fromDate = null;
          this.toDate = null;
          this.isLoading = false;

          this.apiCaller
            .apiPostCall('getLeaveStatus', { id: this.resourceId }, true)
            .subscribe((data) => {
              this.leaveTypes = data.leaveResourceDTO;
            });
        },
        (error) => {
          this.isLoading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };




  ngOnInit(): void {}

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.leaveForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.leaveForm.controls[controlName];
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
      this.leaveForm.patchValue({
        leaveStartDate: this.fromDate,
        leaveNoOffDays: 0,
      });

      this.maxEndDate = this.calendar.getNext(date, 'd', this.allowedNoOfDays);
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

      this.leaveForm.patchValue({
        leaveEndDate: this.toDate,
        leaveNoOffDays: Days + 1,
      });
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.leaveForm.patchValue({
        leaveStartDate: this.fromDate,
        leaveNoOffDays: 0,
      });

      this.maxEndDate = this.calendar.getNext(date, 'd', this.allowedNoOfDays);
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

  getSelectedLeaveType = () => {
    var selectedTypeId = this.leaveForm.value['leavetypeId'];
    var data = this.leaveTypes.filter((a) => {
      return a.id == selectedTypeId;
    })[0];

    this.isSelectedLEaveType = data.leaveType.id;

    this.allowedNoOfDays = data.remHoliday - 1;
    this.allowedToSelectedDate = false;

    this.leaveForm.controls['leaveStartDate'].enable();
    this.leaveForm.controls['leaveEndDate'].enable();

    this.leaveForm.controls['leaveStartDate'].reset();
    this.leaveForm.controls['leaveEndDate'].reset();
    this.leaveForm.controls['leaveNoOffDays'].reset();

    this.leaveForm.patchValue({
      leaveNoOffDays: 0,
    });

    this.fromDate = null;
    this.toDate = null;

    this.isSelected = true;
    this.message =
      'NO Of Days are Remaining in ' +
      data.leaveType.leaveCode +
      ' are ' +
      (this.allowedNoOfDays + 1);
  };

focusOut = (event, name) => {
    this.leaveForm.patchValue({
      [name]: event.target.value,
    });
  };
}
