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
  selector: 'app-modify-image-gallery',
  templateUrl: './modify-image-gallery.component.html',
  styleUrls: ['./modify-image-gallery.component.scss'],
})
export class ModifyImageGalleryComponent implements OnInit, OnDestroy {
  subscription: any;
  imageGallery: any;
  loading = false;
  imageGalleryForm: UntypedFormGroup;

  ADD_IMAGE_GALLERY: boolean;
  EDIT_IMAGE_GALLERY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  eventsList: any[];

  IMAGE_GALLERY_PARAMS = {
    ID: null,
    TITLE: '',
    DESCRIPTION: '',
    RELEASEBY: null,
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
    this.imageGallery = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.imageGallery) {
      this.IMAGE_GALLERY_PARAMS.ID = this.imageGallery.id;
      this.IMAGE_GALLERY_PARAMS.TITLE = this.imageGallery.title;
      this.IMAGE_GALLERY_PARAMS.RELEASEBY = this.imageGallery.releasedBy;
      this.IMAGE_GALLERY_PARAMS.DESCRIPTION = this.imageGallery.description;
      this.IMAGE_GALLERY_PARAMS.LINK = this.imageGallery.link;
      this.IMAGE_GALLERY_PARAMS.TYPE = this.imageGallery.type;
      this.IMAGE_GALLERY_PARAMS.PRIORITY = this.imageGallery.priority;
    }

    this.ADD_IMAGE_GALLERY = this.global.checkForUserButtonPermission(
      AppConstants.IMAGE_GALLERY_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_IMAGE_GALLERY = this.global.checkForUserButtonPermission(
      AppConstants.IMAGE_GALLERY_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.IMAGE_GALLERY_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.IMAGE_GALLERY_MODULE.EDIT_SUBMIT_URL;

    this.apiService
    .apiGetCall(AppConstants.IMAGE_GALLERY_MODULE.FETCH_EVENTS_URL, true)
    .subscribe((data) => {
      this.eventsList = data.pageData;
    });

  }

  ngOnInit(): void {
    this.initImageGalleryForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initImageGalleryForm = () => {
    this.imageGalleryForm = this.fb.group({
      id: this.IMAGE_GALLERY_PARAMS.ID,
      title: [
        this.IMAGE_GALLERY_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      description: [
        this.IMAGE_GALLERY_PARAMS.DESCRIPTION,
      ],
      link: [this.IMAGE_GALLERY_PARAMS.LINK],
      linkSource: [this.IMAGE_GALLERY_PARAMS.LINKSOURCE],
      releasedBy: [
        this.IMAGE_GALLERY_PARAMS.RELEASEBY,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.IMAGE_GALLERY_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.imageGalleryForm.controls;
    if (this.imageGalleryForm.invalid && !this.imageGalleryForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.imageGallery)
      formData.append('id', this.imageGalleryForm.value['id']);
    formData.append('title', this.imageGalleryForm.value['title']);
    // formData.append('description', this.imageGalleryForm.value['description']);
    formData.append('releasedBy', this.imageGalleryForm.value['releasedBy']);
    formData.append('type', 'IMAGE_GALLERY');
    formData.append('priority', this.imageGalleryForm.value['priority']);
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.imageGalleryForm.value['link']);
    }

    if (this.imageGalleryForm.value['id'])
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
    const control = this.imageGalleryForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.imageGalleryForm.controls[controlName];
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
    this.imageGalleryForm.patchValue({
      [name]: event.target.value,
    });
  };
}
