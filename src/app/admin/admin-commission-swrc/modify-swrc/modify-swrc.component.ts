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
  selector: 'app-modify-swrc',
  templateUrl: './modify-swrc.component.html',
  styleUrls: ['./modify-swrc.component.scss'],
})
export class ModifySwrcComponent implements OnInit, OnDestroy {
  subscription: any;
  swrc: any;
  loading = false;
  swrcForm: UntypedFormGroup;

  ADD_NHRC: boolean;
  EDIT_NHRC: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  DOCUMENT: File = null;
  stationList: any[];

  SWRC_PARAMS = {
    ID: null,
    SLNODATE: null,
    TYPE: 'SWRC',
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
    this.swrc = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.swrc) {
      this.SWRC_PARAMS.ID = this.swrc.id;
      this.SWRC_PARAMS.SLNODATE = this.swrc.serialnoDate;
      this.SWRC_PARAMS.TYPE = this.swrc.type;
      this.SWRC_PARAMS.DATE = this.swrc.date;
      this.SWRC_PARAMS.WHOMETORECEIVE = this.swrc.whomToReceive;
      this.SWRC_PARAMS.LETTERNO = this.swrc.letterNo;
      this.SWRC_PARAMS.SUBJECT = this.swrc.subject;
      this.SWRC_PARAMS.APPLICANTNAME = this.swrc.applicantName;
      this.SWRC_PARAMS.APPLICATIONSTATUS = this.swrc.applicationStatus;
      this.SWRC_PARAMS.DEADLINEDATE = this.swrc.deadlineDate;
      this.SWRC_PARAMS.OFFICERNAME = this.swrc.officerName;
      this.SWRC_PARAMS.COMMISSIONORDER = this.swrc.commisionOrder;
      this.SWRC_PARAMS.ASSIGNEDFOR = this.swrc.assigndFor;
      this.SWRC_PARAMS.ASSIGNEDFORNAME = this.swrc.assigndForName;
    }

    this.ADD_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.SWRC_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_NHRC = this.global.checkForUserButtonPermission(
      AppConstants.SWRC_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SWRC_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SWRC_MODULE.EDIT_SUBMIT_URL;
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
    this.swrcForm = this.fb.group({
      id: this.SWRC_PARAMS.ID,
      serialnoDate: [
        this.SWRC_PARAMS.SLNODATE,
        Validators.compose([Validators.required]),
      ],
      type: [this.SWRC_PARAMS.TYPE, Validators.compose([Validators.required])],
      date: [this.SWRC_PARAMS.DATE, Validators.compose([Validators.required])],
      whomToReceive: [
        this.SWRC_PARAMS.WHOMETORECEIVE,
        Validators.compose([Validators.required]),
      ],
      letterNo: [
        this.SWRC_PARAMS.LETTERNO,
        Validators.compose([Validators.required]),
      ],
      subject: [
        this.SWRC_PARAMS.SUBJECT,
        Validators.compose([Validators.required]),
      ],
      applicantName: [
        this.SWRC_PARAMS.APPLICANTNAME,
        Validators.compose([Validators.required]),
      ],
      applicationStatus: [
        this.SWRC_PARAMS.APPLICATIONSTATUS,
        Validators.compose([Validators.required]),
      ],
      deadlineDate: [
        this.SWRC_PARAMS.DEADLINEDATE,
        Validators.compose([Validators.required]),
      ],
      commisionOrder: [
        this.SWRC_PARAMS.COMMISSIONORDER,
        Validators.compose([Validators.required]),
      ],
      officerName: [
        this.SWRC_PARAMS.OFFICERNAME,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.SWRC_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      document: [this.DOCUMENT],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.swrcForm.controls;
    if (this.swrcForm.invalid && !this.swrcForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.swrc) formData.append('id', this.swrcForm.value['id']);
    formData.append('serialnoDate', this.swrcForm.value['serialnoDate']);
    formData.append('type', this.swrcForm.value['type']);
    formData.append('date', this.swrcForm.value['date']);
    formData.append('whomToReceive', this.swrcForm.value['whomToReceive']);
    formData.append('letterNo', this.swrcForm.value['letterNo']);
    formData.append('subject', this.swrcForm.value['subject']);
    formData.append('applicantName', this.swrcForm.value['applicantName']);
    formData.append(
      'applicationStatus',
      this.swrcForm.value['applicationStatus']
    );
    formData.append('deadlineDate', this.swrcForm.value['deadlineDate']);
    formData.append('officerName', this.swrcForm.value['officerName']);
    formData.append('commisionOrder', this.swrcForm.value['commisionOrder']);
    formData.append('assigndFor', this.swrcForm.value['assigndFor']);
    formData.append('assigndForName', this.swrcForm.value['assigndForName']);

    if (this.DOCUMENT) {
      formData.append('document', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.swrcForm.value['id'])
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
    const control = this.swrcForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.swrcForm.controls[controlName];
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
    this.swrcForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.swrcForm.patchValue({
      [name]: event.target.value,
    });
  };

}
