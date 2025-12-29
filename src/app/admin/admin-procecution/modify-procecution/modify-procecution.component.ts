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
  selector: 'app-modify-procecution',
  templateUrl: './modify-procecution.component.html',
  styleUrls: ['./modify-procecution.component.scss'],
})
export class ModifyProcecutionComponent implements OnInit, OnDestroy {
  subscription: any;
  procecution: any;
  loading = false;
  procecutionForm: UntypedFormGroup;

  ADD_PROCECUTION: boolean;
  EDIT_PROCECUTION: boolean;
  VIEW_PROCECUTION: boolean;
  max: Date = new Date();
  ADD_URL: string;
  EDIT_URL: string;
  VIEW_URL: string;

  isDispatchPresent: boolean = false;

  DOCUMENT: File = null;
  language: string;

  PROCECUTION_PARAMS = {
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
    DISPNO: '',
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
    this.procecution = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.procecution) {
      this.PROCECUTION_PARAMS.ID = this.procecution.id;
      this.PROCECUTION_PARAMS.DETAILSTYPE = this.procecution.detailType;
      this.PROCECUTION_PARAMS.SRNODATE = this.procecution.serialNoDate;
      this.PROCECUTION_PARAMS.COURTNAME = this.procecution.courtName;
      this.PROCECUTION_PARAMS.CASERELATED = this.procecution.caseRelated;
      this.PROCECUTION_PARAMS.CASENO = this.procecution.caseNo;
      this.PROCECUTION_PARAMS.PRONAME = this.procecution.proName;
      this.PROCECUTION_PARAMS.PROCADDRESS = this.procecution.procAddress;
      this.PROCECUTION_PARAMS.PROCTYPE = this.procecution.procType;
      this.PROCECUTION_PARAMS.MOBILENO = this.procecution.mobileNo;
      this.PROCECUTION_PARAMS.PRESENTDATE = this.procecution.presentDate;
      this.PROCECUTION_PARAMS.NEXTDATE = this.procecution.nextDate;
      this.PROCECUTION_PARAMS.DATEOFRECEIPT = this.procecution.dateOfRecipt;
      this.PROCECUTION_PARAMS.STATEOFVICTIM = this.procecution.stateVictime;
      this.PROCECUTION_PARAMS.OFFICERNAME = this.procecution.officerName;
      this.PROCECUTION_PARAMS.REMARK = this.procecution.remark;
      this.PROCECUTION_PARAMS.RECIPTNO = this.procecution.reciptNo;
      this.PROCECUTION_PARAMS.DISPNO = this.procecution.dispatchNum;
    }

    this.ADD_PROCECUTION = this.global.checkForUserButtonPermission(
      AppConstants.PROCECUTION_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_PROCECUTION = this.global.checkForUserButtonPermission(
      AppConstants.PROCECUTION_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.PROCECUTION_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.PROCECUTION_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initGrSectionForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initGrSectionForm = () => {
    this.procecutionForm = this.fb.group({
      id: this.PROCECUTION_PARAMS.ID,
      detailType: [
        this.PROCECUTION_PARAMS.DETAILSTYPE,
        Validators.compose([Validators.required]),
      ],
      serialNoDate: [
        this.PROCECUTION_PARAMS.SRNODATE,
        Validators.compose([Validators.required]),
      ],
      courtName: [
        this.PROCECUTION_PARAMS.COURTNAME,
        Validators.compose([Validators.required]),
      ],
      caseRelated: [
        this.PROCECUTION_PARAMS.CASERELATED,
        Validators.compose([Validators.required]),
      ],
      caseNo: [
        this.PROCECUTION_PARAMS.CASENO,
        Validators.compose([Validators.required]),
      ],
      proName: [
        this.PROCECUTION_PARAMS.PRONAME,
        Validators.compose([Validators.required]),
      ],
      procAddress: [this.PROCECUTION_PARAMS.PROCADDRESS],
      procType: [
        this.PROCECUTION_PARAMS.PROCTYPE,
        Validators.compose([Validators.required]),
      ],
      mobileNo: [this.PROCECUTION_PARAMS.MOBILENO],
      presentDate: [
        this.PROCECUTION_PARAMS.PRESENTDATE,
        Validators.compose([Validators.required]),
      ],
      nextDate: [this.PROCECUTION_PARAMS.NEXTDATE],
      dateOfRecipt: [
        this.PROCECUTION_PARAMS.DATEOFRECEIPT,
        Validators.compose([Validators.required]),
      ],
      stateVictime: [
        this.PROCECUTION_PARAMS.STATEOFVICTIM,
        Validators.compose([Validators.required]),
      ],
      officerName: [this.PROCECUTION_PARAMS.OFFICERNAME],
      remark: [this.PROCECUTION_PARAMS.REMARK],
      document: [this.PROCECUTION_PARAMS.DOCUMENT],
      reciptNo: [this.PROCECUTION_PARAMS.RECIPTNO],
      dispatchNum: [this.PROCECUTION_PARAMS.DISPNO],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.procecutionForm.controls;
    if (this.procecutionForm.invalid && !this.procecutionForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.procecution)
      formData.append('id', this.procecutionForm.value['id']);
    formData.append('detailType', this.procecutionForm.value['detailType']);
    formData.append('serialNoDate', this.procecutionForm.value['serialNoDate']);
    formData.append('courtName', this.procecutionForm.value['courtName']);
    formData.append('caseRelated', this.procecutionForm.value['caseRelated']);
    formData.append('caseNo', this.procecutionForm.value['caseNo']);
    formData.append('proName', this.procecutionForm.value['proName']);
    formData.append('procAddress', this.procecutionForm.value['procAddress']);
    formData.append('procType', this.procecutionForm.value['procType']);
    formData.append('mobileNo', this.procecutionForm.value['mobileNo']);
    formData.append('presentDate', this.procecutionForm.value['presentDate']);
    formData.append('nextDate', this.procecutionForm.value['nextDate']);
    formData.append('dateOfRecipt', this.procecutionForm.value['dateOfRecipt']);
    formData.append('stateVictime', this.procecutionForm.value['stateVictime']);
    formData.append('officerName', this.procecutionForm.value['officerName']);
    formData.append('remark', this.procecutionForm.value['remark']);
    formData.append('reciptNo', this.procecutionForm.value['reciptNo']);
    if (this.procecutionForm.value['dispatchNum']) {
      formData.append('dispatchNum', this.procecutionForm.value['dispatchNum']);
    }
    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.procecutionForm.value['id'])
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
            this.localStorage.setStoredValue('procecutionValue', data.id);
            this.localStorage.setStoredValue(
              'procecutionUrl',
              '/official/procecution'
            );
            this.router.navigate(['/official/procecutionDetails/edit']);
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
            this.localStorage.setStoredValue('procecutionValue', data.id);
            this.localStorage.setStoredValue(
              'procecutionUrl',
              '/official/procecution'
            );
            this.router.navigate(['/official/procecutionDetails/add']);
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.procecutionForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.procecutionForm.controls[controlName];
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
    this.procecutionForm.patchValue({
      reciptNo: receipt[0],
      serialNoDate: value.toUpperCase(),
    });
  };

  getSelectedType = (value) => {
    var type = value.options[value.selectedIndex].text;
    if (type == 'Sent to court' || type == 'कोर्ट को भेजा') {
      this.isDispatchPresent = true;
    }
  };

  focusOut = (event, name) => {
    this.procecutionForm.patchValue({
      [name]: event.target.value,
    });
  };
}
