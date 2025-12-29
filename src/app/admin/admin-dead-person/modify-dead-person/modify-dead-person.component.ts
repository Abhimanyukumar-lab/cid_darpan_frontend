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
  selector: 'app-modify-dead-person',
  templateUrl: './modify-dead-person.component.html',
  styleUrls: ['./modify-dead-person.component.scss'],
})
export class ModifyDeadPersonComponent implements OnInit, OnDestroy {
  subscription: any;
  deadPerson: any;
  loading = false;
  deadPersonForm: UntypedFormGroup;

  stationList: PoliceStation[];
  genderList: Options[];

  ADD_DEAD_PERSON: boolean;
  EDIT_DEAD_PERSON: boolean;
  VIEW_DEAD_PERSON: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  VIEW_URL: string;
  max: Date = new Date();
  IMAGE: File = null;
  language: string;

  DEAD_PARAMS = {
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
    DEATH_CAUSE: '',
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
    this.deadPerson = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.deadPerson) {
      this.DEAD_PARAMS.ID = this.deadPerson.id;
      this.DEAD_PARAMS.NAME = this.deadPerson.missingName;
      this.DEAD_PARAMS.STATION_ID = this.deadPerson.stationId;
      this.DEAD_PARAMS.STATION_NAME = this.deadPerson.stationName;
      this.DEAD_PARAMS.GENDER = this.deadPerson.missingGender;
      this.DEAD_PARAMS.AGE = this.deadPerson.missingAge;
      this.DEAD_PARAMS.BIRTH_DATE = this.deadPerson.missingDate;
      this.DEAD_PARAMS.HEIGHT = this.deadPerson.missingHieght;
      this.DEAD_PARAMS.COLOR = this.deadPerson.missingColor;
      this.DEAD_PARAMS.IDENTITY = this.deadPerson.missingSign;
      this.DEAD_PARAMS.AREA = this.deadPerson.missingArea;
      this.DEAD_PARAMS.DEATH_CAUSE = this.deadPerson.deathCause;
      this.DEAD_PARAMS.FATHER = this.deadPerson.fatherName;
      this.DEAD_PARAMS.MOTHER = this.deadPerson.motherName;
      this.DEAD_PARAMS.CLOTHS = this.deadPerson.wearnigClooth;
      this.DEAD_PARAMS.NATIONALITY = this.deadPerson.nationality;
      this.DEAD_PARAMS.FOUND_DATE = this.deadPerson.dateOfMissing;
      this.DEAD_PARAMS.FIR_NO = this.deadPerson.firnoDate;
      this.DEAD_PARAMS.MOBILE = this.deadPerson.mobileNo;
      this.DEAD_PARAMS.ADDRESS = this.deadPerson.address;
      this.DEAD_PARAMS.RELISION = this.deadPerson.religion;
      this.DEAD_PARAMS.SECTION_LODGED = this.deadPerson.sectionFirLoged;
    }

    this.ADD_DEAD_PERSON = this.global.checkForUserButtonPermission(
      AppConstants.DEAD_PERSON_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_DEAD_PERSON = this.global.checkForUserButtonPermission(
      AppConstants.DEAD_PERSON_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.DEAD_PERSON_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.DEAD_PERSON_MODULE.EDIT_SUBMIT_URL;

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
    this.deadPersonForm = this.fb.group({
      id: this.DEAD_PARAMS.ID,
      stationId: [
        this.DEAD_PARAMS.STATION_ID,
        Validators.compose([Validators.required]),
      ],
      missingName: [
        this.DEAD_PARAMS.NAME,
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],

      missingGender: [
        this.DEAD_PARAMS.GENDER,
        Validators.compose([Validators.required]),
      ],
      missingAge: [
        this.DEAD_PARAMS.AGE,
        Validators.compose([Validators.required]),
      ],
      missingDate: [
        this.DEAD_PARAMS.BIRTH_DATE,
      ],
      missingHieght: [
        this.DEAD_PARAMS.HEIGHT,
        Validators.compose([Validators.required]),
      ],
      missingColor: [
        this.DEAD_PARAMS.COLOR,
        Validators.compose([Validators.required]),
      ],
      missingSign: [
        this.DEAD_PARAMS.IDENTITY,
        Validators.compose([Validators.required]),
      ],
      missingArea: [
        this.DEAD_PARAMS.AREA,
        Validators.compose([Validators.required]),
      ],
      missingImage: [this.DEAD_PARAMS.IMAGE],
      deathCause: [this.DEAD_PARAMS.DEATH_CAUSE],
      fatherName: [this.DEAD_PARAMS.FATHER],
      motherName: [this.DEAD_PARAMS.MOTHER],
      wearnigClooth: [
        this.DEAD_PARAMS.CLOTHS,
        Validators.compose([Validators.required]),
      ],
      nationality: [
        this.DEAD_PARAMS.NATIONALITY,
        Validators.compose([Validators.required]),
      ],
      dateOfMissing: [
        this.DEAD_PARAMS.FOUND_DATE,
        Validators.compose([Validators.required]),
      ],
      firnoDate: [this.DEAD_PARAMS.FIR_NO],
      mobileNo: [this.DEAD_PARAMS.MOBILE],
      address: [this.DEAD_PARAMS.ADDRESS],
      religion: [this.DEAD_PARAMS.RELISION],
      sectionFirLoged: [this.DEAD_PARAMS.SECTION_LODGED],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.deadPersonForm.controls;
    if (this.deadPersonForm.invalid && !this.deadPersonForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.deadPerson) formData.append('id', this.deadPersonForm.value['id']);
    formData.append('stationId', this.deadPersonForm.value['stationId']);
    formData.append('stationName', this.deadPersonForm.value['stationName']);
    formData.append('missingName', this.deadPersonForm.value['missingName']);
    formData.append(
      'missingGender',
      this.deadPersonForm.value['missingGender']
    );
    formData.append('missingAge', this.deadPersonForm.value['missingAge']);
    formData.append('missingDate', this.deadPersonForm.value['missingDate']);
    formData.append(
      'missingHieght',
      this.deadPersonForm.value['missingHieght']
    );
    formData.append('missingColor', this.deadPersonForm.value['missingColor']);
    formData.append('missingSign', this.deadPersonForm.value['missingSign']);
    formData.append('missingArea', this.deadPersonForm.value['missingArea']);
    formData.append('deathCause', this.deadPersonForm.value['deathCause']);
    formData.append('fatherName', this.deadPersonForm.value['fatherName']);
    formData.append('motherName', this.deadPersonForm.value['motherName']);
    formData.append(
      'wearnigClooth',
      this.deadPersonForm.value['wearnigClooth']
    );
    formData.append('nationality', this.deadPersonForm.value['nationality']);
    formData.append(
      'dateOfMissing',
      this.deadPersonForm.value['dateOfMissing']
    );
    formData.append('firnoDate', this.deadPersonForm.value['firnoDate']);
    formData.append('mobileNo', this.deadPersonForm.value['mobileNo']);
    formData.append('address', this.deadPersonForm.value['address']);
    formData.append('religion', this.deadPersonForm.value['religion']);
    formData.append(
      'sectionFirLoged',
      this.deadPersonForm.value['sectionFirLoged']
    );

    if (this.IMAGE) {
      formData.append('missingImage', this.IMAGE, this.IMAGE.name);
    }

    if (this.deadPersonForm.value['id'])
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
    const control = this.deadPersonForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.deadPersonForm.controls[controlName];
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
    this.deadPersonForm.patchValue({
      [name]: event.target.value,
    });
  };
}
