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
  selector: 'app-modify-press-release',
  templateUrl: './modify-press-release.component.html',
  styleUrls: ['./modify-press-release.component.scss'],
})
export class ModifyPressReleaseComponent implements OnInit, OnDestroy {
  subscription: any;
  pressRelease: any;
  loading = false;
  pressReleaseForm: UntypedFormGroup;

  ADD_PRESS_RELEASE: boolean;
  EDIT_PRESS_RELEASE: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  PRESS_RELEASE_PARAMS = {
    ID: null,
    TITLE: '',
    DESCRIPTION: '',
    RELEASEBY: '',
    LINK: '',
    LINKSOURCE: '',
    TYPE: '',
    PRIORITY: '',
    DATE: '',
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
    this.pressRelease = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.pressRelease) {
      this.PRESS_RELEASE_PARAMS.ID = this.pressRelease.id;
      this.PRESS_RELEASE_PARAMS.TITLE = this.pressRelease.title;
      this.PRESS_RELEASE_PARAMS.RELEASEBY = this.pressRelease.releasedBy;
      this.PRESS_RELEASE_PARAMS.DESCRIPTION = this.pressRelease.description;
      this.PRESS_RELEASE_PARAMS.LINK = this.pressRelease.link;
      this.PRESS_RELEASE_PARAMS.TYPE = this.pressRelease.type;
      this.PRESS_RELEASE_PARAMS.PRIORITY = this.pressRelease.priority;
      this.PRESS_RELEASE_PARAMS.DATE = this.pressRelease.date;
    }

    this.ADD_PRESS_RELEASE = this.global.checkForUserButtonPermission(
      AppConstants.PRESS_RELEASE_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_PRESS_RELEASE = this.global.checkForUserButtonPermission(
      AppConstants.PRESS_RELEASE_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.PRESS_RELEASE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.PRESS_RELEASE_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initPressReleaseForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initPressReleaseForm = () => {
    this.pressReleaseForm = this.fb.group({
      id: this.PRESS_RELEASE_PARAMS.ID,
      title: [
        this.PRESS_RELEASE_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.PRESS_RELEASE_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.PRESS_RELEASE_PARAMS.LINK],
      linkSource: [this.PRESS_RELEASE_PARAMS.LINKSOURCE],
      releasedBy: [
        this.PRESS_RELEASE_PARAMS.RELEASEBY,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.PRESS_RELEASE_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date: [
        this.PRESS_RELEASE_PARAMS.DATE,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.pressReleaseForm.controls;
    if (this.pressReleaseForm.invalid && !this.pressReleaseForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.pressRelease)
      formData.append('id', this.pressReleaseForm.value['id']);
    formData.append('title', this.pressReleaseForm.value['title']);
    formData.append('description', this.pressReleaseForm.value['description']);
    formData.append('releasedBy', this.pressReleaseForm.value['releasedBy']);
    formData.append('type', 'PRESS_RELEASE');
    formData.append('priority', this.pressReleaseForm.value['priority']);
    formData.append('language', this.language);
    formData.append('date', this.pressReleaseForm.value['date']);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.pressReleaseForm.value['link']);
    }

    if (this.pressReleaseForm.value['id'])
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
    const control = this.pressReleaseForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.pressReleaseForm.controls[controlName];
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
    this.pressReleaseForm.patchValue({
      [name]: event.target.value,
    });
  };
}
