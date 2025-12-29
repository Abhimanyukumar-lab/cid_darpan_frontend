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
  selector: 'app-modify-nhrc',
  templateUrl: './modify-nhrc.component.html',
  styleUrls: ['./modify-nhrc.component.scss'],
})
export class ModifyNHRCComponent implements OnInit, OnDestroy {
  nhrc: any;
  subscription: any;
  loading = false;
  nhrcForm: UntypedFormGroup;

  ADD_NHRC: boolean;
  EDIT_NHRC: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];

  NHRC_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'NHRC',
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
    this.nhrc = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.nhrc) {
      this.NHRC_PARAMS.ID = this.nhrc.id;
      this.NHRC_PARAMS.SLNODATE = this.nhrc.serialnoDate;
      this.NHRC_PARAMS.TYPE = this.nhrc.type;
      this.NHRC_PARAMS.DATE = this.nhrc.date;
      this.NHRC_PARAMS.WHOMETORECEIVE = this.nhrc.whomToReceive;
      this.NHRC_PARAMS.LETTERNO = this.nhrc.letterNo;
      this.NHRC_PARAMS.SUBJECT = this.nhrc.subject;
      this.NHRC_PARAMS.APPLICANTNAME = this.nhrc.applicantName;
      this.NHRC_PARAMS.APPLICATIONSTATUS = this.nhrc.applicationStatus;
      this.NHRC_PARAMS.DEADLINEDATE = this.nhrc.deadlineDate;
      this.NHRC_PARAMS.OFFICERNAME = this.nhrc.officerName;
      this.NHRC_PARAMS.COMMISSIONORDER = this.nhrc.commisionOrder;
      this.NHRC_PARAMS.ASSIGNEDFOR = this.nhrc.assigndFor;
      this.NHRC_PARAMS.ASSIGNEDFORNAME = this.nhrc.assigndForName;
    }

    this.ADD_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.NHRC_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.NHRC_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.NHRC_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.NHRC_MODULE.EDIT_SUBMIT_URL;
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
    this.nhrcForm = this.fb.group({
      id: this.NHRC_PARAMS.ID,
      serialnoDate: [
        this.NHRC_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.NHRC_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.NHRC_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.NHRC_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.NHRC_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.NHRC_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.NHRC_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.NHRC_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.NHRC_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.NHRC_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.NHRC_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.NHRC_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.nhrcForm.controls;
    if (this.nhrcForm.invalid && !this.nhrcForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.nhrc) formData.append('id', this.nhrcForm.value['id']);
    formData.append('serialnoDate', this.nhrcForm.value['serialnoDate']);
    formData.append('type', this.nhrcForm.value['type']);
    formData.append('date', this.nhrcForm.value['date']);
    formData.append('whomToReceive', this.nhrcForm.value['whomToReceive']);
    formData.append('letterNo', this.nhrcForm.value['letterNo']);
    formData.append('subject', this.nhrcForm.value['subject']);
    formData.append('applicantName', this.nhrcForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.nhrcForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.nhrcForm.value['deadlineDate']);
    formData.append('officerName', this.nhrcForm.value['officerName']);
    formData.append('commisionOrder', this.nhrcForm.value['commisionOrder']);
    formData.append('assigndFor', this.nhrcForm.value['assigndFor']);
    formData.append('assigndForName', this.nhrcForm.value['assigndForName']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.nhrcForm.value['id'])
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
    const control = this.nhrcForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.nhrcForm.controls[controlName];
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
    this.nhrcForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.nhrcForm.patchValue({
      [name]: event.target.value,
    });
  };

}
