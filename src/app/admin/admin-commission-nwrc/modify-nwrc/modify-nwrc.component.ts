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
  selector: 'app-modify-nwrc',
  templateUrl: './modify-nwrc.component.html',
  styleUrls: ['./modify-nwrc.component.scss'],
})
export class ModifyNwrcComponent implements OnInit, OnDestroy {
  subscription: any;
  nwrc: any;
  loading = false;
  nwrcForm: UntypedFormGroup;

  ADD_NHRC: boolean;
  EDIT_NHRC: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];

  NWRC_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'NWRC',
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
    this.nwrc = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.nwrc) {
      this.NWRC_PARAMS.ID = this.nwrc.id;
      this.NWRC_PARAMS.SLNODATE = this.nwrc.serialnoDate;
      this.NWRC_PARAMS.TYPE = this.nwrc.type;
      this.NWRC_PARAMS.DATE = this.nwrc.date;
      this.NWRC_PARAMS.WHOMETORECEIVE = this.nwrc.whomToReceive;
      this.NWRC_PARAMS.LETTERNO = this.nwrc.letterNo;
      this.NWRC_PARAMS.SUBJECT = this.nwrc.subject;
      this.NWRC_PARAMS.APPLICANTNAME = this.nwrc.applicantName;
      this.NWRC_PARAMS.APPLICATIONSTATUS = this.nwrc.applicationStatus;
      this.NWRC_PARAMS.DEADLINEDATE = this.nwrc.deadlineDate;
      this.NWRC_PARAMS.OFFICERNAME = this.nwrc.officerName;
      this.NWRC_PARAMS.COMMISSIONORDER = this.nwrc.commisionOrder;
      this.NWRC_PARAMS.ASSIGNEDFOR = this.nwrc.assigndFor;
      this.NWRC_PARAMS.ASSIGNEDFORNAME = this.nwrc.assigndForName;
    }

    this.ADD_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.NWRC_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.NWRC_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.NWRC_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.NWRC_MODULE.EDIT_SUBMIT_URL;
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
    this.nwrcForm = this.fb.group({
      id: this.NWRC_PARAMS.ID,
      serialnoDate: [
        this.NWRC_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.NWRC_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.NWRC_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.NWRC_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.NWRC_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.NWRC_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.NWRC_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.NWRC_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.NWRC_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.NWRC_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.NWRC_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.NWRC_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.nwrcForm.controls;
    if (this.nwrcForm.invalid && !this.nwrcForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.nwrc) formData.append('id', this.nwrcForm.value['id']);
    formData.append('serialnoDate', this.nwrcForm.value['serialnoDate']);
    formData.append('type', this.nwrcForm.value['type']);
    formData.append('date', this.nwrcForm.value['date']);
    formData.append('whomToReceive', this.nwrcForm.value['whomToReceive']);
    formData.append('letterNo', this.nwrcForm.value['letterNo']);
    formData.append('subject', this.nwrcForm.value['subject']);
    formData.append('applicantName', this.nwrcForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.nwrcForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.nwrcForm.value['deadlineDate']);
    formData.append('officerName', this.nwrcForm.value['officerName']);
    formData.append('commisionOrder', this.nwrcForm.value['commisionOrder']);
    formData.append('assigndFor', this.nwrcForm.value['assigndFor']);
    formData.append('assigndForName', this.nwrcForm.value['assigndForName']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.nwrcForm.value['id'])
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
    const control = this.nwrcForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.nwrcForm.controls[controlName];
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
    this.nwrcForm.patchValue({
      assigndFor: item.id,
    });
  }


  focusOut = (event, name) => {
    this.nwrcForm.patchValue({
      [name]: event.target.value,
    });
  };
}
