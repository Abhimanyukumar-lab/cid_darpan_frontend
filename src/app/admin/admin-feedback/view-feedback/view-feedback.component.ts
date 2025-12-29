import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss'],
})
export class ViewFeedbackComponent implements OnInit, OnDestroy {
  feedback: any;
  feedbackAnswers: any[];

  districtId = 'id';
  districtName = 'districtName';
  districtList = [];

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService
  ) {
    this.global.checkForUserPermission(this.router.url);
    this.feedback = this.localStorage.getStoredValue('viewData');
    this.fetchData();
  }
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.FEEDBACK_MODULE.FETCH_VIEW_DATA,
        { id: this.feedback.id },
        true
      )
      .subscribe((data) => {
        this.feedback = data.feedBackDTO;
        this.feedbackAnswers = data.feedBackDTO.feedBackAnswersDTO;
      });
  };

  goBack() {
    this._location.back();
  }
}
