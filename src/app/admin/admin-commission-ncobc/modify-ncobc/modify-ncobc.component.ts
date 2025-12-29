import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderShow,
  AppLoadderHide,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-modify-ncobc',
  templateUrl: './modify-ncobc.component.html',
  styleUrls: ['./modify-ncobc.component.scss'],
})
export class ModifyNcobcComponent implements OnInit {
  subscription: any;
  ncobc: any;
  loading = false;
  ncobcForm: UntypedFormGroup;

  ADD_NHRC: boolean;
  EDIT_NHRC: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];


  NCOBC_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'NCOBC',
    DATE: null,
    WHOMETORECEIVE: null,
    ASSIGNEDFOR: null,
    ASSIGNEDFORNAME: null,
    LETTERNO: null,
    SUBJECT: null,
    APPLICANTNAME: null,
    APPLICATIONSTATUS: null,
    DEADLINEDATE: null,
    OFFICERNAME: null,
    COMMISSIONORDER: null,
    DOCUMENT: null,
  };

  
  officersList: [];
  selectedOfficerId: string[] = [];
  selectedItems = [];
  dropdownOfficerSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    unSelectAllText: 'UnSelect',
    itemsShowLimit: 1,
    allowSearchFilter: true,
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
    this.ncobc = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.ncobc) {
      this.NCOBC_PARAMS.ID = this.ncobc.id;
      this.NCOBC_PARAMS.SLNODATE = this.ncobc.serialnoDate;
      this.NCOBC_PARAMS.TYPE = this.ncobc.type;
      this.NCOBC_PARAMS.DATE = this.ncobc.date;
      this.NCOBC_PARAMS.WHOMETORECEIVE = this.ncobc.whomToReceive;
      this.NCOBC_PARAMS.LETTERNO = this.ncobc.letterNo;
      this.NCOBC_PARAMS.SUBJECT = this.ncobc.subject;
      this.NCOBC_PARAMS.APPLICANTNAME = this.ncobc.applicantName;
      this.NCOBC_PARAMS.APPLICATIONSTATUS = this.ncobc.applicationStatus;
      this.NCOBC_PARAMS.DEADLINEDATE = this.ncobc.deadlineDate;
      this.NCOBC_PARAMS.OFFICERNAME = this.ncobc.officerName;
      this.NCOBC_PARAMS.COMMISSIONORDER = this.ncobc.commisionOrder;
      this.NCOBC_PARAMS.ASSIGNEDFOR = this.ncobc.assigndFor;
      this.NCOBC_PARAMS.ASSIGNEDFORNAME = this.ncobc.assigndForName;
    }

    this.ADD_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.NCOBC_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.NCOBC_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.NCOBC_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.NCOBC_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initCitizenReportForm();
    this.getOfficerList();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initCitizenReportForm = () => {
    this.ncobcForm = this.fb.group({
      id: this.NCOBC_PARAMS.ID,
      serialnoDate: [
        this.NCOBC_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.NCOBC_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.NCOBC_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.NCOBC_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.NCOBC_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.NCOBC_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.NCOBC_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.NCOBC_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.NCOBC_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.NCOBC_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.NCOBC_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.NCOBC_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.ncobcForm.controls;
    if (this.ncobcForm.invalid && !this.ncobcForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.ncobc) formData.append('id', this.ncobcForm.value['id']);
    formData.append('serialnoDate', this.ncobcForm.value['serialnoDate']);
    formData.append('type', this.ncobcForm.value['type']);
    formData.append('date', this.ncobcForm.value['date']);
    formData.append('whomToReceive', this.ncobcForm.value['whomToReceive']);
    formData.append('letterNo', this.ncobcForm.value['letterNo']);
    formData.append('subject', this.ncobcForm.value['subject']);
    formData.append('applicantName', this.ncobcForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.ncobcForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.ncobcForm.value['deadlineDate']);
    formData.append('officerName', this.ncobcForm.value['officerName']);
    formData.append('commisionOrder', this.ncobcForm.value['commisionOrder']);
    formData.append('assigndFor', this.ncobcForm.value['assigndFor']);
    formData.append('assigndForName', this.ncobcForm.value['assigndForName']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.ncobcForm.value['id'])
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
    const control = this.ncobcForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.ncobcForm.controls[controlName];
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

  handleInvoiceChange = (file: FileList) => {
    this.DOCUMENT = file.item(0);
  };


  getOfficerList = (): any => {
    this.apiService
      .apiPostCall(
        AppConstants.NHRC_MODULE.COMM_FORMWARD_LIST,
        {},
        true
      )
      .subscribe((data) => {
        this.officersList = data.list;
      });
  };

  onItemSelect(item: any) {
    this.selectedOfficerId.push(item.id + '');
    this.ncobcForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.ncobcForm.patchValue({
      [name]: event.target.value,
    });
  };

}
