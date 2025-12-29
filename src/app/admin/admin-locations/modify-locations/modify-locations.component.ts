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
  selector: 'app-modify-locations',
  templateUrl: './modify-locations.component.html',
  styleUrls: ['./modify-locations.component.scss'],
})
export class ModifyLocationsComponent implements OnInit, OnDestroy {
  subscription: any;
  importantPlaces: any;
  loading = false;
  importantPlacesForm: UntypedFormGroup;

  ADD_IMPORTANT_PLACES: boolean;
  EDIT_IMPORTANT_PLACES: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LOC_IMAGE: File = null;
  language: string;

  IMPORTANT_PLACES_PARAMS = {
    ID: null,
    LOC_NAME: '',
    LOC_DISCRIPTION: '',
    LOC_IMAGE: '',
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
    this.importantPlaces = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.importantPlaces) {
      this.IMPORTANT_PLACES_PARAMS.ID = this.importantPlaces.id;
      this.IMPORTANT_PLACES_PARAMS.LOC_NAME = this.importantPlaces.locationName;
      this.IMPORTANT_PLACES_PARAMS.LOC_DISCRIPTION =
        this.importantPlaces.locationDiscription;
      this.IMPORTANT_PLACES_PARAMS.LOC_IMAGE =
        this.importantPlaces.locationImage;
    }

    this.ADD_IMPORTANT_PLACES = this.global.checkForUserButtonPermission(
      AppConstants.LOCATION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_IMPORTANT_PLACES = this.global.checkForUserButtonPermission(
      AppConstants.LOCATION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.LOCATION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.LOCATION_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initImageGalleryForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initImageGalleryForm = () => {
    this.importantPlacesForm = this.fb.group({
      id: this.IMPORTANT_PLACES_PARAMS.ID,
      locationName: [
        this.IMPORTANT_PLACES_PARAMS.LOC_NAME,
        Validators.compose([Validators.required]),
      ],
      locationDiscription: [
        this.IMPORTANT_PLACES_PARAMS.LOC_DISCRIPTION,
        Validators.compose([Validators.required]),
      ],
      locationImage: [
        this.IMPORTANT_PLACES_PARAMS.LOC_IMAGE,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.importantPlacesForm.controls;
    if (this.importantPlacesForm.invalid && !this.importantPlacesForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.importantPlaces)
      formData.append('id', this.importantPlacesForm.value['id']);
    formData.append(
      'locationName',
      this.importantPlacesForm.value['locationName']
    );
    formData.append(
      'locationDiscription',
      this.importantPlacesForm.value['locationDiscription']
    );
    formData.append('locationImage', this.LOC_IMAGE, this.LOC_IMAGE.name);

    if (this.importantPlacesForm.value['id']) {
      this.apiService.apiFormDataPostCall(this.EDIT_URL, formData, true).subscribe(
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
    } else {
      this.apiService.apiFormDataPostCall(this.ADD_URL, formData, true).subscribe(
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
    }
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.importantPlacesForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.importantPlacesForm.controls[controlName];
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
    this.LOC_IMAGE = file.item(0);
  };

  focusOut = (event, name) => {
    this.importantPlacesForm.patchValue({
      [name]: event.target.value,
    });
  };

}
