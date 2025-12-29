import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-modify-court-lower',
  templateUrl: './modify-court-lower.component.html',
  styleUrls: ['./modify-court-lower.component.scss'],
})
export class ModifyCourtLowerComponent implements OnInit, OnDestroy {
  subscription: any;
  lowerCourt: any;
  loading = false;
  lowerCourtForm: UntypedFormGroup;

  officersList: [];
  max: Date = new Date();

  ADD_LOWER_COURT: boolean;
  EDIT_LOWER_COURT: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  districtList: any[];
  stationList: any[];
  DOCUMENT: File = null;

  LOWER_COURT_PARAMS = {
    ID: null,
    STATION_ID: null,
    STATION_NAME: null,
    SLNODATE: null,
    COURTTYPE: 'LOWER',
    CWJCNO: null,
    FROMWHOME: null,
    NOOFLETTER: null,
    LETTERDATE: null,
    ORDER: null,
    SUBJECT: null,
    APPLICANTNAME: null,
    APPLIEDDATE: null,
    ADVOACTENAME: null,
    ADVOCATEMOBILE: null,
    COUNTERFILLLASTDATE: null,
    OFFICERNAME: null,
    SENDINGDATE: null,
    COUNTERDATE: null,
    ORDERDATE: null,
    COMPLAINCSTATUS: null,
    DOCUMENT: null,
    RECEIPTNO: null,
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
    this.lowerCourt = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.lowerCourt) {
      this.LOWER_COURT_PARAMS.ID = this.lowerCourt.id;
      this.LOWER_COURT_PARAMS.STATION_ID = this.lowerCourt.stationId;
      this.LOWER_COURT_PARAMS.STATION_NAME = this.lowerCourt.stationName;
      this.LOWER_COURT_PARAMS.SLNODATE = this.lowerCourt.slnoDate;
      this.LOWER_COURT_PARAMS.COURTTYPE = this.lowerCourt.courtType;
      this.LOWER_COURT_PARAMS.CWJCNO = this.lowerCourt.cwjcNO;
      this.LOWER_COURT_PARAMS.FROMWHOME = this.lowerCourt.fromWhom;
      this.LOWER_COURT_PARAMS.NOOFLETTER = this.lowerCourt.noofLetter;
      this.LOWER_COURT_PARAMS.LETTERDATE = this.lowerCourt.letterDate;
      this.LOWER_COURT_PARAMS.ORDER = this.lowerCourt.order;
      this.LOWER_COURT_PARAMS.SUBJECT = this.lowerCourt.subject;
      this.LOWER_COURT_PARAMS.APPLICANTNAME = this.lowerCourt.applicantName;
      this.LOWER_COURT_PARAMS.APPLIEDDATE = this.lowerCourt.appliedDate;
      this.LOWER_COURT_PARAMS.ADVOACTENAME = this.lowerCourt.govtAdvocate;
      this.LOWER_COURT_PARAMS.ADVOCATEMOBILE = this.lowerCourt.govtAdvocateMobile;
      this.LOWER_COURT_PARAMS.COUNTERFILLLASTDATE = this.lowerCourt.counterFillingLastdate;
      this.LOWER_COURT_PARAMS.OFFICERNAME = this.lowerCourt.officerName;
      this.LOWER_COURT_PARAMS.SENDINGDATE = this.lowerCourt.sendingDate;
      this.LOWER_COURT_PARAMS.COUNTERDATE = this.lowerCourt.counterDate;
      this.LOWER_COURT_PARAMS.ORDERDATE = this.lowerCourt.orderDate;
      this.LOWER_COURT_PARAMS.COMPLAINCSTATUS = this.lowerCourt.complianceStatus;
      this.LOWER_COURT_PARAMS.RECEIPTNO = this.lowerCourt.reciptNo;
    }

