import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { Options } from 'src/app/models/Options';
import { PoliceStation } from 'src/app/models/PoliceStation';
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
  selector: 'app-modify-missing-person',
  templateUrl: './modify-missing-person.component.html',
  styleUrls: ['./modify-missing-person.component.scss'],
})
export class ModifyMissingPersonComponent implements OnInit, OnDestroy {
  subscription: any;
  missingPerson: any;
  loading = false;
  missingPersonForm: UntypedFormGroup;

  stationList: PoliceStation[];
  genderList: Options[];

  ADD_MISSING_PERSON: boolean;
  EDIT_MISSING_PERSON: boolean;
  VIEW_MISSING_PERSON: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  VIEW_URL: string;
  max: Date = new Date();
  IMAGE: File = null;
  language: string;

  MISSING_PARAMS = {
    ID: null,
    NAME: '',
    STATION_ID: null,
    STATION_NAME: '',
    GENDER: null,
    AGE: '',
    BIRTH_DATE: '',
    HEIGHT: '',
    COLOR: '',
    IDENTITY: '',
    AREA: '',
    IMAGE: '',
    FATHER: '',
    MOTHER: '',
    CLOTHS: '',
    NATIONALITY: '',
    MISSING_DATE: '',
    FIR_NO: '',
    MOBILE: '',
    ADDRESS: '',
    RELISION: '',
    SECTION_LODGED: '',
    LANGUAGE: '',
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
    this.missingPerson = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.missingPerson) {
      this.MISSING_PARAMS.ID = this.missingPerson.id;
      this.MISSING_PARAMS.NAME = this.missingPerson.missingName;
      this.MISSING_PARAMS.STATION_ID = this.missingPerson.stationId;
      this.MISSING_PARAMS.STATION_NAME = this.missingPerson.stationName;
      this.MISSING_PARAMS.GENDER = this.missingPerson.missingGender;
      this.MISSING_PARAMS.AGE = this.missingPerson.missingAge;
      this.MISSING_PARAMS.BIRTH_DATE = this.missingPerson.missingDate;
      this.MISSING_PARAMS.HEIGHT = this.missingPerson.missingHieght;
      this.MISSING_PARAMS.COLOR = this.missingPerson.missingColor;
      this.MISSING_PARAMS.IDENTITY = this.missingPerson.missingSign;
      this.MISSING_PARAMS.AREA = this.missingPerson.missingArea;
      this.MISSING_PARAMS.LANGUAGE = this.missingPerson.language;
      this.MISSING_PARAMS.FATHER = this.missingPerson.fatherName;
      this.MISSING_PARAMS.MOTHER = this.missingPerson.motherName;
      this.MISSING_PARAMS.CLOTHS = this.missingPerson.wearnigClooth;
      this.MISSING_PARAMS.NATIONALITY = this.missingPerson.nationality;
      this.MISSING_PARAMS.MISSING_DATE = this.missingPerson.dateOfMissing;
      this.MISSING_PARAMS.FIR_NO = this.missingPerson.firnoDate;
      this.MISSING_PARAMS.MOBILE = this.missingPerson.mobileNo;
      this.MISSING_PARAMS.ADDRESS = this.missingPerson.address;
      this.MISSING_PARAMS.RELISION = this.missingPerson.religion;
      this.MISSING_PARAMS.SECTION_LODGED = this.missingPerson.sectionFirLoged;
    }

