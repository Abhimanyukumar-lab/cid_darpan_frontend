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
  selector: 'app-modify-nscst',
  templateUrl: './modify-nscst.component.html',
  styleUrls: ['./modify-nscst.component.scss'],
})
export class ModifyNscstComponent implements OnInit, OnDestroy {
  subscription: any;
  nscst: any;
  loading = false;
  nscstForm: UntypedFormGroup;

  ADD_NSCST: boolean;
  EDIT_NSCST: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];

  NSCST_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'NSCST',
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
    this.nscst = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.nscst) {
      this.NSCST_PARAMS.ID = this.nscst.id;
      this.NSCST_PARAMS.SLNODATE = this.nscst.serialnoDate;
      this.NSCST_PARAMS.TYPE = this.nscst.type;
      this.NSCST_PARAMS.DATE = this.nscst.date;
      this.NSCST_PARAMS.WHOMETORECEIVE = this.nscst.whomToReceive;
      this.NSCST_PARAMS.LETTERNO = this.nscst.letterNo;
      this.NSCST_PARAMS.SUBJECT = this.nscst.subject;
      this.NSCST_PARAMS.APPLICANTNAME = this.nscst.applicantName;
      this.NSCST_PARAMS.APPLICATIONSTATUS = this.nscst.applicationStatus;
      this.NSCST_PARAMS.DEADLINEDATE = this.nscst.deadlineDate;
      this.NSCST_PARAMS.OFFICERNAME = this.nscst.officerName;
      this.NSCST_PARAMS.COMMISSIONORDER = this.nscst.commisionOrder;
      this.NSCST_PARAMS.ASSIGNEDFOR = this.nscst.assigndFor;
      this.NSCST_PARAMS.ASSIGNEDFORNAME = this.nscst.assigndForName;
    }

    this.ADD_NSCST = this.global.checkForUserButtonPermission(
      AppConstants.NSCST_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NSCST = this.global.checkForUserButtonPermission(
      AppConstants.NSCST_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.NSCST_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.NSCST_MODULE.EDIT_SUBMIT_URL;
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
    this.nscstForm = this.fb.group({
      id: this.NSCST_PARAMS.ID,
      serialnoDate: [
        this.NSCST_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.NSCST_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.NSCST_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.NSCST_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.NSCST_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.NSCST_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.NSCST_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.NSCST_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.NSCST_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.NSCST_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.NSCST_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.NSCST_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.nscstForm.controls;
    if (this.nscstForm.invalid && !this.nscstForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.nscst) formData.append('id', this.nscstForm.value['id']);
    formData.append('serialnoDate', this.nscstForm.value['serialnoDate']);
    formData.append('type', this.nscstForm.value['type']);
    formData.append('date', this.nscstForm.value['date']);
    formData.append('whomToReceive', this.nscstForm.value['whomToReceive']);
    formData.append('letterNo', this.nscstForm.value['letterNo']);
    formData.append('subject', this.nscstForm.value['subject']);
    formData.append('applicantName', this.nscstForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.nscstForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.nscstForm.value['deadlineDate']);
    formData.append('officerName', this.nscstForm.value['officerName']);
    formData.append('commisionOrder', this.nscstForm.value['commisionOrder']);
    formData.append('assigndFor', this.nscstForm.value['assigndFor']);
    formData.append('assigndForName', this.nscstForm.value['assigndForName']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.nscstForm.value['id'])
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
    const control = this.nscstForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.nscstForm.controls[controlName];
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
    this.nscstForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.nscstForm.patchValue({
      [name]: event.target.value,
    });
  };

}
