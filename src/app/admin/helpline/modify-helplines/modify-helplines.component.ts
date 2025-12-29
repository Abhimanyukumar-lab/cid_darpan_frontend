import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-modify-helplines',
  templateUrl: './modify-helplines.component.html',
  styleUrls: ['./modify-helplines.component.scss'],
})
export class ModifyHelplinesComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subscription: any;
  helpline: any;
  loading = false;
  helplinesForm: UntypedFormGroup;

  ADD_HELPLINE: boolean;
  EDIT_HELPLINE: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  designationList: string;

  HELPLINE_PARAMS = {
    ID: null,
    NAME: '',
    NAMEHI: '',
    TYPE: null,
    NO: '',
    NO1: '',
    DESIGNATION_ID: null,
    DESIGNATION: '',
    DescriptionEn: '',
    DescriptionHi: '',
    PRIORITY: '',
  };

  currentLang: string;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiService: ApiCallerService,
    private localStorage: LocalstorageService,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private toaster: ToasterService,
    private _location: Location,
    public langModule: LangModule,
    private translateService: TranslateService
  ) {
    this.helpline = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.currentLang = data.defaultLang;
    });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    if (this.helpline) {
      this.HELPLINE_PARAMS.ID = this.helpline.id;
      this.HELPLINE_PARAMS.NAME = this.helpline.name;
      this.HELPLINE_PARAMS.NAMEHI = this.helpline.nameHi;
      this.HELPLINE_PARAMS.TYPE = this.helpline.type;
      this.HELPLINE_PARAMS.DESIGNATION = this.helpline.designationName;
      this.HELPLINE_PARAMS.DESIGNATION_ID = this.helpline.designationId;
      this.HELPLINE_PARAMS.DescriptionEn = this.helpline.descriptionEn;
      this.HELPLINE_PARAMS.DescriptionHi = this.helpline.descriptionHi;
      this.HELPLINE_PARAMS.NO = this.helpline.no
        .replaceAll(' ', '')
        .split(',')[0];
      this.HELPLINE_PARAMS.NO1 = this.helpline.no
        .replaceAll(' ', '')
        .split(',')[1];
      this.HELPLINE_PARAMS.PRIORITY = this.helpline.priority;
    }

    this.ADD_HELPLINE = this.global.checkForUserButtonPermission(
      AppConstants.HELPLINE_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_HELPLINE = this.global.checkForUserButtonPermission(
      AppConstants.HELPLINE_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.HELPLINE_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.HELPLINE_MODULE.EDIT_SUBMIT_URL;
  }
  ngAfterViewInit(): void {
    this.translateService.onLoadAddedControll(
      document.getElementsByClassName('hindiFont')
    );
    // this.translateService.onLoad();
  }

  ngOnInit(): void {
    this.initiateHelplineForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateHelplineForm = () => {
    this.helplinesForm = this.fb.group({
      id: this.HELPLINE_PARAMS.ID,
      name: [
        this.HELPLINE_PARAMS.NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      nameHi: [
        this.HELPLINE_PARAMS.NAMEHI,
        Validators.compose([Validators.required]),
      ],
      type: [
        this.HELPLINE_PARAMS.TYPE,
        Validators.compose([Validators.required]),
      ],
      designationId: [
        this.HELPLINE_PARAMS.DESIGNATION_ID,
        Validators.compose([Validators.required]),
      ],
      descriptionEn: [this.HELPLINE_PARAMS.DescriptionEn],
      descriptionHi: [this.HELPLINE_PARAMS.DescriptionHi],
      no: [
        this.HELPLINE_PARAMS.NO,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(13),
        ]),
      ],
      no1: [
        this.HELPLINE_PARAMS.NO1,
        Validators.compose([Validators.minLength(3), Validators.maxLength(13)]),
      ],
      priority: [
        this.HELPLINE_PARAMS.PRIORITY,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.helplinesForm.controls;
    if (this.helplinesForm.invalid && !this.helplinesForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    if (this.helplinesForm.value['id']) {
      this.apiService
        .apiPostCall(this.EDIT_URL, this.helplinesForm.value, true)
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
    } else {
      this.apiService
        .apiPostCall(this.ADD_URL, this.helplinesForm.value, true)
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
    }
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.helplinesForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.helplinesForm.controls[controlName];
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
    this.helplinesForm.patchValue({
      [name]: event.target.value,
    });
  };
}
