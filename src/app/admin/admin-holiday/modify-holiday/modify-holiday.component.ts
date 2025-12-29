import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-modify-holiday',
  templateUrl: './modify-holiday.component.html',
  styleUrls: ['./modify-holiday.component.scss'],
})
export class ModifyHolidayComponent implements OnInit, OnDestroy {
  subscription: any;
  holiday: any;
  loading = false;
  holidayForm: UntypedFormGroup;

  ADD_HOLIDAY: boolean;
  EDIT_HOLIDAY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  HOLIDAY_PARAMS = {
    ID: null,
    HOLIDAYNAME: '',
    HOLIDAYDATE: null,
    HOLIDAYENDDATE: null,
    PRIORITY: '',
  };

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.holiday = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.holiday) {
      this.HOLIDAY_PARAMS.ID = this.holiday.id;
      this.HOLIDAY_PARAMS.HOLIDAYNAME = this.holiday.holidayName;

      var holidayStart = new Date(this.holiday.holidayDate);

      this.HOLIDAY_PARAMS.HOLIDAYDATE = this.formatter.format({
        year: holidayStart.getFullYear(),
        month: holidayStart.getMonth() + 1,
        day: holidayStart.getDate(),
      });

      this.fromDate = new NgbDate(
        holidayStart.getFullYear(),
        holidayStart.getMonth() + 1,
        holidayStart.getDate()
      );

      var holidayEnd = new Date(this.holiday.holidayEndDate);
      this.HOLIDAY_PARAMS.HOLIDAYENDDATE = this.formatter.format({
        year: holidayEnd.getFullYear(),
        month: holidayEnd.getMonth() + 1,
        day: holidayEnd.getDate(),
      });

      this.toDate = new NgbDate(
        holidayEnd.getFullYear(),
        holidayEnd.getMonth() + 1,
        holidayEnd.getDate()
      );

      this.HOLIDAY_PARAMS.PRIORITY = this.holiday.priority;
    }

    this.ADD_HOLIDAY = this.global.checkForUserButtonPermission(
      AppConstants.HOLIDAY_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_HOLIDAY = this.global.checkForUserButtonPermission(
      AppConstants.HOLIDAY_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.HOLIDAY_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.HOLIDAY_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initHolidayForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initHolidayForm = () => {
    this.holidayForm = this.fb.group({
      id: this.HOLIDAY_PARAMS.ID,
      holidayName: [
        this.HOLIDAY_PARAMS.HOLIDAYNAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      holidayDate: [
        this.HOLIDAY_PARAMS.HOLIDAYDATE,
        Validators.compose([Validators.required]),
      ],
      holidayEndDate: [
        this.HOLIDAY_PARAMS.HOLIDAYENDDATE,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.HOLIDAY_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.holidayForm.controls;
    if (this.holidayForm.invalid && !this.holidayForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.fromDate)
      this.holidayForm.patchValue({
        holidayDate: new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day
        ),
      });

    if (this.toDate)
      this.holidayForm.patchValue({
        holidayEndDate: new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        ),
      });

    if (this.holidayForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.holidayForm.value, true)
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

            this.holidayForm.patchValue({
              holidayDate: this.formatter.format(this.fromDate),
            });

            this.holidayForm.patchValue({
              holidayEndDate: this.formatter.format(this.toDate),
            });

            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    else
      this.apiService
        .apiPostCall(this.ADD_URL, this.holidayForm.value, true)
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

            this.holidayForm.patchValue({
              holidayDate: this.formatter.format(this.fromDate),
            });

            this.holidayForm.patchValue({
              holidayEndDate: this.formatter.format(this.toDate),
            });

            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.holidayForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.holidayForm.controls[controlName];
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

      this.holidayForm.patchValue({
        holidayDate: new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day
        ),
      });
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.holidayForm.patchValue({
        holidayEndDate: new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        ),
      });
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.holidayForm.patchValue({
        holidayDate: new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day
        ),
      });
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

  focusOut = (event, name) => {
    this.holidayForm.patchValue({
      [name]: event.target.value,
    });
  };
}
