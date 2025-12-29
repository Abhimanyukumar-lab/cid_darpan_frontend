import { Component, OnDestroy, OnInit } from '@angular/core';
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
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-procecution-details',
  templateUrl: './admin-procecution-details.component.html',
  styleUrls: ['./admin-procecution-details.component.scss'],
})
export class AdminProcecutionDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  url: string = AppConstants.PROCECUTION_DETAILS_MODULE.ADD_PROC_DETAILS;
  backUrl: string;
  id: number;

  procecutionPath: string =
    AppConstants.PROCECUTION_DETAILS_MODULE.FETCH_PROC_DETAILS_LIST;
  procecutionDeleteCode: string = null;
  procecutionDeleteUrl: string = null;
  procecutionModule: string = 'PROCECUTION';
  procecutionId: number = null;

  loading: boolean = false;
  procecutionForm: UntypedFormGroup;

  showYesNo: boolean = false;

  language: string;
  GR_PARAM = {
    ID: null,
    PROC_ID: null,
    PERSON_NAME: null,
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
    this.id = this.localStorage.getStoredValue('procecutionValue');
    this.backUrl = this.localStorage.getStoredValue('procecutionUrl');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
  }

  ngOnInit(): void {
    this.GR_PARAM.PROC_ID = this.id;
    this.procecutionId = this.id;

    this.initGrSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('procecutionValue');
    this.localStorage.destroyStoredValue('procecutionUrl');
    this.subscription.unsubscribe();
  }

  initGrSectionForm = () => {
    this.procecutionForm = this.fb.group({
      id: [this.GR_PARAM.ID],
      procecutionId: [
        this.GR_PARAM.PROC_ID,
        Validators.compose([Validators.required]),
      ],
      personName: [
        this.GR_PARAM.PERSON_NAME,
        Validators.compose([Validators.required]),
      ],
      type: [this.GR_PARAM.TYPE, Validators.compose([Validators.required])],
      accuseIn: [this.GR_PARAM.ACCUSEDIN],
    });
  };

  submitForwardData = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.procecutionForm.controls;
    if (this.procecutionForm.invalid && !this.procecutionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();
    formData.append(
      'procecutionId',
      this.procecutionForm.value['procecutionId']
    );
    formData.append('personName', this.procecutionForm.value['personName']);
    formData.append('type', this.procecutionForm.value['type']);
    formData.append('accuseIn', this.procecutionForm.value['accuseIn']);

    if (this.procecutionForm.value['id'])
      this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.loading = false;
          this.procecutionForm.reset();
          this.initGrSectionForm();
          this.appStore.dispatch(new RefreshTableAndForm(true));
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
    else
      this.apiService.apiFormDataPostCall(this.url, formData, true).subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.loading = false;
          this.procecutionForm.reset();
          this.initGrSectionForm();
          this.appStore.dispatch(new RefreshTableAndForm(true));
        },
        (error) => {
          this.loading = false;
          this.procecutionForm.reset();
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.procecutionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.procecutionForm.controls[controlName];
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
    this.procecutionForm.patchValue({
      [name]: event.target.value,
    });
  };
}
