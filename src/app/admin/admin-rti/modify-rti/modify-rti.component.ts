import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-modify-rti',
  templateUrl: './modify-rti.component.html',
  styleUrls: ['./modify-rti.component.scss'],
})
export class ModifyRtiComponent implements OnInit, OnDestroy {
  subscription: any;
  rti: any;
  loading = false;
  rtiForm: UntypedFormGroup;

  sectionList: [];

  ADD_RTI: boolean;
  EDIT_RTI: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  DOCUMENT: File = null;
  language: string;
  stationList: any[];

  RTI_PARAMS = {
    ID: null,
    SRNODATE: '',
    FROMWHERE: '',
    NAMEANDADDRESS: '',
    REQSUBJECT: '',
    SECTIONID: null,
    SECTION_NAME: '',
    // CONVICTION: '',
    RECFROMDATE: '',
    TARGATEDATE: '',
    EXECUTIONDATE: '',
    REMARK: '',
    DOCUMENT: '',
    RECIPTNO: '',
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
    this.rti = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.rti) {
      this.RTI_PARAMS.ID = this.rti.id;
      this.RTI_PARAMS.SRNODATE = this.rti.rtoRequestMobNo;
      this.RTI_PARAMS.FROMWHERE = this.rti.rtoRequestAddress;
      this.RTI_PARAMS.NAMEANDADDRESS = this.rti.rtoRequestname;
      this.RTI_PARAMS.REQSUBJECT = this.rti.rtoSubject;
      this.RTI_PARAMS.SECTIONID = this.rti.sectionId;
      this.RTI_PARAMS.SECTION_NAME = this.rti.sectionName;
      // this.RTI_PARAMS.CONVICTION = this.rti.ef3;
      this.RTI_PARAMS.RECFROMDATE = this.rti.rtoReceiveNo;
      this.RTI_PARAMS.TARGATEDATE = this.rti.rtoResolveDate;
      this.RTI_PARAMS.EXECUTIONDATE = this.rti.rtoResolveNo;
      this.RTI_PARAMS.REMARK = this.rti.rtoRemark;
      this.RTI_PARAMS.DOCUMENT = this.rti.ef1;
      this.RTI_PARAMS.RECIPTNO = this.rti.reciptNo;
    }

    this.ADD_RTI = this.global.checkForUserButtonPermission(
      AppConstants.RTI_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_RTI = this.global.checkForUserButtonPermission(
      AppConstants.RTI_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.RTI_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.RTI_MODULE.EDIT_SUBMIT_URL;

    // this.apiService
    //   .apiGetCall(AppConstants.PUBLIC_APIS.FETCHSECTION, true)
    //   .subscribe((data) => {
    //     this.sectionList = data.sectionsDTO;
    //   });

    // this.apiService
    // .apiPostCall(
    //   AppConstants.ECOM_DISPATCH_MODULE.USER_FORMWARD_LIST,
    //   {},
    //   true
    // )
    // .subscribe((data) => {
    //   this.sectionList = data.list;
    // });
  }

  ngOnInit(): void {
    this.initPostingListForm();
    this.getOfficerList();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initPostingListForm = () => {
    this.rtiForm = this.fb.group({
      id: this.RTI_PARAMS.ID,
      rtoRequestMobNo: [
        this.RTI_PARAMS.SRNODATE,
        Validators.compose([Validators.required]),
      ],
      rtoRequestAddress: [
        this.RTI_PARAMS.FROMWHERE,
        Validators.compose([Validators.required]),
      ],
      rtoRequestname: [
        this.RTI_PARAMS.NAMEANDADDRESS,
        Validators.compose([Validators.required]),
      ],
      rtoSubject: [
        this.RTI_PARAMS.REQSUBJECT,
        Validators.compose([Validators.required]),
      ],
      sectionId: [
        this.RTI_PARAMS.SECTIONID,
        Validators.compose([Validators.required]),
      ],
      // ef3: [
      //   this.RTI_PARAMS.CONVICTION,
      //   Validators.compose([Validators.required]),
      // ],

      rtoReceiveNo: [
        this.RTI_PARAMS.RECFROMDATE,
        Validators.compose([Validators.required]),
      ],
      rtoResolveDate: [
        this.RTI_PARAMS.TARGATEDATE,
        Validators.compose([Validators.required]),
      ],
      rtoResolveNo: [
        this.RTI_PARAMS.EXECUTIONDATE,
        Validators.compose([Validators.required]),
      ],
      rtoRemark: [
        this.RTI_PARAMS.REMARK,
        Validators.compose([Validators.required]),
      ],
      ef1: [this.RTI_PARAMS.DOCUMENT],
      reciptNo: [this.RTI_PARAMS.RECIPTNO],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.rtiForm.controls;
    if (this.rtiForm.invalid && !this.rtiForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.rti) formData.append('id', this.rtiForm.value['id']);
    formData.append('rtoRequestMobNo', this.rtiForm.value['rtoRequestMobNo']);
    formData.append(
      'rtoRequestAddress',
      this.rtiForm.value['rtoRequestAddress']
    );
    formData.append('rtoRequestname', this.rtiForm.value['rtoRequestname']);
    formData.append('rtoSubject', this.rtiForm.value['rtoSubject']);
    formData.append('sectionId', this.rtiForm.value['sectionId']);
    formData.append('sectionName', this.rtiForm.value['sectionName']);
    // formData.append('ef3', this.rtiForm.value['ef3']);
    formData.append('rtoReceiveNo', this.rtiForm.value['rtoReceiveNo']);
    formData.append('rtoResolveDate', this.rtiForm.value['rtoResolveDate']);
    formData.append('rtoResolveNo', this.rtiForm.value['rtoResolveNo']);
    formData.append('rtoRemark', this.rtiForm.value['rtoRemark']);
    formData.append('reciptNo', this.rtiForm.value['reciptNo']);
    if (this.DOCUMENT) {
      formData.append('ef1', this.DOCUMENT, this.DOCUMENT.name);
    }

    if (this.rtiForm.value['id'])
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
    const control = this.rtiForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.rtiForm.controls[controlName];
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

  handleFileChange = (file: FileList) => {
    this.DOCUMENT = file.item(0);
  };

  setDataRecipt = (value: string) => {
    var receipt = value.split(',');
    this.rtiForm.patchValue({
      reciptNo: receipt[0],
      rtoRequestMobNo: value.toUpperCase(),
    });
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
    this.rtiForm.patchValue({
      sectionId: item.id,
    });
  }

  focusOut = (event, name) => {
    this.rtiForm.patchValue({
      [name]: event.target.value,
    });
  };
}
