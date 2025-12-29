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
  selector: 'app-modify-about-dsp',
  templateUrl: './modify-about-dsp.component.html',
  styleUrls: ['./modify-about-dsp.component.scss'],
})
export class ModifyAboutDspComponent implements OnInit, OnDestroy {
  subscription: any;

  dsp: any;
  loading = false;
  dspForm: UntypedFormGroup;

  ADD_DSP: boolean;
  EDIT_DSP: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  IMAGE: File = null;
  language: string;
  max: Date = new Date();
  designationList: string;

  DSP_PARAMS = {
    ID: null,
    NAME: '',
    NAMEHI: '',
    DESIGNATION: '',
    DESIGNATION_ID: null,
    CONTACT: '',
    MOBILE: '',
    IMAGE: '',
    JOIN_DATE: '',
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
    this.dsp = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    if (this.dsp) {
      this.DSP_PARAMS.ID = this.dsp.id;
      this.DSP_PARAMS.NAME = this.dsp.dspName;
      this.DSP_PARAMS.NAMEHI = this.dsp.dspNameHi;
      this.DSP_PARAMS.CONTACT = this.dsp.dspContact;
      this.DSP_PARAMS.MOBILE = this.dsp.dspMobile;
      this.DSP_PARAMS.DESIGNATION_ID = this.dsp.designationId;
      this.DSP_PARAMS.DESIGNATION = this.dsp.designationName;
      this.DSP_PARAMS.JOIN_DATE = this.dsp.dspJoiningDate;
    }

    this.ADD_DSP = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_DSP = this.global.checkForUserButtonPermission(
      AppConstants.DSP_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.DSP_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.DSP_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initDSPForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
      this.subscription.unsubscribe();
  }

  initDSPForm = () => {
    this.dspForm = this.fb.group({
      id: this.DSP_PARAMS.ID,
      dspName: [
        this.DSP_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      dspNameHi: [
        this.DSP_PARAMS.NAMEHI,
        Validators.compose([Validators.required]),
      ],
      dspContact: [this.DSP_PARAMS.CONTACT],
      dspMobile: [
        this.DSP_PARAMS.MOBILE,
        Validators.compose([Validators.required, Validators.maxLength(10)]),
      ],
      designationId: [
        this.DSP_PARAMS.DESIGNATION_ID,
        Validators.compose([Validators.required]),
      ],
      dspImage: [this.DSP_PARAMS.IMAGE],
      dspJoiningDate: [
        this.DSP_PARAMS.JOIN_DATE,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.dspForm.controls;
    if (this.dspForm.invalid && !this.dspForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.dsp) formData.append('id', this.dspForm.value['id']);
    formData.append('dspName', this.dspForm.value['dspName']);
    formData.append('dspNameHi', this.dspForm.value['dspNameHi']);
    if (this.dspForm.value['dspContact']) {
      formData.append('dspContact', this.dspForm.value['dspContact']);
    }
    formData.append('dspMobile', this.dspForm.value['dspMobile']);
    formData.append('designationName', this.dspForm.value['designationName']);
    formData.append('designationId', this.dspForm.value['designationId']);
    formData.append('dspJoiningDate', this.dspForm.value['dspJoiningDate']);

    if (this.IMAGE) {
      formData.append('dspImage', this.IMAGE, this.IMAGE.name);
    }

    if (this.dspForm.value['id'])
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
    const control = this.dspForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.dspForm.controls[controlName];
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
    this.IMAGE = file.item(0);
  };

  focusOut = (event, name) => {
    this.dspForm.patchValue({
      [name]: event.target.value,
    });
  };
}
