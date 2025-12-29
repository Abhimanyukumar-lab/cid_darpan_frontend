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
  selector: 'app-modify-peace-commity',
  templateUrl: './modify-peace-commity.component.html',
  styleUrls: ['./modify-peace-commity.component.scss'],
})
export class ModifyPeaceCommityComponent implements OnInit, OnDestroy {
  subscription: any;
  peaceCommity: any;
  loading = false;
  peaceCommityForm: UntypedFormGroup;

  ADD_PEACE_COMMITY: boolean;
  EDIT_PEACE_COMMITY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  PEACE_COMMITY_PARAMS = {
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
    this.peaceCommity = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.peaceCommity) {
      this.PEACE_COMMITY_PARAMS.ID = this.peaceCommity.id;
      this.PEACE_COMMITY_PARAMS.TITLE = this.peaceCommity.title;
      this.PEACE_COMMITY_PARAMS.DESCRIPTION = this.peaceCommity.description;
      this.PEACE_COMMITY_PARAMS.LINK = this.peaceCommity.link;
      this.PEACE_COMMITY_PARAMS.TYPE = this.peaceCommity.type;
      this.PEACE_COMMITY_PARAMS.PRIORITY = this.peaceCommity.priority;
    }

    this.ADD_PEACE_COMMITY = this.global.checkForUserButtonPermission(
      AppConstants.PEACE_COMMITY_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_PEACE_COMMITY = this.global.checkForUserButtonPermission(
      AppConstants.PEACE_COMMITY_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.PEACE_COMMITY_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.PEACE_COMMITY_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initPeaceCommityForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initPeaceCommityForm = () => {
    this.peaceCommityForm = this.fb.group({
      id: this.PEACE_COMMITY_PARAMS.ID,
      title: [
        this.PEACE_COMMITY_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.PEACE_COMMITY_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.PEACE_COMMITY_PARAMS.LINK],
      linkSource: [this.PEACE_COMMITY_PARAMS.LINKSOURCE],
      priority: [
        this.PEACE_COMMITY_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.peaceCommityForm.controls;
    if (this.peaceCommityForm.invalid && !this.peaceCommityForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.peaceCommity)
      formData.append('id', this.peaceCommityForm.value['id']);
    formData.append('title', this.peaceCommityForm.value['title']);
    formData.append('description', this.peaceCommityForm.value['description']);
    formData.append('priority', this.peaceCommityForm.value['priority']);
    formData.append('type', 'PEACE_COMMITY');
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.peaceCommityForm.value['link']);
    }

    if (this.peaceCommityForm.value['id'])
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
    const control = this.peaceCommityForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.peaceCommityForm.controls[controlName];
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
    this.peaceCommityForm.patchValue({
      [name]: event.target.value,
    });
  };
}
