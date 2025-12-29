import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  selector: 'app-modify-questions',
  templateUrl: './modify-questions.component.html',
  styleUrls: ['./modify-questions.component.scss'],
})
export class ModifyQuestionsComponent implements OnInit, OnDestroy {
  subscription: any;
  question: any;
  loading = false;
  questionForm: UntypedFormGroup;

  ADD_QUESTION: boolean;
  EDIT_QUESTION: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  QUESTION_PARAMS = {
    ID: null,
    NAME: '',
    // DESCRIPTION: '',
    ANSWER1: '',
    ANSWER2: '',
    ANSWER3: '',
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
    this.question = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.question) {
      this.QUESTION_PARAMS.ID = this.question.id;
      this.QUESTION_PARAMS.NAME = this.question.questionName;
      // this.QUESTION_PARAMS.DESCRIPTION = this.question.questionDescription;
      this.QUESTION_PARAMS.ANSWER1 = this.question.answer1Title;
      this.QUESTION_PARAMS.ANSWER2 = this.question.answer2Title;
      this.QUESTION_PARAMS.ANSWER3 = this.question.answer3Title;
    }

    this.ADD_QUESTION = this.global.checkForUserButtonPermission(
      AppConstants.QUESTION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_QUESTION = this.global.checkForUserButtonPermission(
      AppConstants.QUESTION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.QUESTION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.QUESTION_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initSubdivisionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initSubdivisionForm = () => {
    this.questionForm = this.fb.group({
      id: this.QUESTION_PARAMS.ID,
      questionName: [
        this.QUESTION_PARAMS.NAME,
        Validators.compose([Validators.required]),
      ],
      // questionDescription: [
      //   this.QUESTION_PARAMS.DESCRIPTION,
      //   Validators.compose([Validators.required]),
      // ],
      answer1Title: [
        this.QUESTION_PARAMS.ANSWER1,
        Validators.compose([Validators.required]),
      ],
      answer2Title: [
        this.QUESTION_PARAMS.ANSWER2,
        Validators.compose([Validators.required]),
      ],
      answer3Title: [
        this.QUESTION_PARAMS.ANSWER3,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.questionForm.controls;
    if (this.questionForm.invalid && !this.questionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.question) formData.append('id', this.questionForm.value['id']);
    formData.append('questionName', this.questionForm.value['questionName']);
    // formData.append('questionDescription', this.questionForm.value['questionDescription']);
    formData.append('answer1Title', this.questionForm.value['answer1Title']);
    formData.append('answer2Title', this.questionForm.value['answer2Title']);
    formData.append('answer3Title', this.questionForm.value['answer3Title']);

    if (this.questionForm.value['id'])
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
    const control = this.questionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.questionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  focusOut = (event, name) => {
    this.questionForm.patchValue({
      [name]: event.target.value,
    });
  };
}
