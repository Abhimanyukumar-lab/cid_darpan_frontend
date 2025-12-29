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
  selector: 'app-modify-found-person',
  templateUrl: './modify-found-person.component.html',
  styleUrls: ['./modify-found-person.component.scss'],
})
export class ModifyFoundPersonComponent implements OnInit, OnDestroy {
  subscription: any;
  foundPerson: any;
  loading = false;
  foundPersonForm: UntypedFormGroup;

  stationList: PoliceStation[];
  genderList: Options[];

  ADD_FOUND_PERSON: boolean;
  EDIT_FOUND_PERSON: boolean;
  VIEW_FOUND_PERSON: boolean;
  max: Date = new Date();
  ADD_URL: string;
  EDIT_URL: string;
  VIEW_URL: string;

  IMAGE: File = null;
  language: string;

  FOUND_PARAMS = {
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
    LANGUAGE: '',
    FATHER: '',
    MOTHER: '',
    CLOTHS: '',
    NATIONALITY: '',
    FOUND_DATE: '',
    FIR_NO: '',
    MOBILE: '',
    ADDRESS: '',
    RELISION: '',
    SECTION_LODGED: '',
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
    this.foundPerson = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.foundPerson) {
      this.FOUND_PARAMS.ID = this.foundPerson.id;
      this.FOUND_PARAMS.NAME = this.foundPerson.missingName;
      this.FOUND_PARAMS.STATION_ID = this.foundPerson.stationId;
      this.FOUND_PARAMS.STATION_NAME = this.foundPerson.stationName;
      this.FOUND_PARAMS.GENDER = this.foundPerson.missingGender;
      this.FOUND_PARAMS.AGE = this.foundPerson.missingAge;
      this.FOUND_PARAMS.BIRTH_DATE = this.foundPerson.missingDate;
      this.FOUND_PARAMS.HEIGHT = this.foundPerson.missingHieght;
      this.FOUND_PARAMS.COLOR = this.foundPerson.missingColor;
      this.FOUND_PARAMS.IDENTITY = this.foundPerson.missingSign;
      this.FOUND_PARAMS.AREA = this.foundPerson.missingArea;
      this.FOUND_PARAMS.LANGUAGE = this.foundPerson.language;
      this.FOUND_PARAMS.FATHER = this.foundPerson.fatherName;
      this.FOUND_PARAMS.MOTHER = this.foundPerson.motherName;
      this.FOUND_PARAMS.CLOTHS = this.foundPerson.wearnigClooth;
      this.FOUND_PARAMS.NATIONALITY = this.foundPerson.nationality;
      this.FOUND_PARAMS.FOUND_DATE = this.foundPerson.dateOfMissing;
      this.FOUND_PARAMS.FIR_NO = this.foundPerson.firnoDate;
      this.FOUND_PARAMS.MOBILE = this.foundPerson.mobileNo;
      this.FOUND_PARAMS.ADDRESS = this.foundPerson.address;
      this.FOUND_PARAMS.RELISION = this.foundPerson.religion;
      this.FOUND_PARAMS.SECTION_LODGED = this.foundPerson.sectionFirLoged;
    }

