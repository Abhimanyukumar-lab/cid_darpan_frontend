import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
  selector: 'app-modify-gfpo',
  templateUrl: './modify-gfpo.component.html',
  styleUrls: ['./modify-gfpo.component.scss'],
})
export class ModifyGrievanceFemalePoliceOfficialComponent
  implements OnInit, OnDestroy
{
  subscription: any;
  grievanceFemalePoliceOfficial: any;
  loading = false;
  grievanceFemalePoliceOfficialForm: UntypedFormGroup;

  ADD_GRIEVANCE_POLICE_OFFICIAL: boolean;
  EDIT_GRIEVANCE_POLICE_OFFICIAL: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  COMPLAINTIMAGESOURCE: File = null;
  language: string;

  GRIEVANCE_POLICE_OFFICIAL_PARAMS = {
    ID: null,
    EMPLOYEE_ID: '',
    NAME: '',
    MOBILE_NO: null,
    EMAIL: '',
    DESCRIPTION: '',
    CURRENT_POSTING: '',
    CURRENT_EMPLOYEE_STATUS: null,
    IMAGE: '',
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
    this.grievanceFemalePoliceOfficial =
      this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.grievanceFemalePoliceOfficial) {
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.ID =
        this.grievanceFemalePoliceOfficial.id;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.EMPLOYEE_ID =
        this.grievanceFemalePoliceOfficial.employeeId;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.NAME =
        this.grievanceFemalePoliceOfficial.name;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.MOBILE_NO =
        this.grievanceFemalePoliceOfficial.mobileNo;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.EMAIL =
        this.grievanceFemalePoliceOfficial.email;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.DESCRIPTION =
        this.grievanceFemalePoliceOfficial.description;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.CURRENT_POSTING =
        this.grievanceFemalePoliceOfficial.currentPosting;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.CURRENT_EMPLOYEE_STATUS = this
        .grievanceFemalePoliceOfficial.currentEmployeeStatus
        ? this.grievanceFemalePoliceOfficial.currentEmployeeStatus
        : null;
      this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.IMAGE =
        this.grievanceFemalePoliceOfficial.complaintImage;
    }

    this.ADD_GRIEVANCE_POLICE_OFFICIAL =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE.ADD_SUBMIT_DATA
      );
    this.EDIT_GRIEVANCE_POLICE_OFFICIAL =
      this.global.checkForUserButtonPermission(
        AppConstants.GrievanceFemalePoliceOfficial_MODULE.EDIT_SUBMIT_DATA
      );

    this.ADD_URL =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL =
      AppConstants.GrievanceFemalePoliceOfficial_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initGrievanceFemalePoliceOfficialForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initGrievanceFemalePoliceOfficialForm = () => {
    this.grievanceFemalePoliceOfficialForm = this.fb.group({
      id: this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.ID,
      employeeId: [
        this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.EMPLOYEE_ID,
        Validators.compose([Validators.required]),
      ],
      name: [
        this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.NAME,
        Validators.compose([Validators.required]),
      ],
      mobileNo: [
        this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.MOBILE_NO,
        Validators.compose([Validators.required]),
      ],
      email: [
        this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.EMAIL,
        Validators.compose([Validators.required]),
      ],
      description: [
        this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.DESCRIPTION,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ]),
      ],
      currentPosting: [
        this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.CURRENT_POSTING,
        Validators.compose([Validators.required]),
      ],
      currentEmployeeStatus: [
        this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.CURRENT_EMPLOYEE_STATUS,
        Validators.compose([Validators.required]),
      ],
      complaintImage: [this.GRIEVANCE_POLICE_OFFICIAL_PARAMS.IMAGE],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.grievanceFemalePoliceOfficialForm.controls;
    if (
      this.grievanceFemalePoliceOfficialForm.invalid &&
      !this.grievanceFemalePoliceOfficialForm.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.grievanceFemalePoliceOfficial)
      formData.append('id', this.grievanceFemalePoliceOfficialForm.value['id']);
    formData.append(
      'employeeId',
      this.grievanceFemalePoliceOfficialForm.value['employeeId']
    );
    formData.append(
      'name',
      this.grievanceFemalePoliceOfficialForm.value['name']
    );
    formData.append(
      'mobileNo',
      this.grievanceFemalePoliceOfficialForm.value['mobileNo']
    );
    formData.append(
      'email',
      this.grievanceFemalePoliceOfficialForm.value['email']
    );
    formData.append(
      'description',
      this.grievanceFemalePoliceOfficialForm.value['description']
    );
    formData.append(
      'currentPosting',
      this.grievanceFemalePoliceOfficialForm.value['currentPosting']
    );
    formData.append(
      'currentEmployeeStatus',
      this.grievanceFemalePoliceOfficialForm.value['currentEmployeeStatus']
    );

    if (this.COMPLAINTIMAGESOURCE) {
      formData.append(
        'complaintImageSource',
        this.COMPLAINTIMAGESOURCE,
        this.COMPLAINTIMAGESOURCE.name
      );
    } else {
      formData.append(
        'complaintImage',
        this.grievanceFemalePoliceOfficialForm.value['complaintImage']
      );
    }

    if (this.grievanceFemalePoliceOfficialForm.value['id'])
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
    const control =
      this.grievanceFemalePoliceOfficialForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control =
      this.grievanceFemalePoliceOfficialForm.controls[controlName];
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
    this.COMPLAINTIMAGESOURCE = file.item(0);
  };

  focusOut = (event, name) => {
    this.grievanceFemalePoliceOfficialForm.patchValue({
      [name]: event.target.value,
    });
  };
}
