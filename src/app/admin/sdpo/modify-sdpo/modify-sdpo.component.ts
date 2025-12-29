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
  selector: 'app-modify-sdpo',
  templateUrl: './modify-sdpo.component.html',
  styleUrls: ['./modify-sdpo.component.scss'],
})
export class ModifySdpoComponent implements OnInit, OnDestroy {
  subscription: any;
  sdpo: any;
  loading = false;
  sdpoForm: UntypedFormGroup;

  ADD_SDPO: boolean;
  EDIT_SDPO: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  HEAD_IMAGE: File = null;
  language: string;
  dspList: [];
  max: Date = new Date();
  designationList:string;

  SDPO_PARAMS = {
    ID: null,
    NAME: '',
    NAMEHI: '',
    CONTACT_NO: '',
    MOBILE_NO: '',
    EMAIL: '',
    DESIGNATION_ID: null,
    DESIGNATION: '',
    HEAD_IMAGE: '',
    PRIORITY: '',
    JOIN_DATE: '',
    DSP_ID: null,
    DSP_NAME: '',
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
    this.sdpo = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    if (this.sdpo) {
      this.SDPO_PARAMS.ID = this.sdpo.id;
      this.SDPO_PARAMS.NAME = this.sdpo.headName;
      this.SDPO_PARAMS.NAMEHI = this.sdpo.headNameHi;
      this.SDPO_PARAMS.CONTACT_NO = this.sdpo.headContact;
      this.SDPO_PARAMS.MOBILE_NO = this.sdpo.headMobile;
      this.SDPO_PARAMS.EMAIL = this.sdpo.headEmail;
      this.SDPO_PARAMS.DESIGNATION_ID = this.sdpo.designationId;
      this.SDPO_PARAMS.DESIGNATION = this.sdpo.designationName;
      this.SDPO_PARAMS.PRIORITY = this.sdpo.priority;
      this.SDPO_PARAMS.JOIN_DATE = this.sdpo.joiningDate;
      this.SDPO_PARAMS.DSP_ID = this.sdpo.dspId;
      this.SDPO_PARAMS.DSP_NAME = this.sdpo.dspName;
    }

    this.ADD_SDPO = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SDPO = this.global.checkForUserButtonPermission(
      AppConstants.SDPO_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SDPO_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SDPO_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.FETCHDSP, false)
      .subscribe((data) => {
        this.dspList = data.dspDTOs;
      });
  }

  ngOnInit(): void {
    this.initSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initSectionForm = () => {
    this.sdpoForm = this.fb.group({
      id: this.SDPO_PARAMS.ID,
      headName: [
        this.SDPO_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      headNameHi: [
        this.SDPO_PARAMS.NAMEHI,
        Validators.compose([Validators.required]),
      ],
      headContact: [this.SDPO_PARAMS.CONTACT_NO],
      headMobile: [
        this.SDPO_PARAMS.MOBILE_NO,
        Validators.compose([Validators.required]),
      ],
      headEmail: [this.SDPO_PARAMS.EMAIL],

      headImageSource: [this.SDPO_PARAMS.HEAD_IMAGE],
      designationId: [
        this.SDPO_PARAMS.DESIGNATION_ID,
        Validators.compose([Validators.required]),
      ],
      joiningDate: [
        this.SDPO_PARAMS.JOIN_DATE,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.SDPO_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      dspId: [this.SDPO_PARAMS.DSP_ID],
      dspName: [this.SDPO_PARAMS.DSP_NAME],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.sdpoForm.controls;
    if (this.sdpoForm.invalid && !this.sdpoForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.sdpo) formData.append('id', this.sdpoForm.value['id']);
    formData.append('headName', this.sdpoForm.value['headName']);
    formData.append('headNameHi', this.sdpoForm.value['headNameHi']);
    formData.append('headContact', this.sdpoForm.value['headContact']);
    formData.append('headMobile', this.sdpoForm.value['headMobile']);
    formData.append('headEmail', this.sdpoForm.value['headEmail']);
    formData.append('designationId', this.sdpoForm.value['designationId']);
    formData.append('designationName', this.sdpoForm.value['designationName']);
    formData.append('joiningDate', this.sdpoForm.value['joiningDate']);
    formData.append('priority', this.sdpoForm.value['priority']);
    formData.append('language', this.language);
    if (this.sdpoForm.value['dspId']) {
      formData.append('dspId', this.sdpoForm.value['dspId']);
      formData.append('dspName', this.sdpoForm.value['dspName']);
    }

    if (this.HEAD_IMAGE) {
      formData.append('headImageSource', this.HEAD_IMAGE, this.HEAD_IMAGE.name);
    }

    if (this.sdpoForm.value['id'])
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
    const control = this.sdpoForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.sdpoForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  goBack() {
    this._location.back();
  }

  handleFileChange = (file: FileList) => {
    this.HEAD_IMAGE = file.item(0);
  };

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
    this.sdpoForm.patchValue({
      [name]: event.target.value,
    });
  };
}
