import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
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
  selector: 'app-modify-links',
  templateUrl: './modify-links.component.html',
  styleUrls: ['./modify-links.component.scss'],
})
export class ModifyLinksComponent implements OnInit, OnDestroy {
  subscription: any;
  links: any;
  loading = false;
  linksForm: UntypedFormGroup;

  ADD_LINK: boolean;
  EDIT_LINK: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  LINK_PARAMS = {
    ID: null,
    NAME_EN: '',
    NAME_HI: '',
    DESC_EN: '',
    DESC_HI: '',
    TYPE: null,
    URL: '',
    PRIORITY: '',
    COLOUR: '',
    ICON: '',
  };

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location
  ) {
    this.links = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.links) {
      this.LINK_PARAMS.ID = this.links.id;
      this.LINK_PARAMS.NAME_EN = this.links.linksNameEn;
      this.LINK_PARAMS.DESC_EN = this.links.linksDescEn;
      this.LINK_PARAMS.NAME_HI = this.links.linksNameHi;
      this.LINK_PARAMS.DESC_HI = this.links.linksDescHi;
      this.LINK_PARAMS.TYPE = this.links.linkType;
      this.LINK_PARAMS.URL = this.links.linkUrl;
      this.LINK_PARAMS.PRIORITY = this.links.linkPriority;
      this.LINK_PARAMS.COLOUR = this.links.linksColour;
      this.LINK_PARAMS.ICON = this.links.linkIcon;
    }

    this.ADD_LINK = this.global.checkForUserButtonPermission(
      AppConstants.LINKS_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_LINK = this.global.checkForUserButtonPermission(
      AppConstants.LINKS_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.LINKS_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.LINKS_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateLinksForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateLinksForm = () => {
    this.linksForm = this.fb.group({
      id: this.LINK_PARAMS.ID,
      linksNameEn: [
        this.LINK_PARAMS.NAME_EN,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      linksDescEn: [
        this.LINK_PARAMS.DESC_EN,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      linksNameHi: [
        this.LINK_PARAMS.NAME_EN,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      linksDescHi: [
        this.LINK_PARAMS.DESC_HI,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      linkType: [
        this.LINK_PARAMS.TYPE,
        Validators.compose([Validators.required]),
      ],
      linkUrl: [
        this.LINK_PARAMS.URL,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      linkPriority: [
        this.LINK_PARAMS.PRIORITY,
        Validators.compose([Validators.required]),
      ],
      linksColour: [
        this.LINK_PARAMS.COLOUR,
        Validators.compose([Validators.required]),
      ],
      linkIcon: [
        this.LINK_PARAMS.ICON,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.linksForm.controls;
    if (this.linksForm.invalid && !this.linksForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.linksForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.linksForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.linksForm.value, true)
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
    const control = this.linksForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.linksForm.controls[controlName];
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

  focusOut = (event, name) => {
    this.linksForm.patchValue({
      [name]: event.target.value,
    });
  };
}
