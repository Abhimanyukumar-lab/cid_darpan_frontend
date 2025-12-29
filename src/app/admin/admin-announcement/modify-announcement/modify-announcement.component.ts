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
  selector: 'app-modify-announcement',
  templateUrl: './modify-announcement.component.html',
  styleUrls: ['./modify-announcement.component.scss'],
})
export class ModifyAnnouncementComponent implements OnInit, OnDestroy {
  subscription: any;
  announcement: any;
  loading = false;
  announcementForm: UntypedFormGroup;

  ADD_ANNOUNCEMENT: boolean;
  EDIT_ANNOUNCEMENT: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  ANNOUNCEMENT_PARAMS = {
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
    this.announcement = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.announcement) {
      this.ANNOUNCEMENT_PARAMS.ID = this.announcement.id;
      this.ANNOUNCEMENT_PARAMS.TITLE = this.announcement.title;
      this.ANNOUNCEMENT_PARAMS.DESCRIPTION = this.announcement.description;
      this.ANNOUNCEMENT_PARAMS.LINK = this.announcement.link;
      this.ANNOUNCEMENT_PARAMS.TYPE = this.announcement.type;
      this.ANNOUNCEMENT_PARAMS.PRIORITY = this.announcement.priority;
    }

    this.ADD_ANNOUNCEMENT = this.global.checkForUserButtonPermission(
      AppConstants.ANNOUNCEMENT_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ANNOUNCEMENT = this.global.checkForUserButtonPermission(
      AppConstants.ANNOUNCEMENT_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ANNOUNCEMENT_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ANNOUNCEMENT_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initAnnouncementForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initAnnouncementForm = () => {
    this.announcementForm = this.fb.group({
      id: this.ANNOUNCEMENT_PARAMS.ID,
      title: [
        this.ANNOUNCEMENT_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.ANNOUNCEMENT_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      link: [this.ANNOUNCEMENT_PARAMS.LINK],
      linkSource: [this.ANNOUNCEMENT_PARAMS.LINKSOURCE],
      priority: [
        this.ANNOUNCEMENT_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.announcementForm.controls;
    if (this.announcementForm.invalid && !this.announcementForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.announcement)
      formData.append('id', this.announcementForm.value['id']);
    formData.append('title', this.announcementForm.value['title']);
    formData.append('description', this.announcementForm.value['description']);
    formData.append('priority', this.announcementForm.value['priority']);
    formData.append('type', 'ANNOUNCEMENT');
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.announcementForm.value['link']);
    }

    if (this.announcementForm.value['id'])
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
    const control = this.announcementForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.announcementForm.controls[controlName];
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
    this.announcementForm.patchValue({
      [name]: event.target.value,
    });
  };
}
