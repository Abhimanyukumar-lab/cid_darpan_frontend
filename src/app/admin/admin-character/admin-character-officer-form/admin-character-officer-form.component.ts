import { Location } from '@angular/common';
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
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-admin-character-officer-form',
  templateUrl: './admin-character-officer-form.component.html',
  styleUrls: ['./admin-character-officer-form.component.scss'],
})
export class AdminCharacterOfficerFormComponent implements OnInit, OnDestroy {
  // addUrl: string = AppConstants.CHARACTER_MODULE.ADD_CHAR_FORM_URL;
  // editUrl: string = AppConstants.CHARACTER_MODULE.EDIT_CHAR_FORM_URL;
  subscription: any;

  backUrl: string;
  characterData: any;
  loading = false;
  characterOfficerForm: UntypedFormGroup;
  id: number;
  characterId: number = null;

  ADD_FORM: boolean;
  EDIT_FORM: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  CHAR_FORM_PARAMS = {
    ID: null,
    CHARACTER_ID: null,
    STATION_MEMO_NO: null,
    QUESTION1: null,
    QUESTION2: null,
    QUESTION3: null,
    QUESTION4: null,
    QUESTION5: null,
    QUESTION6: null,
    QUESTION7: null,
    QUESTION8: null,
    QUESTION9: null,
    QUESTION10: null,
    QUESTION11: null,
    QUESTION12: null,
  };

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule,
    private router: Router
  ) {
    this.characterData = this.localStorage.getStoredValue('viewData');

    this.id = this.localStorage.getStoredValue('characterValue');
    this.backUrl = this.localStorage.getStoredValue('characterUrl');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.apiService
      .apiPostCall(
        AppConstants.CHARACTER_MODULE.GET_CHAR_FORM_URL,
        { characterId: this.id },
        true
      )
      .subscribe((data) => {
        if (data.characterFormDTO) {
          this.CHAR_FORM_PARAMS.ID = data.characterFormDTO.id;
          this.CHAR_FORM_PARAMS.CHARACTER_ID =
            data.characterFormDTO.characterId;

          this.CHAR_FORM_PARAMS.STATION_MEMO_NO =
            data.characterFormDTO.characterDetailsDTO.stationMemoNo;
          this.CHAR_FORM_PARAMS.QUESTION1 = data.characterFormDTO.question1;
          this.CHAR_FORM_PARAMS.QUESTION2 = data.characterFormDTO.question2;
          this.CHAR_FORM_PARAMS.QUESTION3 = data.characterFormDTO.question3;
          this.CHAR_FORM_PARAMS.QUESTION4 = data.characterFormDTO.question4;
          this.CHAR_FORM_PARAMS.QUESTION5 = data.characterFormDTO.question5;
          this.CHAR_FORM_PARAMS.QUESTION6 = data.characterFormDTO.question6;
          this.CHAR_FORM_PARAMS.QUESTION7 = data.characterFormDTO.question7;
          this.CHAR_FORM_PARAMS.QUESTION8 = data.characterFormDTO.question8;
          this.CHAR_FORM_PARAMS.QUESTION9 = data.characterFormDTO.question9;
          this.CHAR_FORM_PARAMS.QUESTION10 = data.characterFormDTO.question10;
          this.CHAR_FORM_PARAMS.QUESTION11 = data.characterFormDTO.question11;
          this.CHAR_FORM_PARAMS.QUESTION12 = data.characterFormDTO.question12;
        }
        this.initCharOfficerForm();
      });

    this.ADD_FORM = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.ADD_CHAR_FORM
    );
    this.EDIT_FORM = this.global.checkForUserButtonPermission(
      AppConstants.CHARACTER_MODULE.EDIT_CHAR_FORM
    );

    this.ADD_URL = AppConstants.CHARACTER_MODULE.ADD_CHAR_FORM_URL;
    this.EDIT_URL = AppConstants.CHARACTER_MODULE.EDIT_CHAR_FORM_URL;
  }

  ngOnInit(): void {
    this.CHAR_FORM_PARAMS.CHARACTER_ID = this.id;
    this.characterId = this.id;
    this.initCharOfficerForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');

    this.subscription.unsubscribe();

    // this.localStorage.destroyStoredValue('characterValue');
    // this.localStorage.destroyStoredValue('characterUrl');
  }
  initCharOfficerForm = () => {
    this.characterOfficerForm = this.fb.group({
      id: this.CHAR_FORM_PARAMS.ID,
      characterId: [
        this.CHAR_FORM_PARAMS.CHARACTER_ID,
        Validators.compose([Validators.required]),
      ],
      stationMemoNumber: [
        this.CHAR_FORM_PARAMS.STATION_MEMO_NO,
        Validators.compose([Validators.required]),
      ],
      question1: [
        this.CHAR_FORM_PARAMS.QUESTION1,
        Validators.compose([Validators.required]),
      ],
      question2: [
        this.CHAR_FORM_PARAMS.QUESTION2,
        Validators.compose([Validators.required]),
      ],
      question3: [
        this.CHAR_FORM_PARAMS.QUESTION3,
        Validators.compose([Validators.required]),
      ],
      question4: [
        this.CHAR_FORM_PARAMS.QUESTION4,
        Validators.compose([Validators.required]),
      ],
      question5: [
        this.CHAR_FORM_PARAMS.QUESTION5,
        Validators.compose([Validators.required]),
      ],
      question6: [
        this.CHAR_FORM_PARAMS.QUESTION6,
        Validators.compose([Validators.required]),
      ],
      question7: [
        this.CHAR_FORM_PARAMS.QUESTION7,
        Validators.compose([Validators.required]),
      ],
      question8: [
        this.CHAR_FORM_PARAMS.QUESTION8,
        Validators.compose([Validators.required]),
      ],
      question9: [
        this.CHAR_FORM_PARAMS.QUESTION9,
        Validators.compose([Validators.required]),
      ],
      question10: [
        this.CHAR_FORM_PARAMS.QUESTION10,
        Validators.compose([Validators.required]),
      ],
      question11: [this.CHAR_FORM_PARAMS.QUESTION11],
      question12: [
        this.CHAR_FORM_PARAMS.QUESTION12,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.characterOfficerForm.controls;
    if (this.characterOfficerForm.invalid && !this.characterOfficerForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.characterOfficerForm.value['id']) {
      this.apiService
        .apiPostCall(this.EDIT_URL, this.characterOfficerForm.value, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.loading = false;
            this.characterOfficerForm.reset();
            this.goBack();
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    } else {
      this.apiService
        .apiPostCall(this.ADD_URL, this.characterOfficerForm.value, true)
        .subscribe(
          (data) => {
            this.toaster.getToastMessage(
              data.message,
              'success',
              3000,
              'top-end'
            );
            this.loading = false;
            this.characterOfficerForm.reset();
            this.goBack();
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
    }
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.characterOfficerForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.characterOfficerForm.controls[controlName];
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

  focusOut = (event, name) => {
    this.characterOfficerForm.patchValue({
      [name]: event.target.value,
    });
  };
}
