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
  selector: 'app-modify-ecomm-receipt',
  templateUrl: './modify-ecomm-receipt.component.html',
  styleUrls: ['./modify-ecomm-receipt.component.scss'],
})
export class ModifyEcommReceiptComponent implements OnInit, OnDestroy {
  subscription: any;
  ecommunicationReceipt: any;
  loading = false;
  ecommunicationReceiptForm: UntypedFormGroup;

  officersList: [];
  max: Date = new Date();

  ADD_ECOM_RECEIPT: boolean;
  EDIT_ECOM_RECEIPT: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  stationList: any[];
  ECOMFILL2: File = null;

  ECOM_RECEIPT_PARAMS = {
    ID: null,
    ECOMMNODATE: null,
    RECEIPTNO: null,
    STATIONFROM: null,
    ECOMMSRNO: null,
    ECOMMDATE: null,
    ECOMMSUBJECT: null,
    ASSIGNEDFORNAME: null,
    ECOMMRECEIVEDNO: null,
    ECOMMQUERIESRECEIEVEDDATE: null,
    ECOMMRESOLVEDNO: null,
    ECOMMRESOLVEDDATE: null,
    ECOMMSUMMERY: null,
    ECOMMSTATUS: null,
    ECOMFILL2: null,
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
    this.ecommunicationReceipt = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.ecommunicationReceipt) {
      this.ECOM_RECEIPT_PARAMS.ID = this.ecommunicationReceipt.id;
      this.ECOM_RECEIPT_PARAMS.ECOMMNODATE =
        this.ecommunicationReceipt.ecommNoDate;
      this.ECOM_RECEIPT_PARAMS.RECEIPTNO = this.ecommunicationReceipt.reciptNo;
      this.ECOM_RECEIPT_PARAMS.STATIONFROM =
        this.ecommunicationReceipt.stationFrom;
      this.ECOM_RECEIPT_PARAMS.ECOMMSRNO = this.ecommunicationReceipt.ecommSrNo;
      this.ECOM_RECEIPT_PARAMS.ECOMMDATE = this.ecommunicationReceipt.ecommDate;
      this.ECOM_RECEIPT_PARAMS.ECOMMSUBJECT =
        this.ecommunicationReceipt.ecommSubject;
      this.ECOM_RECEIPT_PARAMS.ECOMMRECEIVEDNO =
        this.ecommunicationReceipt.ecommreceviedNo;
      this.ECOM_RECEIPT_PARAMS.ECOMMQUERIESRECEIEVEDDATE =
        this.ecommunicationReceipt.ecommQueriesReceivedDate;
      this.ECOM_RECEIPT_PARAMS.ECOMMRESOLVEDNO =
        this.ecommunicationReceipt.ecommresolveNo;
      this.ECOM_RECEIPT_PARAMS.ECOMMRESOLVEDDATE =
        this.ecommunicationReceipt.ecommResolvedDate;
      this.ECOM_RECEIPT_PARAMS.ECOMMSUMMERY =
        this.ecommunicationReceipt.ecommSummary;
      this.ECOM_RECEIPT_PARAMS.ECOMMSTATUS =
        this.ecommunicationReceipt.ecommStatus;
    }

