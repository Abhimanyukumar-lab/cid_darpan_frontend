import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  RefreshTableAndForm,
} from 'src/app/storage/actions/app.actions';

import { LangModule } from 'src/app/models/LangModule';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-court-details-form',
  templateUrl: './court-details-form.component.html',
  styleUrls: ['./court-details-form.component.scss'],
})
export class CourtDetailsFormComponent implements OnInit, OnDestroy {
  subscription: any;
  url: string = AppConstants.COURT_DETAILS_MODULE.ADD_COURT_DETAILS;
  backUrl: string;
  id: number;

  courtDetailsPath: string =
    AppConstants.COURT_DETAILS_MODULE.FETCH_COURT_DETAILS_LIST;
  courtDetailsDeleteCode: string = null;
  courtDetailsDeleteUrl: string = null;
  courtDetailsModule: string = 'COURT';
  courtDetailsId: number = null;

  language: string;

  loading: boolean = false;
  min: Date = new Date();
  COURTDETAILS_PARAM = {
    ID: null,
    NEXTDATE: null,
    DISCRIPTION: null,
  };

  courtDetailsForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    private localStorage: LocalstorageService,
    public langModule: LangModule,
    private router: Router
  ) {
    this.id = this.localStorage.getStoredValue('courtValue');
    this.backUrl = this.localStorage.getStoredValue('courtUrl');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
  }

  ngOnInit(): void {
    this.COURTDETAILS_PARAM.ID = this.id;
    this.courtDetailsId = this.id;

    this.initCourtDetailsForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('courtValue');
    this.localStorage.destroyStoredValue('courtUrl');
    this.subscription.unsubscribe();
  }

  initCourtDetailsForm = () => {
    this.courtDetailsForm = this.fb.group({
      id: [
        this.COURTDETAILS_PARAM.ID,
        Validators.compose([Validators.required]),
      ],

      nextDate: [
        this.COURTDETAILS_PARAM.NEXTDATE,
        Validators.compose([Validators.required]),
      ],
      description: [
        this.COURTDETAILS_PARAM.DISCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  };

  submitChangeStatus = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.courtDetailsForm.controls;
    if (this.courtDetailsForm.invalid && !this.courtDetailsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();
    formData.append('courtId', this.courtDetailsForm.value['id']);
    formData.append('nextDate', this.courtDetailsForm.value['nextDate']);
    formData.append('description', this.courtDetailsForm.value['description']);

    if (this.courtDetailsForm.value['id'])
      this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.loading = false;
          this.courtDetailsForm.reset();
    this.initCourtDetailsForm();
    // this.initCourtDetailsForm();
          // this.localStorage.setStoredValue('courtValue', data.id);
          // this.router.navigate(['/official/supremeCourt']);
          // this.appStore.dispatch(new RefreshViewDataStart(true));
          // this.appStore.dispatch(new UpdateTableDetails(true));
          // this.appStore.dispatch(new RefreshTableAndForm(true));
          this.appStore.dispatch(new RefreshTableAndForm(true));
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
    else
      this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.loading = false;
          this.courtDetailsForm.reset();
          this.initCourtDetailsForm();

          //this.localStorage.setStoredValue('courtValue', data.id);
          ///this.router.navigate(['/official/supremeCourt']);
          // this.appStore.dispatch(new RefreshViewDataStart(true));
          // this.appStore.dispatch(new UpdateTableDetails(true));
          // this.appStore.dispatch(new RefreshTableAndForm(true));
          this.appStore.dispatch(new RefreshTableAndForm(true));
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.courtDetailsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.courtDetailsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  focusOut = (event, name) => {
    this.courtDetailsForm.patchValue({
      [name]: event.target.value,
    });
  };
}
