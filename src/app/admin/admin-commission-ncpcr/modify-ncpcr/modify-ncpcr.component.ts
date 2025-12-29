import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  selector: 'app-modify-ncpcr',
  templateUrl: './modify-ncpcr.component.html',
  styleUrls: ['./modify-ncpcr.component.scss']
})
export class ModifyNcpcrComponent implements OnInit, OnDestroy {
  subscription: any;
  ncpcr: any;
  loading = false;
  ncpcrForm: UntypedFormGroup;

  ADD_NCPCR: boolean;
  EDIT_NCPCR: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];


  NCPCR_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'NCPCR',
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
    this.ncpcr = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.ncpcr) {
      this.NCPCR_PARAMS.ID = this.ncpcr.id;
      this.NCPCR_PARAMS.SLNODATE = this.ncpcr.serialnoDate;
      this.NCPCR_PARAMS.TYPE = this.ncpcr.type;
      this.NCPCR_PARAMS.DATE = this.ncpcr.date;
      this.NCPCR_PARAMS.WHOMETORECEIVE = this.ncpcr.whomToReceive;
      this.NCPCR_PARAMS.LETTERNO = this.ncpcr.letterNo;
      this.NCPCR_PARAMS.SUBJECT = this.ncpcr.subject;
      this.NCPCR_PARAMS.APPLICANTNAME = this.ncpcr.applicantName;
      this.NCPCR_PARAMS.APPLICATIONSTATUS = this.ncpcr.applicationStatus;
      this.NCPCR_PARAMS.DEADLINEDATE = this.ncpcr.deadlineDate;
      this.NCPCR_PARAMS.OFFICERNAME = this.ncpcr.officerName;
      this.NCPCR_PARAMS.COMMISSIONORDER = this.ncpcr.commisionOrder;
      this.NCPCR_PARAMS.ASSIGNEDFOR = this.ncpcr.assigndFor;
      this.NCPCR_PARAMS.ASSIGNEDFORNAME = this.ncpcr.assigndForName;
    }

    this.ADD_NCPCR = this.global.checkForUserButtonPermission(
      AppConstants.NCPCR_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NCPCR = this.global.checkForUserButtonPermission(
      AppConstants.NCPCR_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.NCPCR_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.NCPCR_MODULE.EDIT_SUBMIT_URL;
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
    this.ncpcrForm = this.fb.group({
      id: this.NCPCR_PARAMS.ID,
      serialnoDate: [
        this.NCPCR_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.NCPCR_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.NCPCR_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.NCPCR_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.NCPCR_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.NCPCR_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.NCPCR_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.NCPCR_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.NCPCR_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.NCPCR_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.NCPCR_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.NCPCR_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.ncpcrForm.controls;
    if (this.ncpcrForm.invalid && !this.ncpcrForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.ncpcr) formData.append('id', this.ncpcrForm.value['id']);
    formData.append('serialnoDate', this.ncpcrForm.value['serialnoDate']);
    formData.append('type', this.ncpcrForm.value['type']);
    formData.append('date', this.ncpcrForm.value['date']);
    formData.append('whomToReceive', this.ncpcrForm.value['whomToReceive']);
    formData.append('letterNo', this.ncpcrForm.value['letterNo']);
    formData.append('subject', this.ncpcrForm.value['subject']);
    formData.append('applicantName', this.ncpcrForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.ncpcrForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.ncpcrForm.value['deadlineDate']);
    formData.append('officerName', this.ncpcrForm.value['officerName']);
    formData.append('commisionOrder', this.ncpcrForm.value['commisionOrder']);
    formData.append('assigndFor', this.ncpcrForm.value['assigndFor']);
    formData.append('assigndForName', this.ncpcrForm.value['assigndForName']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.ncpcrForm.value['id'])
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
    const control = this.ncpcrForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.ncpcrForm.controls[controlName];
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
    this.ncpcrForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.ncpcrForm.patchValue({
      [name]: event.target.value,
    });
  };

}
