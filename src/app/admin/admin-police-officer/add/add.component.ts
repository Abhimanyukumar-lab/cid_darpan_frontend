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
    brassNo: '',
    desig: '',
    name: '',
    mobileNo: '',
    dob: '',
    doj: '',
    homeDist: '',
    placeOfPosting: '',
    natureOfDuty: '',
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
      this.ENTRY_PARAMS.brassNo = this.entry.brassNo;
      this.ENTRY_PARAMS.desig = this.entry.desig;
      this.ENTRY_PARAMS.name = this.entry.name;
      this.ENTRY_PARAMS.mobileNo = this.entry.mobileNo;

      var dob = this.entry.dob.split('T')[0];
      this.ENTRY_PARAMS.dob = dob;

      var doj = this.entry.doj.split('T')[0];
      this.ENTRY_PARAMS.doj = doj;

      this.ENTRY_PARAMS.homeDist = this.entry.homeDist;
      this.ENTRY_PARAMS.placeOfPosting = this.entry.placeOfPosting;
      this.ENTRY_PARAMS.natureOfDuty = this.entry.natureOfDuty;
    }

    this.ADD_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_OFFICER_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ENTRY = this.global.checkForUserButtonPermission(
      AppConstants.POLICE_OFFICER_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.POLICE_OFFICER_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.POLICE_OFFICER_MODULE.EDIT_SUBMIT_URL;
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
      brassNo: [
        this.ENTRY_PARAMS.brassNo,
        Validators.compose([Validators.required]),
      ],
      desig: [
        this.ENTRY_PARAMS.desig,
        Validators.compose([Validators.required]),
      ],
      name: [this.ENTRY_PARAMS.name, Validators.compose([Validators.required])],
      mobileNo: [
        this.ENTRY_PARAMS.mobileNo,
        Validators.compose([Validators.required]),
      ],
      dob: [this.ENTRY_PARAMS.dob, Validators.compose([Validators.required])],
      doj: [this.ENTRY_PARAMS.doj, Validators.compose([Validators.required])],
      homeDist: [
        this.ENTRY_PARAMS.homeDist,
        Validators.compose([Validators.required]),
      ],
      placeOfPosting: [
        this.ENTRY_PARAMS.placeOfPosting,
        Validators.compose([Validators.required]),
      ],
      natureOfDuty: [
        this.ENTRY_PARAMS.natureOfDuty,
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

    var data = {};

    if (this.entry) data['id'] = this.entryForm.value['id'];
    data['brassNo'] = this.entryForm.value['brassNo'];
    data['designation'] = this.entryForm.value['desig'];
    data['name'] = this.entryForm.value['name'];
    data['mobileNo'] = this.entryForm.value['mobileNo'];

    var dob: string = this.entryForm.value['dob'] + 'T00:00:00.000';
    data['dob'] = dob + '';

    var doj: string = this.entryForm.value['doj'] + 'T00:00:00.000';
    data['doj'] = doj + '';

    data['homeDist'] = this.entryForm.value['homeDist'];
    data['placeOfPosting'] = this.entryForm.value['placeOfPosting'];
    data['natureOfDuty'] = this.entryForm.value['natureOfDuty'];

    if (this.entryForm.value['id'])
      this.apiService.apiPostCall(this.EDIT_URL, data, true).subscribe(
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
      this.apiService.apiPostCall(this.ADD_URL, data, true).subscribe(
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
