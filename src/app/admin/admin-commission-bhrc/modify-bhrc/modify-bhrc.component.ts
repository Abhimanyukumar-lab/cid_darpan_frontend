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
  selector: 'app-modify-bhrc',
  templateUrl: './modify-bhrc.component.html',
  styleUrls: ['./modify-bhrc.component.scss'],
})
export class ModifyBhrcComponent implements OnInit, OnDestroy {
  subscription: any;

  bhrc: any;
  loading = false;
  bhrcForm: UntypedFormGroup;

  ADD_BHRC: boolean;
  EDIT_BHRC: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];

  BHRC_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'BHRC',
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
    this.bhrc = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.bhrc) {
      this.BHRC_PARAMS.ID = this.bhrc.id;
      this.BHRC_PARAMS.SLNODATE = this.bhrc.serialnoDate;
      this.BHRC_PARAMS.TYPE = this.bhrc.type;
      this.BHRC_PARAMS.DATE = this.bhrc.date;
      this.BHRC_PARAMS.WHOMETORECEIVE = this.bhrc.whomToReceive;
      this.BHRC_PARAMS.LETTERNO = this.bhrc.letterNo;
      this.BHRC_PARAMS.SUBJECT = this.bhrc.subject;
      this.BHRC_PARAMS.APPLICANTNAME = this.bhrc.applicantName;
      this.BHRC_PARAMS.APPLICATIONSTATUS = this.bhrc.applicationStatus;
      this.BHRC_PARAMS.DEADLINEDATE = this.bhrc.deadlineDate;
      this.BHRC_PARAMS.OFFICERNAME = this.bhrc.officerName;
      this.BHRC_PARAMS.COMMISSIONORDER = this.bhrc.commisionOrder;
      this.BHRC_PARAMS.ASSIGNEDFOR = this.bhrc.assigndFor;
      this.BHRC_PARAMS.ASSIGNEDFORNAME = this.bhrc.assigndForName;
    }

    this.ADD_BHRC = this.global.checkForUserButtonPermission(
      AppConstants.BHRC_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_BHRC = this.global.checkForUserButtonPermission(
      AppConstants.BHRC_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.BHRC_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.BHRC_MODULE.EDIT_SUBMIT_URL;
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
    this.bhrcForm = this.fb.group({
      id: this.BHRC_PARAMS.ID,
      serialnoDate: [
        this.BHRC_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.BHRC_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.BHRC_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.BHRC_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.BHRC_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.BHRC_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.BHRC_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.BHRC_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.BHRC_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.BHRC_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.BHRC_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.BHRC_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.bhrcForm.controls;
    if (this.bhrcForm.invalid && !this.bhrcForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.bhrc) formData.append('id', this.bhrcForm.value['id']);
    formData.append('serialnoDate', this.bhrcForm.value['serialnoDate']);
    formData.append('type', this.bhrcForm.value['type']);
    formData.append('date', this.bhrcForm.value['date']);
    formData.append('whomToReceive', this.bhrcForm.value['whomToReceive']);
    formData.append('letterNo', this.bhrcForm.value['letterNo']);
    formData.append('subject', this.bhrcForm.value['subject']);
    formData.append('applicantName', this.bhrcForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.bhrcForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.bhrcForm.value['deadlineDate']);
    formData.append('officerName', this.bhrcForm.value['officerName']);
    formData.append('commisionOrder', this.bhrcForm.value['commisionOrder']);
    formData.append('assigndFor', this.bhrcForm.value['assigndFor']);
    formData.append('assigndForName', this.bhrcForm.value['assigndForName']);
    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.bhrcForm.value['id'])
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
    const control = this.bhrcForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.bhrcForm.controls[controlName];
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
    this.bhrcForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.bhrcForm.patchValue({
      [name]: event.target.value,
    });
  };
}
