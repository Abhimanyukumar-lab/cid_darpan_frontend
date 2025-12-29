import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-modify-news-event',
  templateUrl: './modify-news-event.component.html',
  styleUrls: ['./modify-news-event.component.scss'],
})
export class ModifyNewsEventComponent implements OnInit, OnDestroy {
  subscription: any;
  newsEvent: any;
  loading = false;
  newsEventForm: UntypedFormGroup;

  ADD_NEWS_EVENTS: boolean;
  EDIT_NEWS_EVENTS: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  NEWS_EVENTS_PARAMS = {
    ID: null,
    TITLE: '',
    DESCRIPTION: '',
    LINK: '',
    LINKSOURCE: '',
    TYPE: '',
    PRIORITY: '',
    DATE: '',
  };

  date = new Date();

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
    this.newsEvent = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.newsEvent) {
      this.NEWS_EVENTS_PARAMS.ID = this.newsEvent.id;
      this.NEWS_EVENTS_PARAMS.TITLE = this.newsEvent.title;
      this.NEWS_EVENTS_PARAMS.DESCRIPTION = this.newsEvent.description;
      this.NEWS_EVENTS_PARAMS.LINK = this.newsEvent.link;
      this.NEWS_EVENTS_PARAMS.TYPE = this.newsEvent.type;
      this.NEWS_EVENTS_PARAMS.PRIORITY = this.newsEvent.priority;
      this.NEWS_EVENTS_PARAMS.DATE = formatDate(
        this.newsEvent.date,
        'yyyy-MM-dd',
        'en'
      );
    }

    this.ADD_NEWS_EVENTS = this.global.checkForUserButtonPermission(
      AppConstants.NEWS_EVENTS_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NEWS_EVENTS = this.global.checkForUserButtonPermission(
      AppConstants.NEWS_EVENTS_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.NEWS_EVENTS_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.NEWS_EVENTS_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initPressReleaseForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initPressReleaseForm = () => {
    this.newsEventForm = this.fb.group({
      id: this.NEWS_EVENTS_PARAMS.ID,
      title: [
        this.NEWS_EVENTS_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.NEWS_EVENTS_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.NEWS_EVENTS_PARAMS.LINK],
      linkSource: [this.NEWS_EVENTS_PARAMS.LINKSOURCE],
      priority: [
        this.NEWS_EVENTS_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date: [
        this.NEWS_EVENTS_PARAMS.DATE,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.newsEventForm.controls;
    if (this.newsEventForm.invalid && !this.newsEventForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.newsEvent) formData.append('id', this.newsEventForm.value['id']);
    formData.append('title', this.newsEventForm.value['title']);
    formData.append('description', this.newsEventForm.value['description']);
    formData.append('type', 'NEWS_EVENTS');
    formData.append('language', this.language);
    formData.append('priority', this.newsEventForm.value['priority']);
    formData.append(
      'date',
      formatDate(this.newsEventForm.value['date'], 'yyyy/MM/dd', 'en')
    );

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.newsEventForm.value['link']);
    }

    if (this.newsEventForm.value['id'])
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
    const control = this.newsEventForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.newsEventForm.controls[controlName];
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

  handleFileChange = (file: FileList) => {
    this.LINKSOURCE = file.item(0);
  };

  
  focusOut = (event, name) => {
    this.newsEventForm.patchValue({
      [name]: event.target.value,
    });
  };
}
