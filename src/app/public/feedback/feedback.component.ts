import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LangModule } from 'src/app/models/LangModule';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

import { Location } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { FeedBack } from 'src/app/models/FeedBack';

const APP = {
  id: null,
  citizenName: null,
  citizenEmail: null,
  citizenMobile: null,
  districtId: null,
  districtName: null,
  feedbackComments: null,
};

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit, OnDestroy {
  subscription: any;
  districtList: any[];
  questionList: any[];

  feedback: any;
  loading = false;

  appForm: UntypedFormGroup;

  questioAns: any = {};

  alertType: string = '';
  errorMsg: string = '';

  baseUrl: string = AppConstants.backServer;
  feedbacks: FeedBack;
  currrentLang: string;

  constructor(
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    public langModule: LangModule,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private toaster: ToasterService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.feedbacks = data.feedbacks;
      this.currrentLang = data.defaultLang;
    });

    this.initAppForm();

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.GETQUESTIONS, false)
      .subscribe((data) => {
        this.questionList = data.questionDTOs;
      });

    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.ONLYDISTFETCH, false)
      .subscribe((data) => {
        this.districtList = data.districtDTOs;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  initAppForm() {
    this.appForm = this.fb.group({
      id: APP.id,
      citizenName: [APP.citizenName, Validators.compose([Validators.required])],

      feedbackComments: [
        APP.feedbackComments,
        Validators.compose([Validators.required]),
      ],
      citizenEmail: [APP.citizenEmail],
      citizenMobile: [
        APP.citizenMobile,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      districtId: [APP.districtId, Validators.compose([Validators.required])],
    });
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

  submit = () => {
    this.alertType = '';
    this.errorMsg = '';

    this.appStore.dispatch(new AppLoadderShow({}));

    if (Object.keys(this.questioAns).length != this.questionList.length) {
      this.alertType = 'danger';
      this.errorMsg = 'All Question Answers are required';
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    const controls = this.appForm.controls;
    if (this.appForm.invalid && !this.appForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var data = this.appForm.value;
    data.questionAns = this.questioAns;

    this.apiService
      .apiPostCall(AppConstants.PUBLIC_APIS.FEEDBACKADD, data, false)
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;
        },
        (error) => {
          this.loading = false;

          this.alertType = 'danger';
          this.errorMsg = error.message;

          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
    this.appForm.reset();
  };

  isControlHasErrors = (name: string) => {
    return this.global.isControlHasErrors(this.appForm, name);
  };

  isControlHasError = (name: string, methode: string) => {
    return this.global.isControlHasError(this.appForm, name, methode);
  };

  update = (value: string, id: string) => {
    this.questioAns[id] = value;
  };
}
