import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/events';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { LangModule } from 'src/app/models/LangModule';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-events',
  templateUrl: './modify-events.component.html',
  styleUrls: ['./modify-events.component.scss'],
})
export class ModifyEventsComponent implements OnInit, OnDestroy {
  subscription: any;
  events: any;
  loading = false;
  eventsForm: UntypedFormGroup;

  ADD_EVENTS: boolean;
  EDIT_EVENTS: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  EVENTS_PARAMS = {
    ID: null,
    TITLE: '',
    TYPE: '',
    PRIORITY: '',
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
    this.events = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.events) {
      this.EVENTS_PARAMS.ID = this.events.id;
      this.EVENTS_PARAMS.TITLE = this.events.title;
      this.EVENTS_PARAMS.TYPE = this.events.type;
      this.EVENTS_PARAMS.PRIORITY = this.events.priority;
    }

    this.ADD_EVENTS = this.global.checkForUserButtonPermission(
      AppConstants.EVENTS_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_EVENTS = this.global.checkForUserButtonPermission(
      AppConstants.EVENTS_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.EVENTS_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.EVENTS_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initFormsForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initFormsForm = () => {
    this.eventsForm = this.fb.group({
      id: this.EVENTS_PARAMS.ID,
      title: [
        this.EVENTS_PARAMS.TITLE,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.EVENTS_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.eventsForm.controls;
    if (this.eventsForm.invalid && !this.eventsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.events) formData.append('id', this.eventsForm.value['id']);
    formData.append('title', this.eventsForm.value['title']);
    formData.append('type', 'EVENTS');
    formData.append('priority', this.eventsForm.value['priority']);

    if (this.eventsForm.value['id'])
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

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.eventsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.eventsForm.controls[controlName];
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

  focusOut = (event, name) => {
    this.eventsForm.patchValue({
      [name]: event.target.value,
    });
  };

}
