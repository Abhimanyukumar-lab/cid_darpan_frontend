import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-modify-acts',
  templateUrl: './modify-acts.component.html',
  styleUrls: ['./modify-acts.component.scss'],
})
export class ModifyActsComponent implements OnInit, OnDestroy {
  subscription: any;

  acts: any;
  loading = false;
  actsForm: UntypedFormGroup;

  ADD_ACTS: boolean;
  EDIT_ACTS: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  ACTS_PARAMS = {
    ID: null,
    TITLE: '',
    DESCRIPTION: '',
    LINK: '',
    LINKSOURCE: '',
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
    this.acts = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.acts) {
      this.ACTS_PARAMS.ID = this.acts.id;
      this.ACTS_PARAMS.TITLE = this.acts.title;
      this.ACTS_PARAMS.DESCRIPTION = this.acts.description;
      this.ACTS_PARAMS.LINK = this.acts.link;
      this.ACTS_PARAMS.TYPE = this.acts.type;
      this.ACTS_PARAMS.PRIORITY = this.acts.priority;
    }

    this.ADD_ACTS = this.global.checkForUserButtonPermission(
      AppConstants.ACTS_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ACTS = this.global.checkForUserButtonPermission(
      AppConstants.ACTS_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ACTS_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ACTS_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initActsForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initActsForm = () => {
    this.actsForm = this.fb.group({
      id: this.ACTS_PARAMS.ID,
      title: [
        this.ACTS_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.ACTS_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.ACTS_PARAMS.LINK],
      linkSource: [this.ACTS_PARAMS.LINKSOURCE],

      priority: [
        this.ACTS_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.actsForm.controls;
    if (this.actsForm.invalid && !this.actsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.acts) formData.append('id', this.actsForm.value['id']);
    formData.append('title', this.actsForm.value['title']);
    formData.append('description', this.actsForm.value['description']);
    formData.append('type', 'ACTS');
    formData.append('priority', this.actsForm.value['priority']);
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.actsForm.value['link']);
    }

    if (this.actsForm.value['id'])
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
    const control = this.actsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.actsForm.controls[controlName];
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
    this.actsForm.patchValue({
      [name]: event.target.value,
    });
  };
}
