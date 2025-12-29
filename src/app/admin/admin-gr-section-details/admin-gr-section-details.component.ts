import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  RefreshTableAndForm,
  UpdateTableDetails,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-gr-section-details',
  templateUrl: './admin-gr-section-details.component.html',
  styleUrls: ['./admin-gr-section-details.component.scss'],
})
export class AdminGrSectionDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  url: string = AppConstants.GR_DETAILS_MODULE.ADD_GR_DETAILS;
  backUrl: string;
  id: number;

  grSectionPath: string = AppConstants.GR_DETAILS_MODULE.FETCH_GR_DETAILS_LIST;
  grSectionDeleteCode: string = null;
  grSectionDeleteUrl: string = null;
  grSectionModule: string = 'GRSECTION';
  grSectionId: number = null;

  loading: boolean = false;
  grSectionForm: UntypedFormGroup;
  showYesNo: boolean = false;

  language: string;
  GR_PARAM = {
    ID: null,
    GR_SEC_ID: null,
    PROCECUTIONNAME: null,
    TYPE: null,
    ACCUSEDIN: null,
  };

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    private localStorage: LocalstorageService,
    public langModule: LangModule
  ) {
    this.id = this.localStorage.getStoredValue('grSectionValue');
    this.backUrl = this.localStorage.getStoredValue('grSectionUrl');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
  }

  ngOnInit(): void {
    this.GR_PARAM.GR_SEC_ID = this.id;
    this.grSectionId = this.id;

    this.initGrSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('grSectionValue');
    this.localStorage.destroyStoredValue('grSectionUrl');
    this.subscription.unsubscribe();
  }

  initGrSectionForm = () => {
    this.grSectionForm = this.fb.group({
      id: [this.GR_PARAM.ID],
      grSectionId: [
        this.GR_PARAM.GR_SEC_ID,
        Validators.compose([Validators.required]),
      ],
      personName: [
        this.GR_PARAM.PROCECUTIONNAME,
        Validators.compose([Validators.required]),
      ],
      type: [this.GR_PARAM.TYPE, Validators.compose([Validators.required])],
      accuseIn: [this.GR_PARAM.ACCUSEDIN],
    });
  };

  submitForwardData = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.grSectionForm.controls;
    if (this.grSectionForm.invalid && !this.grSectionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.grSectionForm.value['id'])
      this.apiService
        .apiPostCall(this.url, this.grSectionForm.value, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.loading = false;
            this.grSectionForm.reset();
            this.initGrSectionForm();
            this.appStore.dispatch(new RefreshTableAndForm(true));
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    else
      this.apiService
        .apiPostCall(this.url, this.grSectionForm.value, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.loading = false;
            this.grSectionForm.reset();
            this.initGrSectionForm();
            this.appStore.dispatch(new RefreshTableAndForm(true));
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.grSectionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.grSectionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
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

  doCheckType = (value) => {
    var types = value.options[value.selectedIndex].text;
    if (
      types == 'Accused in Jail' ||
      types == 'जेल में अभियुक्त' ||
      types == 'Witness' ||
      types == 'गवाह'
    ) {
      this.showYesNo = true;
    } else {
      this.showYesNo = false;
    }
  };

  focusOut = (event, name) => {
    this.grSectionForm.patchValue({
      [name]: event.target.value,
    });
  };

}