    this.ADD_MISSING_PERSON = this.global.checkForUserButtonPermission(
      AppConstants.MISSING_PERSON_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_MISSING_PERSON = this.global.checkForUserButtonPermission(
      AppConstants.MISSING_PERSON_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.MISSING_PERSON_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.MISSING_PERSON_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.PUBLIC_APIS.STATIONSFETCH, true)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
      });

    this.apiService
      .apiPostCall(
        AppConstants.PUBLIC_APIS.OPTIONSFETCH,
        { formId: 'foundPerson_form' },
        false
      )
      .subscribe((data) => {
        this.genderList = data.optionsDTO;
      });
  }

  ngOnInit(): void {
    this.initMissingPersonForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initMissingPersonForm = () => {
    this.missingPersonForm = this.fb.group({
      id: this.MISSING_PARAMS.ID,
      stationId: [
        this.MISSING_PARAMS.STATION_ID,
        Validators.compose([Validators.required]),
      ],
      missingName: [
        this.MISSING_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],

      missingGender: [
        this.MISSING_PARAMS.GENDER,
        Validators.compose([Validators.required]),
      ],
      missingAge: [
        this.MISSING_PARAMS.AGE,
        Validators.compose([Validators.required]),
      ],
      missingDate: [
        this.MISSING_PARAMS.BIRTH_DATE,
        Validators.compose([Validators.required]),
      ],
      missingHieght: [
        this.MISSING_PARAMS.HEIGHT,
        Validators.compose([Validators.required]),
      ],
      missingColor: [
        this.MISSING_PARAMS.COLOR,
        Validators.compose([Validators.required]),
      ],
      missingSign: [
        this.MISSING_PARAMS.IDENTITY,
        Validators.compose([Validators.required]),
      ],
      missingArea: [
        this.MISSING_PARAMS.AREA,
        Validators.compose([Validators.required]),
      ],
      missingImage: [this.MISSING_PARAMS.IMAGE],
      language: [this.MISSING_PARAMS.LANGUAGE],
      fatherName: [this.MISSING_PARAMS.FATHER],
      motherName: [this.MISSING_PARAMS.MOTHER],
      wearnigClooth: [this.MISSING_PARAMS.CLOTHS],
      nationality: [this.MISSING_PARAMS.NATIONALITY],
      dateOfMissing: [
        this.MISSING_PARAMS.MISSING_DATE,
        Validators.compose([Validators.required]),
      ],
      firnoDate: [this.MISSING_PARAMS.FIR_NO],
      mobileNo: [this.MISSING_PARAMS.MOBILE],
      address: [this.MISSING_PARAMS.ADDRESS],
      religion: [this.MISSING_PARAMS.RELISION],
      sectionFirLoged: [this.MISSING_PARAMS.SECTION_LODGED],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.missingPersonForm.controls;
    if (this.missingPersonForm.invalid && !this.missingPersonForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.missingPerson)
      formData.append('id', this.missingPersonForm.value['id']);
    formData.append('stationId', this.missingPersonForm.value['stationId']);
    formData.append('stationName', this.missingPersonForm.value['stationName']);
    formData.append('missingName', this.missingPersonForm.value['missingName']);
    formData.append(
      'missingGender',
      this.missingPersonForm.value['missingGender']
    );
    formData.append('missingAge', this.missingPersonForm.value['missingAge']);
    formData.append('missingDate', this.missingPersonForm.value['missingDate']);
    formData.append(
      'missingHieght',
      this.missingPersonForm.value['missingHieght']
    );
    formData.append(
      'missingColor',
      this.missingPersonForm.value['missingColor']
    );
    formData.append('missingSign', this.missingPersonForm.value['missingSign']);
    formData.append('missingArea', this.missingPersonForm.value['missingArea']);
    formData.append('language', this.missingPersonForm.value['language']);
    formData.append('fatherName', this.missingPersonForm.value['fatherName']);
    formData.append('motherName', this.missingPersonForm.value['motherName']);
    formData.append(
      'wearnigClooth',
      this.missingPersonForm.value['wearnigClooth']
    );
    formData.append('nationality', this.missingPersonForm.value['nationality']);
    formData.append(
      'dateOfMissing',
      this.missingPersonForm.value['dateOfMissing']
    );
    formData.append('firnoDate', this.missingPersonForm.value['firnoDate']);
    formData.append('mobileNo', this.missingPersonForm.value['mobileNo']);
    formData.append('address', this.missingPersonForm.value['address']);
    formData.append('religion', this.missingPersonForm.value['religion']);
    formData.append(
      'sectionFirLoged',
      this.missingPersonForm.value['sectionFirLoged']
    );

    if (this.IMAGE) {
      formData.append('missingImage', this.IMAGE, this.IMAGE.name);
    }

    if (this.missingPersonForm.value['id'])
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
    const control = this.missingPersonForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.missingPersonForm.controls[controlName];
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
    this.missingPersonForm.patchValue({
      [name]: event.target.value,
    });
  };

}