    this.ADD_ECOM_RECEIPT = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_RECEIPT_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ECOM_RECEIPT = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_RECEIPT_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ECOM_RECEIPT_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ECOM_RECEIPT_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initsupremeCourtForm();
    this.initsupremeCourtForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initsupremeCourtForm = () => {
    this.ecommunicationReceiptForm = this.fb.group({
      id: this.ECOM_RECEIPT_PARAMS.ID,
      ecommNoDate: [
        this.ECOM_RECEIPT_PARAMS.ECOMMNODATE,
        Validators.compose([Validators.required]),
      ],
      reciptNo: [
        { value: this.ECOM_RECEIPT_PARAMS.RECEIPTNO, disabled: true },
        Validators.compose([Validators.required]),
      ],
      stationFrom: [
        this.ECOM_RECEIPT_PARAMS.STATIONFROM,
        Validators.compose([Validators.required]),
      ],
      ecommSrNo: [
        this.ECOM_RECEIPT_PARAMS.ECOMMSRNO,
        Validators.compose([Validators.required]),
      ],
      ecommDate: [
        this.ECOM_RECEIPT_PARAMS.ECOMMDATE,
        Validators.compose([Validators.required]),
      ],
      ecommSubject: [
        this.ECOM_RECEIPT_PARAMS.ECOMMSUBJECT,
        Validators.compose([Validators.required]),
      ],
      ecommreceviedNo: [this.ECOM_RECEIPT_PARAMS.ECOMMRECEIVEDNO],
      ecommQueriesReceivedDate: [
        this.ECOM_RECEIPT_PARAMS.ECOMMQUERIESRECEIEVEDDATE,
      ],
      ecommresolveNo: [this.ECOM_RECEIPT_PARAMS.ECOMMRESOLVEDNO],
      ecommResolvedDate: [this.ECOM_RECEIPT_PARAMS.ECOMMRESOLVEDDATE],
      ecommSummary: [this.ECOM_RECEIPT_PARAMS.ECOMMSUMMERY],
      ecommStatus: [
        this.ECOM_RECEIPT_PARAMS.ECOMMSTATUS,
        Validators.compose([Validators.required]),
      ],
      ecommFill2: [this.ECOM_RECEIPT_PARAMS.ECOMFILL2],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.ecommunicationReceiptForm.controls;
    if (
      this.ecommunicationReceiptForm.invalid &&
      !this.ecommunicationReceiptForm.valid
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

    if (this.ecommunicationReceipt)
      formData.append('id', this.ecommunicationReceiptForm.value['id']);
    formData.append(
      'ecommNoDate',
      this.ecommunicationReceiptForm.value['ecommNoDate']
    );

    if (this.ecommunicationReceiptForm.value['ecommNoDate']) {
      var recNo = this.ecommunicationReceiptForm.value['ecommNoDate'];
      var receipt = recNo.split(',');
      this.ecommunicationReceiptForm.patchValue({
        reciptNo: receipt[0],
      });
      formData.append('reciptNo', receipt);
    }
    // formData.append(
    //   'reciptNo',
    //   this.ecommunicationReceiptForm.value['reciptNo']
    // );
    formData.append(
      'stationFrom',
      this.ecommunicationReceiptForm.value['stationFrom']
    );
    formData.append(
      'ecommSrNo',
      this.ecommunicationReceiptForm.value['ecommSrNo']
    );
    formData.append(
      'ecommDate',
      this.ecommunicationReceiptForm.value['ecommDate']
    );
    formData.append(
      'ecommSubject',
      this.ecommunicationReceiptForm.value['ecommSubject']
    );
    formData.append(
      'ecommreceviedNo',
      this.ecommunicationReceiptForm.value['ecommreceviedNo']
    );
    formData.append(
      'ecommQueriesReceivedDate',
      this.ecommunicationReceiptForm.value['ecommQueriesReceivedDate']
    );
    formData.append(
      'ecommresolveNo',
      this.ecommunicationReceiptForm.value['ecommresolveNo']
    );
    formData.append(
      'ecommResolvedDate',
      this.ecommunicationReceiptForm.value['ecommResolvedDate']
    );
    formData.append(
      'ecommSummary',
      this.ecommunicationReceiptForm.value['ecommSummary']
    );
    formData.append(
      'ecommStatus',
      this.ecommunicationReceiptForm.value['ecommStatus']
    );
    if (this.ECOMFILL2) {
      formData.append('file', this.ECOMFILL2, this.ECOMFILL2.name);
    }

    if (this.ecommunicationReceiptForm.value['id'])
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
    const control = this.ecommunicationReceiptForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.ecommunicationReceiptForm.controls[controlName];
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
    this.ECOMFILL2 = file.item(0);
  };

  setDataRecipt = (value: string) => {
    var receipt = value.split(',');
    this.ecommunicationReceiptForm.patchValue({
      reciptNo: receipt[0].toUpperCase(),
      ecommNoDate: value.toUpperCase(),
    });
  };

  focusOut = (event, name) => {
    this.ecommunicationReceiptForm.patchValue({
      [name]: event.target.value,
    });
  };
}