    this.ADD_LOWER_COURT = this.global.checkForUserButtonPermission(
      AppConstants.LOWER_COURT_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_LOWER_COURT = this.global.checkForUserButtonPermission(
      AppConstants.LOWER_COURT_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.LOWER_COURT_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.LOWER_COURT_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initlowerCourtForm();

    this.apiService
      .apiGetCall(AppConstants.LOWER_COURT_MODULE.USER_FOFFICER_LIST, true)
      .subscribe((data) => {
        this.officersList = data.list;
      });
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initlowerCourtForm = () => {
    this.lowerCourtForm = this.fb.group({
      id: this.LOWER_COURT_PARAMS.ID,
      stationId: [
        this.LOWER_COURT_PARAMS.STATION_ID,
        Validators.compose([Validators.required]),
      ],
      slnoDate: [
        this.LOWER_COURT_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      courtType: [this.LOWER_COURT_PARAMS.COURTTYPE],
      reciptNo: [
        this.LOWER_COURT_PARAMS.RECEIPTNO,
        Validators.compose([Validators.required]),
      ],
      cwjcNO: [
        this.LOWER_COURT_PARAMS.CWJCNO,
        Validators.compose([Validators.required]),
      ],
      fromWhom: [
        this.LOWER_COURT_PARAMS.FROMWHOME,
        Validators.compose([Validators.required]),
      ],
      noofLetter: [
        this.LOWER_COURT_PARAMS.NOOFLETTER,
        Validators.compose([Validators.required]),
      ],
      letterDate: [
        this.LOWER_COURT_PARAMS.LETTERDATE,
        Validators.compose([Validators.required]),
      ],
      order: [
        this.LOWER_COURT_PARAMS.ORDER,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.LOWER_COURT_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.LOWER_COURT_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      appliedDate: [
        this.LOWER_COURT_PARAMS.APPLIEDDATE,
        Validators.compose([Validators.required]),
      ],
      govtAdvocate: [
        this.LOWER_COURT_PARAMS.ADVOACTENAME,
        Validators.compose([Validators.required]),
      ],
      govtAdvocateMobile: [
        this.LOWER_COURT_PARAMS.ADVOCATEMOBILE,
        Validators.compose([Validators.required]),
      ],
      counterFillingLastdate: [
        this.LOWER_COURT_PARAMS.COUNTERFILLLASTDATE,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.LOWER_COURT_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
      sendingDate: [
        this.LOWER_COURT_PARAMS.SENDINGDATE,
        Validators.compose([Validators.required]),
      ],
      counterDate: [
        this.LOWER_COURT_PARAMS.COUNTERDATE,
        Validators.compose([Validators.required]),
      ],
      orderDate: [
        this.LOWER_COURT_PARAMS.ORDERDATE,
        Validators.compose([Validators.required]),
      ],
      complianceStatus: [
        this.LOWER_COURT_PARAMS.COMPLAINCSTATUS,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.lowerCourtForm.controls;
    if (this.lowerCourtForm.invalid && !this.lowerCourtForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.lowerCourt) formData.append('id', this.lowerCourtForm.value['id']);
    formData.append('stationId', this.lowerCourtForm.value['stationId']);
    formData.append('stationName', this.lowerCourtForm.value['stationName']);
    formData.append('slnoDate', this.lowerCourtForm.value['slnoDate']);
    formData.append('reciptNo', this.lowerCourtForm.value['reciptNo']);
    formData.append('courtType', this.lowerCourtForm.value['courtType']);
    formData.append('cwjcNO', this.lowerCourtForm.value['cwjcNO']);
    formData.append('fromWhom', this.lowerCourtForm.value['fromWhom']);
    formData.append('noofLetter', this.lowerCourtForm.value['noofLetter']);
    formData.append('letterDate', this.lowerCourtForm.value['letterDate']);
    formData.append('order', this.lowerCourtForm.value['order']);
    formData.append('subject', this.lowerCourtForm.value['subject']);
    formData.append(
      'applicantName',
      this.lowerCourtForm.value['applicantName']
    );
    formData.append('appliedDate', this.lowerCourtForm.value['appliedDate']);
    formData.append('govtAdvocate', this.lowerCourtForm.value['govtAdvocate']);
    formData.append(
      'govtAdvocateMobile',
      this.lowerCourtForm.value['govtAdvocateMobile']
    );
    formData.append(
      'counterFillingLastdate',
      this.lowerCourtForm.value['counterFillingLastdate']
    );
    formData.append('officerName', this.lowerCourtForm.value['officerName']);
    formData.append('sendingDate', this.lowerCourtForm.value['sendingDate']);
    formData.append('counterDate', this.lowerCourtForm.value['counterDate']);
    formData.append('orderDate', this.lowerCourtForm.value['orderDate']);
    formData.append(
      'complianceStatus',
      this.lowerCourtForm.value['complianceStatus']
    );
    if (this.DOCUMENT) {
      formData.append('invoiceSource', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.lowerCourtForm.value['id'])
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
            this.localStorage.setStoredValue('courtValue', data.id);
            this.localStorage.setStoredValue(
              'courtUrl',
              '/official/lowerCourt'
            );
            this.router.navigate(['/official/courtDetails/edit']);
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
            this.localStorage.setStoredValue('courtValue', data.id);
            this.localStorage.setStoredValue(
              'courtUrl',
              '/official/lowerCourt'
            );
            this.router.navigate(['/official/courtDetails/add']);
          },
          (error) => {
            this.loading = false;
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.lowerCourtForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.lowerCourtForm.controls[controlName];
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

  handleItemImageChange = (file: FileList) => {
    this.DOCUMENT = file.item(0);
  };

  setDataRecipt = (value: string) => {
    var receipt = value.split(',');
    this.lowerCourtForm.patchValue({
      reciptNo: receipt[0],
    });
  };

  focusOut = (event, name) => {
    this.lowerCourtForm.patchValue({
      [name]: event.target.value,
    });
  };

}