    this.ADD_FOUND_PERSON = this.global.checkForUserButtonPermission(
      AppConstants.FOUND_PERSON_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_FOUND_PERSON = this.global.checkForUserButtonPermission(
      AppConstants.FOUND_PERSON_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.FOUND_PERSON_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.FOUND_PERSON_MODULE.EDIT_SUBMIT_URL;

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
    this.initFoundPersonForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initFoundPersonForm = () => {
    this.foundPersonForm = this.fb.group({
      id: this.FOUND_PARAMS.ID,
      stationId: [
        this.FOUND_PARAMS.STATION_ID,
        Validators.compose([Validators.required]),
      ],
      missingName: [
        this.FOUND_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],

      missingGender: [
        this.FOUND_PARAMS.GENDER,
        Validators.compose([Validators.required]),
      ],
      missingAge: [
        this.FOUND_PARAMS.AGE,
        Validators.compose([Validators.required]),
      ],
      missingDate: [
        this.FOUND_PARAMS.BIRTH_DATE,
        Validators.compose([Validators.required]),
      ],
      missingHieght: [
        this.FOUND_PARAMS.HEIGHT,
        Validators.compose([Validators.required]),
      ],
      missingColor: [
        this.FOUND_PARAMS.COLOR,
        Validators.compose([Validators.required]),
      ],
      missingSign: [
        this.FOUND_PARAMS.IDENTITY,
        Validators.compose([Validators.required]),
      ],
      missingArea: [
        this.FOUND_PARAMS.AREA,
      ],
      missingImage: [this.FOUND_PARAMS.IMAGE],
      language: [
        this.FOUND_PARAMS.LANGUAGE,
      ],
      fatherName: [
        this.FOUND_PARAMS.FATHER,
      ],
      motherName: [
        this.FOUND_PARAMS.MOTHER,
      ],
      wearnigClooth: [
        this.FOUND_PARAMS.CLOTHS,
      ],
      nationality: [
        this.FOUND_PARAMS.NATIONALITY,
      ],
      dateOfMissing: [
        this.FOUND_PARAMS.FOUND_DATE,
      ],
      firnoDate: [
        this.FOUND_PARAMS.FIR_NO,
      ],
      mobileNo: [
        this.FOUND_PARAMS.MOBILE,
      ],
      address: [
        this.FOUND_PARAMS.ADDRESS,
      ],
      religion: [
        this.FOUND_PARAMS.RELISION,
      ],
      sectionFirLoged: [
        this.FOUND_PARAMS.SECTION_LODGED,
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.foundPersonForm.controls;
    if (this.foundPersonForm.invalid && !this.foundPersonForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.foundPerson)
      formData.append('id', this.foundPersonForm.value['id']);
    formData.append('stationId', this.foundPersonForm.value['stationId']);
    formData.append('stationName', this.foundPersonForm.value['stationName']);
    formData.append('missingName', this.foundPersonForm.value['missingName']);
    formData.append(
      'missingGender',
      this.foundPersonForm.value['missingGender']
    );
    formData.append('missingAge', this.foundPersonForm.value['missingAge']);
    formData.append('missingDate', this.foundPersonForm.value['missingDate']);
    formData.append(
      'missingHieght',
      this.foundPersonForm.value['missingHieght']
    );
    formData.append('missingColor', this.foundPersonForm.value['missingColor']);
    formData.append('missingSign', this.foundPersonForm.value['missingSign']);
    formData.append('missingArea', this.foundPersonForm.value['missingArea']);
    formData.append('language', this.foundPersonForm.value['language']);
    formData.append('fatherName', this.foundPersonForm.value['fatherName']);
    formData.append('motherName', this.foundPersonForm.value['motherName']);
    formData.append(
      'wearnigClooth',
      this.foundPersonForm.value['wearnigClooth']
    );
    formData.append('nationality', this.foundPersonForm.value['nationality']);
    formData.append(
      'dateOfMissing',
      this.foundPersonForm.value['dateOfMissing']
    );
    formData.append('firnoDate', this.foundPersonForm.value['firnoDate']);
    formData.append('mobileNo', this.foundPersonForm.value['mobileNo']);
    formData.append('address', this.foundPersonForm.value['address']);
    formData.append('religion', this.foundPersonForm.value['religion']);
    formData.append(
      'sectionFirLoged',
      this.foundPersonForm.value['sectionFirLoged']
    );

    if (this.IMAGE) {
      formData.append('missingImage', this.IMAGE, this.IMAGE.name);
    }

    if (this.foundPersonForm.value['id'])
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
    const control = this.foundPersonForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.foundPersonForm.controls[controlName];
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

  goBack() {
    this._location.back();
  }

  handleFileChange = (file: FileList) => {
    this.IMAGE = file.item(0);
  };

  focusOut = (event, name) => {
    this.foundPersonForm.patchValue({
      [name]: event.target.value,
    });
  };

}
