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
  selector: 'app-modify-sections',
  templateUrl: './modify-sections.component.html',
  styleUrls: ['./modify-sections.component.scss'],
})
export class ModifySectionsComponent implements OnInit, OnDestroy {
  subscription: any;
  section: any;
  loading = false;
  sectionForm: UntypedFormGroup;

  ADD_SECTION: boolean;
  EDIT_SECTION: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  SECTION_PARAMS = {
    ID: null,
    NAME: '',
    NAMEHI: '',
    // MOBILE_NO: '',
    // EMAIL: '',
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
    this.section = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.section) {
      this.SECTION_PARAMS.ID = this.section.id;
      this.SECTION_PARAMS.NAME = this.section.headName;
      this.SECTION_PARAMS.NAMEHI = this.section.headTitle;
      this.SECTION_PARAMS.PRIORITY = this.section.priority;
    }

    this.ADD_SECTION = this.global.checkForUserButtonPermission(
      AppConstants.SECTION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SECTION = this.global.checkForUserButtonPermission(
      AppConstants.SECTION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SECTION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SECTION_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initSectionForm = () => {
    this.sectionForm = this.fb.group({
      id: this.SECTION_PARAMS.ID,
      headName: [
        this.SECTION_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      headTitle: [
        this.SECTION_PARAMS.NAMEHI,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.SECTION_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.sectionForm.controls;
    if (this.sectionForm.invalid && !this.sectionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.section) formData.append('id', this.sectionForm.value['id']);
    formData.append('headName', this.sectionForm.value['headName']);
    formData.append('headTitle', this.sectionForm.value['headTitle']);
    formData.append('priority', this.sectionForm.value['priority']);

    if (this.sectionForm.value['id'])
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
    const control = this.sectionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.sectionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
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

  goBack() {
    this._location.back();
  }

  focusOut = (event, name) => {
    this.sectionForm.patchValue({
      [name]: event.target.value,
    });
  };
}
