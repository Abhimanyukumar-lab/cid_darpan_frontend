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
  selector: 'app-modify-banner',
  templateUrl: './modify-banner.component.html',
  styleUrls: ['./modify-banner.component.scss'],
})
export class ModifyBannerComponent implements OnInit, OnDestroy {
  subscription: any;
  banner: any;
  loading = false;
  bannerForm: UntypedFormGroup;

  ADD_BANNER: boolean;
  EDIT_BANNER: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  BANNER_PARAMS = {
    ID: null,
    NAME: '',
    URL: '',
    LINKSOURCE: '',
    TYPE: null,
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
    this.banner = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.banner) {
      this.BANNER_PARAMS.ID = this.banner.id;
      this.BANNER_PARAMS.NAME = this.banner.name;
      this.BANNER_PARAMS.URL = this.banner.url;
      this.BANNER_PARAMS.TYPE = this.banner.type;
      this.BANNER_PARAMS.PRIORITY = this.banner.priority;
    }

    this.ADD_BANNER = this.global.checkForUserButtonPermission(
      AppConstants.BANNER_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_BANNER = this.global.checkForUserButtonPermission(
      AppConstants.BANNER_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.BANNER_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.BANNER_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initBannerForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initBannerForm = () => {
    this.bannerForm = this.fb.group({
      id: this.BANNER_PARAMS.ID,
      name: [
        this.BANNER_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      url: [this.BANNER_PARAMS.URL],
      type: [
        this.BANNER_PARAMS.TYPE,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.BANNER_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.bannerForm.controls;
    if (this.bannerForm.invalid && !this.bannerForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.banner) formData.append('id', this.bannerForm.value['id']);
    formData.append('name', this.bannerForm.value['name']);
    formData.append('type', this.bannerForm.value['type']);
    formData.append('priority', this.bannerForm.value['priority']);
    if (this.LINKSOURCE)
      formData.append('url', this.LINKSOURCE, this.LINKSOURCE.name);

    if (this.bannerForm.value['id'])
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
    const control = this.bannerForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.bannerForm.controls[controlName];
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
    this.bannerForm.patchValue({
      [name]: event.target.value,
    });
  };

}
