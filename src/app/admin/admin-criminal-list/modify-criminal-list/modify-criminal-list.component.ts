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
  selector: 'app-modify-criminal-list',
  templateUrl: './modify-criminal-list.component.html',
  styleUrls: ['./modify-criminal-list.component.scss'],
})
export class ModifyCriminalListComponent implements OnInit, OnDestroy {
  subscription: any;
  criminalList: any;
  loading = false;
  criminalListForm: UntypedFormGroup;

  ADD_CRIMINAL_LIST: boolean;
  EDIT_CRIMINAL_LIST: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  CRIMINAL_LIST_PARAMS = {
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
    this.criminalList = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.criminalList) {
      this.CRIMINAL_LIST_PARAMS.ID = this.criminalList.id;
      this.CRIMINAL_LIST_PARAMS.TITLE = this.criminalList.title;
      this.CRIMINAL_LIST_PARAMS.DESCRIPTION = this.criminalList.description;
      this.CRIMINAL_LIST_PARAMS.LINK = this.criminalList.link;
      this.CRIMINAL_LIST_PARAMS.TYPE = this.criminalList.type;
      this.CRIMINAL_LIST_PARAMS.PRIORITY = this.criminalList.priority;
    }

    this.ADD_CRIMINAL_LIST = this.global.checkForUserButtonPermission(
      AppConstants.CRIMINAL_LIST_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_CRIMINAL_LIST = this.global.checkForUserButtonPermission(
      AppConstants.CRIMINAL_LIST_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.CRIMINAL_LIST_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.CRIMINAL_LIST_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initCriminalListForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initCriminalListForm = () => {
    this.criminalListForm = this.fb.group({
      id: this.CRIMINAL_LIST_PARAMS.ID,
      title: [
        this.CRIMINAL_LIST_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.CRIMINAL_LIST_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.CRIMINAL_LIST_PARAMS.LINK],
      linkSource: [this.CRIMINAL_LIST_PARAMS.LINKSOURCE],
      priority: [
        this.CRIMINAL_LIST_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.criminalListForm.controls;
    if (this.criminalListForm.invalid && !this.criminalListForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.criminalList)
      formData.append('id', this.criminalListForm.value['id']);
    formData.append('title', this.criminalListForm.value['title']);
    formData.append('description', this.criminalListForm.value['description']);
    formData.append('priority', this.criminalListForm.value['priority']);
    formData.append('type', 'CRIMINAL');
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.criminalListForm.value['link']);
    }

    if (this.criminalListForm.value['id'])
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
    const control = this.criminalListForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.criminalListForm.controls[controlName];
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
    this.criminalListForm.patchValue({
      [name]: event.target.value,
    });
  };
}
