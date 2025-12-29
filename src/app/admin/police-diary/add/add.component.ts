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
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  subscription: any;
  entry: any;
  loading = false;
  entryForm: UntypedFormGroup;

  ADD_ENTRY: boolean;
  EDIT_ENTRY: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  ENTRY_PARAMS = {
    ID: null,
    crNo: '',
    kandTithi: '',
    dhara: '',
    crimeLocation: '',
    personDetails: '',
    otherDetails: '',
    location: '',
    fillOne: '',
    fillTwo: '',
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
      this.ENTRY_PARAMS.crNo = this.entry.crNo;
      this.ENTRY_PARAMS.kandTithi = this.entry.kandTithi;
      this.ENTRY_PARAMS.dhara = this.entry.dhara;
      this.ENTRY_PARAMS.crimeLocation = this.entry.crimeLocation;
      this.ENTRY_PARAMS.personDetails = this.entry.personDetails;
      this.ENTRY_PARAMS.otherDetails = this.entry.otherDetails;
      this.ENTRY_PARAMS.location = this.entry.location;
      this.ENTRY_PARAMS.fillOne = this.entry.fillOne;
      this.ENTRY_PARAMS.fillTwo = this.entry.fillTwo;
    }

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_DIARY_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_DIARY_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.POLICE_DIARY_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.POLICE_DIARY_MODULE.EDIT_SUBMIT_URL;
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
      crNo: [this.ENTRY_PARAMS.crNo, Validators.compose([Validators.required])],
      kandTithi: [
        this.ENTRY_PARAMS.kandTithi,
        Validators.compose([Validators.required]),
      ],
      dhara: [
        this.ENTRY_PARAMS.dhara,
        Validators.compose([Validators.required]),
      ],
      crimeLocation: [
        this.ENTRY_PARAMS.crimeLocation,
        Validators.compose([Validators.required]),
      ],
      personDetails: [
        this.ENTRY_PARAMS.personDetails,
        Validators.compose([Validators.required]),
      ],
      otherDetails: [
        this.ENTRY_PARAMS.otherDetails,
        Validators.compose([Validators.required]),
      ],
      location: [
        this.ENTRY_PARAMS.location,
        Validators.compose([Validators.required]),
      ],
      fillOne: [
        this.ENTRY_PARAMS.fillOne,
        Validators.compose([Validators.required]),
      ],
      fillTwo: [
        this.ENTRY_PARAMS.fillTwo,
        Validators.compose([Validators.required]),
      ],
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
    formData.append('crNo', this.entryForm.value['crNo']);
    formData.append('kandTithi', this.entryForm.value['kandTithi']);
    formData.append('dhara', this.entryForm.value['dhara']);
    formData.append('crimeLocation', this.entryForm.value['crimeLocation']);
    formData.append('personDetails', this.entryForm.value['personDetails']);
    formData.append('otherDetails', this.entryForm.value['otherDetails']);
    formData.append('location', this.entryForm.value['location']);
    formData.append('fill_1', this.entryForm.value['fill_1']);
    formData.append('fill_2', this.entryForm.value['fill_2']);

    if (this.entryForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.entryForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.entryForm.value, true)
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
}
