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
  selector: 'app-modify-rules',
  templateUrl: './modify-rules.component.html',
  styleUrls: ['./modify-rules.component.scss'],
})
export class ModifyRulesComponent implements OnInit, OnDestroy {
  subscription: any;
  rules: any;
  loading = false;
  rulesForm: UntypedFormGroup;

  ADD_RULES: boolean;
  EDIT_RULES: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  RULES_PARAMS = {
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
    this.rules = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.rules) {
      this.RULES_PARAMS.ID = this.rules.id;
      this.RULES_PARAMS.TITLE = this.rules.title;
      this.RULES_PARAMS.DESCRIPTION = this.rules.description;
      this.RULES_PARAMS.LINK = this.rules.link;
      this.RULES_PARAMS.TYPE = this.rules.type;
      this.RULES_PARAMS.PRIORITY = this.rules.priority;
    }

    this.ADD_RULES = this.global.checkForUserButtonPermission(
      AppConstants.RULES_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_RULES = this.global.checkForUserButtonPermission(
      AppConstants.RULES_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.RULES_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.RULES_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initRulesForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initRulesForm = () => {
    this.rulesForm = this.fb.group({
      id: this.RULES_PARAMS.ID,
      title: [
        this.RULES_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.RULES_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.RULES_PARAMS.LINK],
      linkSource: [this.RULES_PARAMS.LINKSOURCE],

      priority: [
        this.RULES_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.rulesForm.controls;
    if (this.rulesForm.invalid && !this.rulesForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.rules) formData.append('id', this.rulesForm.value['id']);
    formData.append('title', this.rulesForm.value['title']);
    formData.append('description', this.rulesForm.value['description']);
    formData.append('type', 'RULES');
    formData.append('priority', this.rulesForm.value['priority']);
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.rulesForm.value['link']);
    }

    if (this.rulesForm.value['id'])
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
    const control = this.rulesForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.rulesForm.controls[controlName];
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
    this.rulesForm.patchValue({
      [name]: event.target.value,
    });
  };

}
