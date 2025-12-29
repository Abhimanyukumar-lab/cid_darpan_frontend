import { DatePipe, formatDate, Location } from '@angular/common';
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
  selector: 'app-modify-forms',
  templateUrl: './modify-forms.component.html',
  styleUrls: ['./modify-forms.component.scss'],
})
export class ModifyFormsComponent implements OnInit, OnDestroy {
  subscription: any;
  forms: any;
  loading = false;
  formsForm: UntypedFormGroup;

  ADD_FORMS: boolean;
  EDIT_FORMS: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  FORMS_PARAMS = {
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
    this.forms = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.forms) {
      this.FORMS_PARAMS.ID = this.forms.id;
      this.FORMS_PARAMS.TITLE = this.forms.title;
      this.FORMS_PARAMS.DESCRIPTION = this.forms.description;
      this.FORMS_PARAMS.LINK = this.forms.link;
      this.FORMS_PARAMS.TYPE = this.forms.type;
      this.FORMS_PARAMS.PRIORITY = this.forms.priority;
    }

    this.ADD_FORMS = this.global.checkForUserButtonPermission(
      AppConstants.FORMS_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_FORMS = this.global.checkForUserButtonPermission(
      AppConstants.FORMS_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.FORMS_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.FORMS_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initFormsForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initFormsForm = () => {
    this.formsForm = this.fb.group({
      id: this.FORMS_PARAMS.ID,
      title: [
        this.FORMS_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.FORMS_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.FORMS_PARAMS.LINK],
      linkSource: [this.FORMS_PARAMS.LINKSOURCE],

      priority: [
        this.FORMS_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.formsForm.controls;
    if (this.formsForm.invalid && !this.formsForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.forms) formData.append('id', this.formsForm.value['id']);
    formData.append('title', this.formsForm.value['title']);
    formData.append('description', this.formsForm.value['description']);
    formData.append('type', 'FORMS');
    formData.append('priority', this.formsForm.value['priority']);
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.formsForm.value['link']);
    }

    if (this.formsForm.value['id'])
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
    const control = this.formsForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.formsForm.controls[controlName];
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
    this.formsForm.patchValue({
      [name]: event.target.value,
    });
  };

}
