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
  selector: 'app-modify-headlines',
  templateUrl: './modify-headlines.component.html',
  styleUrls: ['./modify-headlines.component.scss']
})
export class ModifyHeadlinesComponent implements OnInit, OnDestroy {

  headlines: any;
  loading = false;
  headlinesForm: UntypedFormGroup;

  ADD_HEADLINES: boolean;
  EDIT_HEADLINES: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;

  HEADLINES_PARAMS = {
    ID: null,
    NAME: '',
    URL: '',
    LINKSOURCE: '',
    TYPE: '',
    PRIORITY: '',
    DESCRIPTION: '',
  };

  constructor(
    private appStore: Store<{ auth: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule
  ) {
    this.headlines = this.localStorage.getStoredValue('editData');

    if (this.headlines) {
      this.HEADLINES_PARAMS.ID = this.headlines.id;
      this.HEADLINES_PARAMS.NAME = this.headlines.name;
      this.HEADLINES_PARAMS.URL = this.headlines.url;
      this.HEADLINES_PARAMS.TYPE = this.headlines.type;
      this.HEADLINES_PARAMS.PRIORITY = this.headlines.priority;
      this.HEADLINES_PARAMS.DESCRIPTION = this.headlines.desc;
    }

    this.ADD_HEADLINES = this.global.checkForUserButtonPermission(
      AppConstants.HEADLINES_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_HEADLINES = this.global.checkForUserButtonPermission(
      AppConstants.HEADLINES_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.HEADLINES_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.HEADLINES_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initBannerForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initBannerForm = () => {
    this.headlinesForm = this.fb.group({
      id: this.HEADLINES_PARAMS.ID,
      name: [
        this.HEADLINES_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      url: [this.HEADLINES_PARAMS.URL],
      type: [
        this.HEADLINES_PARAMS.TYPE,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.HEADLINES_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      desc: [
        this.HEADLINES_PARAMS.DESCRIPTION,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.headlinesForm.controls;
    if (this.headlinesForm.invalid && !this.headlinesForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.headlines) formData.append('id', this.headlinesForm.value['id']);
    formData.append('name', this.headlinesForm.value['name']);
    formData.append('type', this.headlinesForm.value['type']);
    formData.append('priority', this.headlinesForm.value['priority']);
    formData.append('url', this.LINKSOURCE, this.LINKSOURCE.name);
    formData.append('desc', this.headlinesForm.value['desc']);

    if (this.headlinesForm.value['id'])
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
    const control = this.headlinesForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.headlinesForm.controls[controlName];
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
    this.headlinesForm.patchValue({
      [name]: event.target.value,
    });
  };
}
