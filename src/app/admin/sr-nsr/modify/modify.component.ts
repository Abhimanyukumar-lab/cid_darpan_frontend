import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
})
export class ModifyComponent implements OnInit {
  subscription: any;
  entry: any;
  loading = false;
  entryForm: UntypedFormGroup;

  ADD_ENTRY: boolean;
  EDIT_ENTRY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  FIR: File = null;

  ENTRY_PARAMS = {
    ID: null,
    firNo: '',
    firDate: '',
    uis: '',
    firType: '',
    firDoc: '',
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
    this.entry = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.entry) {
      this.ENTRY_PARAMS.ID = this.entry.id;
      this.ENTRY_PARAMS.firNo = this.entry.firNo;
      var date = this.entry.firDate.split('T')[0];
      this.ENTRY_PARAMS.firDate = date;
      this.ENTRY_PARAMS.uis = this.entry.uis;
      this.ENTRY_PARAMS.firType = this.entry.firType;
      this.ENTRY_PARAMS.firDoc = this.entry.firDoc;
    }

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.SR_NSR_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SR_NSR_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SR_NSR_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initiateMenuForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateMenuForm = () => {
    this.entryForm = this.fb.group({
      id: this.ENTRY_PARAMS.ID,
      firNo: [
        this.ENTRY_PARAMS.firNo,
        Validators.compose([Validators.required]),
      ],
      firDate: [
        this.ENTRY_PARAMS.firDate,
        Validators.compose([Validators.required]),
      ],
      uis: [this.ENTRY_PARAMS.uis, Validators.compose([Validators.required])],
      firType: [
        this.ENTRY_PARAMS.firType,
        Validators.compose([Validators.required]),
      ],
      firDoc: [null],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.entryForm.controls;
    if (this.entryForm.invalid && !this.entryForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.entry) formData.append('id', this.entryForm.value['id']);
    formData.append('firNo', this.entryForm.value['firNo']);
    formData.append('firDate', this.entryForm.value['firDate']);
    formData.append('uis', this.entryForm.value['uis']);
    formData.append('firType', this.entryForm.value['firType']);

    if (this.FIR) {
      formData.append('firDoc', this.FIR, this.FIR.name);
    }

    if (this.entryForm.value['id'])
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
    const control = this.entryForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.entryForm.controls[controlName];
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
    this.entryForm.patchValue({
      [name]: event.target.value,
    });
  };

  handleFileChange = (file: FileList) => {
    this.FIR = file.item(0);
  };
}
