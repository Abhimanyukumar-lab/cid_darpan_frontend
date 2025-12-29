import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-modify-shrc',
  templateUrl: './modify-shrc.component.html',
  styleUrls: ['./modify-shrc.component.scss'],
})
export class ModifyShrcComponent implements OnInit, OnDestroy {
  subscription: any;
  shrc: any;
  loading = false;
  shrcForm: UntypedFormGroup;

  ADD_NHRC: boolean;
  EDIT_NHRC: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];

  SHRC_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'SHRC',
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
    this.shrc = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.shrc) {
      this.SHRC_PARAMS.ID = this.shrc.id;
      this.SHRC_PARAMS.SLNODATE = this.shrc.serialnoDate;
      this.SHRC_PARAMS.TYPE = this.shrc.type;
      this.SHRC_PARAMS.DATE = this.shrc.date;
      this.SHRC_PARAMS.WHOMETORECEIVE = this.shrc.whomToReceive;
      this.SHRC_PARAMS.LETTERNO = this.shrc.letterNo;
      this.SHRC_PARAMS.SUBJECT = this.shrc.subject;
      this.SHRC_PARAMS.APPLICANTNAME = this.shrc.applicantName;
      this.SHRC_PARAMS.APPLICATIONSTATUS = this.shrc.applicationStatus;
      this.SHRC_PARAMS.DEADLINEDATE = this.shrc.deadlineDate;
      this.SHRC_PARAMS.OFFICERNAME = this.shrc.officerName;
      this.SHRC_PARAMS.COMMISSIONORDER = this.shrc.commisionOrder;
      this.SHRC_PARAMS.ASSIGNEDFOR = this.shrc.assigndFor;
      this.SHRC_PARAMS.ASSIGNEDFORNAME = this.shrc.assigndForName;
    }

    this.ADD_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.SHRC_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.SHRC_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SHRC_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SHRC_MODULE.EDIT_SUBMIT_URL;
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
    this.shrcForm = this.fb.group({
      id: this.SHRC_PARAMS.ID,
      serialnoDate: [
        this.SHRC_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.SHRC_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.SHRC_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.SHRC_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.SHRC_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.SHRC_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.SHRC_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.SHRC_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.SHRC_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.SHRC_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.SHRC_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.SHRC_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.shrcForm.controls;
    if (this.shrcForm.invalid && !this.shrcForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.shrc) formData.append('id', this.shrcForm.value['id']);
    formData.append('serialnoDate', this.shrcForm.value['serialnoDate']);
    formData.append('type', this.shrcForm.value['type']);
    formData.append('date', this.shrcForm.value['date']);
    formData.append('whomToReceive', this.shrcForm.value['whomToReceive']);
    formData.append('letterNo', this.shrcForm.value['letterNo']);
    formData.append('subject', this.shrcForm.value['subject']);
    formData.append('applicantName', this.shrcForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.shrcForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.shrcForm.value['deadlineDate']);
    formData.append('officerName', this.shrcForm.value['officerName']);
    formData.append('commisionOrder', this.shrcForm.value['commisionOrder']);
    formData.append('assigndFor', this.shrcForm.value['assigndFor']);
    formData.append('assigndForName', this.shrcForm.value['assigndForName']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.shrcForm.value['id'])
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
    const control = this.shrcForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.shrcForm.controls[controlName];
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
    this.shrcForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.shrcForm.patchValue({
      [name]: event.target.value,
    });
  };

}
