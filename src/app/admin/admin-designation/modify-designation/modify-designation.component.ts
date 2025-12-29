import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { LangModule } from 'src/app/models/LangModule';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-designation',
  templateUrl: './modify-designation.component.html',
  styleUrls: ['./modify-designation.component.scss'],
})
export class ModifyDesignationComponent implements OnInit, OnDestroy {
  designation: any;
  loading = false;
  designationForm: UntypedFormGroup;

  ADD_DESIGN: boolean;
  EDIT_DESIGN: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  language: string;

  DESIGN_PARAMS = {
    ID: null,
    NAME: '',
    NAME_HI: '',
    DESCRIPTION: '',
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
    this.designation = this.localStorage.getStoredValue('editData');

    this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.designation) {
      this.DESIGN_PARAMS.ID = this.designation.id;
      this.DESIGN_PARAMS.NAME = this.designation.designationName;
      this.DESIGN_PARAMS.NAME_HI = this.designation.designationNameHi;
      this.DESIGN_PARAMS.DESCRIPTION = this.designation.description;
      this.DESIGN_PARAMS.PRIORITY = this.designation.priority;
    }

    this.ADD_DESIGN = this.global.checkForUserButtonPermission(
      AppConstants.DESIGNATION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_DESIGN = this.global.checkForUserButtonPermission(
      AppConstants.DESIGNATION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.DESIGNATION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.DESIGNATION_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initFormsForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
  }

  initFormsForm = () => {
    this.designationForm = this.fb.group({
      id: this.DESIGN_PARAMS.ID,
      designationName: [
        this.DESIGN_PARAMS.NAME,
        Validators.compose([Validators.required]),
      ],
      designationNameHi: [
        this.DESIGN_PARAMS.NAME_HI,
        Validators.compose([Validators.required]),
      ],
      description: [this.DESIGN_PARAMS.DESCRIPTION],
      priority: [
        this.DESIGN_PARAMS.PRIORITY,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.designationForm.controls;
    if (this.designationForm.invalid && !this.designationForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.designationForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.designationForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.designationForm.value, true)
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
    const control = this.designationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.designationForm.controls[controlName];
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

  goBack() {
    this._location.back();
  }

  focusOut = (event, name) => {
    this.designationForm.patchValue({
      [name]: event.target.value,
    });
  };
}
