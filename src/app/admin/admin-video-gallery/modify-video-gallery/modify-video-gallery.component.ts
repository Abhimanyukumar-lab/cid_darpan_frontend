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
  selector: 'app-modify-video-gallery',
  templateUrl: './modify-video-gallery.component.html',
  styleUrls: ['./modify-video-gallery.component.scss'],
})
export class ModifyVideoGalleryComponent implements OnInit, OnDestroy {
  subscription: any;
  videoGallery: any;
  loading = false;
  videoGalleryForm: UntypedFormGroup;

  ADD_VIDEO_GALLERY: boolean;
  EDIT_VIDEO_GALLERY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;

  VIDEO_GALLERY_PARAMS = {
    ID: null,
    TITLE: '',
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
    this.videoGallery = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.videoGallery) {
      this.VIDEO_GALLERY_PARAMS.ID = this.videoGallery.id;
      this.VIDEO_GALLERY_PARAMS.TITLE = this.videoGallery.title;
      this.VIDEO_GALLERY_PARAMS.LINK = this.videoGallery.link;
      this.VIDEO_GALLERY_PARAMS.TYPE = this.videoGallery.type;
      this.VIDEO_GALLERY_PARAMS.PRIORITY = this.videoGallery.priority;
    }

    this.ADD_VIDEO_GALLERY = this.global.checkForUserButtonPermission(
      AppConstants.VIDEO_GALLERY_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_VIDEO_GALLERY = this.global.checkForUserButtonPermission(
      AppConstants.VIDEO_GALLERY_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.VIDEO_GALLERY_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.VIDEO_GALLERY_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initVideoGalleryForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initVideoGalleryForm = () => {
    this.videoGalleryForm = this.fb.group({
      id: this.VIDEO_GALLERY_PARAMS.ID,
      title: [
        this.VIDEO_GALLERY_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],

      link: [this.VIDEO_GALLERY_PARAMS.LINK],
      linkSource: [this.VIDEO_GALLERY_PARAMS.LINKSOURCE],

      priority: [
        this.VIDEO_GALLERY_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.videoGalleryForm.controls;
    if (this.videoGalleryForm.invalid && !this.videoGalleryForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.videoGallery)
      formData.append('id', this.videoGalleryForm.value['id']);
    formData.append('title', this.videoGalleryForm.value['title']);
    formData.append('type', 'VIDEO_GALLERY');
    formData.append('priority', this.videoGalleryForm.value['priority']);
    formData.append('language', this.language);

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.videoGalleryForm.value['link']);
    }

    if (this.videoGalleryForm.value['id'])
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
    const control = this.videoGalleryForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.videoGalleryForm.controls[controlName];
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
    this.videoGalleryForm.patchValue({
      [name]: event.target.value,
    });
  };

}
