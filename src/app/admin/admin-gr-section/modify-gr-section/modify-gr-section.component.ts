import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-modify-gr-section',
  templateUrl: './modify-gr-section.component.html',
  styleUrls: ['./modify-gr-section.component.scss'],
})
export class ModifyGrSectionComponent implements OnInit, OnDestroy {
  subscription: any;
  grSection: any;
  loading = false;
  grSectionForm: UntypedFormGroup;

  ADD_GR_SECTION: boolean;
  EDIT_GR_SECTION: boolean;
  VIEW_GR_SECTION: boolean;
  max: Date = new Date();
  ADD_URL: string;
  EDIT_URL: string;
  VIEW_URL: string;

  DOCUMENT: File = null;
  language: string;

  GR_PARAMS = {
    ID: null,
    DETAILSTYPE: null,
    SRNODATE: '',
    COURTNAME: '',
    CASERELATED: null,
    CASENO: '',
    PRONAME: '',
    PROCADDRESS: '',
    PROCTYPE: null,
    MOBILENO: '',
    PRESENTDATE: '',
    NEXTDATE: '',
    DATEOFRECEIPT: '',
    STATEOFVICTIM: null,
    OFFICERNAME: '',
    REMARK: '',
    DOCUMENT: '',
    RECIPTNO: '',
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
    this.grSection = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.grSection) {
      this.GR_PARAMS.ID = this.grSection.id;
      this.GR_PARAMS.DETAILSTYPE = this.grSection.detailType;
      this.GR_PARAMS.SRNODATE = this.grSection.serialNoDate;
      this.GR_PARAMS.COURTNAME = this.grSection.courtName;
      this.GR_PARAMS.CASERELATED = this.grSection.caseRelated;
      this.GR_PARAMS.CASENO = this.grSection.caseNo;
      this.GR_PARAMS.PRONAME = this.grSection.proName;
      this.GR_PARAMS.PROCADDRESS = this.grSection.procAddress;
      this.GR_PARAMS.PROCTYPE = this.grSection.procType;
      this.GR_PARAMS.MOBILENO = this.grSection.mobileNo;
      this.GR_PARAMS.PRESENTDATE = this.grSection.presentDate;
      this.GR_PARAMS.NEXTDATE = this.grSection.nextDate;
      this.GR_PARAMS.DATEOFRECEIPT = this.grSection.dateOfRecipt;
      this.GR_PARAMS.STATEOFVICTIM = this.grSection.stateVictime;
      this.GR_PARAMS.OFFICERNAME = this.grSection.officerName;
      this.GR_PARAMS.REMARK = this.grSection.remark;
      this.GR_PARAMS.RECIPTNO = this.grSection.reciptNo;
    }

    this.ADD_GR_SECTION = this.global.checkForUserButtonPermission(
      AppConstants.GR_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_GR_SECTION = this.global.checkForUserButtonPermission(
      AppConstants.GR_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.GR_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.GR_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initGrSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initGrSectionForm = () => {
    this.grSectionForm = this.fb.group({
      id: this.GR_PARAMS.ID,
      detailType: [
        this.GR_PARAMS.DETAILSTYPE,
        Validators.compose([Validators.required]),
      ],
      serialNoDate: [
        this.GR_PARAMS.SRNODATE,
        Validators.compose([Validators.required]),
      ],
      courtName: [
        this.GR_PARAMS.COURTNAME,
        Validators.compose([Validators.required]),
      ],
      caseRelated: [
        this.GR_PARAMS.CASERELATED,
        Validators.compose([Validators.required]),
      ],
      caseNo: [
        this.GR_PARAMS.CASENO,
        Validators.compose([Validators.required]),
      ],
      proName: [
        this.GR_PARAMS.PRONAME,
        Validators.compose([Validators.required]),
      ],
      procAddress: [
        this.GR_PARAMS.PROCADDRESS,
        Validators.compose([Validators.required]),
      ],
      procType: [
        this.GR_PARAMS.PROCTYPE,
        Validators.compose([Validators.required]),
      ],
      mobileNo: [
        this.GR_PARAMS.MOBILENO,
        Validators.compose([Validators.required]),
      ],
      presentDate: [
        this.GR_PARAMS.PRESENTDATE,
        Validators.compose([Validators.required]),
      ],
      nextDate: [
        this.GR_PARAMS.NEXTDATE,
        Validators.compose([Validators.required]),
      ],
      dateOfRecipt: [
        this.GR_PARAMS.DATEOFRECEIPT,
        Validators.compose([Validators.required]),
      ],
      stateVictime: [
        this.GR_PARAMS.STATEOFVICTIM,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.GR_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      remark: [
        this.GR_PARAMS.REMARK,
      ],
      document: [this.GR_PARAMS.DOCUMENT],
      reciptNo: [this.GR_PARAMS.RECIPTNO],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.grSectionForm.controls;
    if (this.grSectionForm.invalid && !this.grSectionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.grSection) formData.append('id', this.grSectionForm.value['id']);
    formData.append('detailType', this.grSectionForm.value['detailType']);
    formData.append('serialNoDate', this.grSectionForm.value['serialNoDate']);
    formData.append('courtName', this.grSectionForm.value['courtName']);
    formData.append('caseRelated', this.grSectionForm.value['caseRelated']);
    formData.append('caseNo', this.grSectionForm.value['caseNo']);
    formData.append('proName', this.grSectionForm.value['proName']);
    formData.append('procAddress', this.grSectionForm.value['procAddress']);
    formData.append('procType', this.grSectionForm.value['procType']);
    formData.append('mobileNo', this.grSectionForm.value['mobileNo']);
    formData.append('presentDate', this.grSectionForm.value['presentDate']);
    formData.append('nextDate', this.grSectionForm.value['nextDate']);
    formData.append('dateOfRecipt', this.grSectionForm.value['dateOfRecipt']);
    formData.append('stateVictime', this.grSectionForm.value['stateVictime']);
    formData.append('officerName', this.grSectionForm.value['officerName']);
    formData.append('remark', this.grSectionForm.value['remark']);
    formData.append('reciptNo', this.grSectionForm.value['reciptNo']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.grSectionForm.value['id'])
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
            this.localStorage.setStoredValue('grSectionValue', data.id);
            this.localStorage.setStoredValue(
              'grSectionUrl',
              '/official/grSection'
            );
            this.router.navigate(['/official/grSectionDetails/edit']);
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
            this.localStorage.setStoredValue('grSectionValue', data.id);
            this.localStorage.setStoredValue(
              'grSectionUrl',
              '/official/grSection'
            );
            this.router.navigate(['/official/grSectionDetails/add']);
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.grSectionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.grSectionForm.controls[controlName];
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
    this.DOCUMENT = file.item(0);
  };

  setDataRecipt = (value: string) => {
    var receipt = value.split(',');
    this.grSectionForm.patchValue({
      reciptNo: receipt[0],
      serialNoDate: value.toUpperCase(),
    });
  };

  focusOut = (event, name) => {
    this.grSectionForm.patchValue({
      [name]: event.target.value,
    });
  };

}
