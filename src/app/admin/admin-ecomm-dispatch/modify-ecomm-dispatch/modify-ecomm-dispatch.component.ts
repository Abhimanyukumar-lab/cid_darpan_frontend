import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-modify-ecomm-dispatch',
  templateUrl: './modify-ecomm-dispatch.component.html',
  styleUrls: ['./modify-ecomm-dispatch.component.scss'],
})
export class ModifyEcommDispatchComponent implements OnInit, OnDestroy {
  subscription: any;
  ecommunicationDispatch: any;
  loading = false;
  ecommunicationDispatchForm: UntypedFormGroup;

  max: Date = new Date();

  ADD_ECOM_DISPATCH: boolean;
  EDIT_ECOM_DISPATCH: boolean;

  ADD_URL: string;
  EDIT_URL: string;
  language: string;

  stationList: any[];
  ECOMFILL2: File = null;

  ECOM_DISPATCH_PARAMS = {
    ID: null,
    ECOMMNODATE: null,
    DISPATCHNO: null,
    STATIONFROM: null,
    ECOMMSRNO: null,
    ECOMMDATE: null,
    ECOMMSUBJECT: null,
    ASSIGNEDFOR: null,
    ASSIGNEDFORNAME: null,
    ECOMMRECEIVEDNO: null,
    ECOMMQUERIESRECEIEVEDDATE: null,
    ECOMMRESOLVEDNO: null,
    ECOMMRESOLVEDDATE: null,
    ECOMMSUMMERY: null,
    ECOMMSTATUS: null,
    ECOMFILL2: null,
  };

  officersList: [];
  selectedOfficerId: string[] = [];
  selectedItems = [];
  dropdownOfficerSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    unSelectAllText: 'UnSelect',
    itemsShowLimit: 3,
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
    public langModule: LangModule,
    private router: Router
  ) {
    this.ecommunicationDispatch = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });
    if (this.ecommunicationDispatch) {
      this.ECOM_DISPATCH_PARAMS.ID = this.ecommunicationDispatch.id;
      this.ECOM_DISPATCH_PARAMS.ECOMMNODATE =
        this.ecommunicationDispatch.ecommNoDate;
      this.ECOM_DISPATCH_PARAMS.DISPATCHNO =
        this.ecommunicationDispatch.reciptNo;
      this.ECOM_DISPATCH_PARAMS.STATIONFROM =
        this.ecommunicationDispatch.stationFrom;
      this.ECOM_DISPATCH_PARAMS.ECOMMSRNO =
        this.ecommunicationDispatch.ecommSrNo;
      this.ECOM_DISPATCH_PARAMS.ECOMMDATE =
        this.ecommunicationDispatch.ecommDate;
      this.ECOM_DISPATCH_PARAMS.ECOMMSUBJECT =
        this.ecommunicationDispatch.ecommSubject;
      this.ECOM_DISPATCH_PARAMS.ASSIGNEDFOR =
        this.ecommunicationDispatch.assigndFor;
      this.ECOM_DISPATCH_PARAMS.ASSIGNEDFORNAME =
        this.ecommunicationDispatch.assigndForName;
      this.ECOM_DISPATCH_PARAMS.ECOMMRECEIVEDNO =
        this.ecommunicationDispatch.ecommreceviedNo;
      this.ECOM_DISPATCH_PARAMS.ECOMMQUERIESRECEIEVEDDATE =
        this.ecommunicationDispatch.ecommQueriesReceivedDate;
      this.ECOM_DISPATCH_PARAMS.ECOMMRESOLVEDNO =
        this.ecommunicationDispatch.ecommresolveNo;
      this.ECOM_DISPATCH_PARAMS.ECOMMRESOLVEDDATE =
        this.ecommunicationDispatch.ecommResolvedDate;
      this.ECOM_DISPATCH_PARAMS.ECOMMSUMMERY =
        this.ecommunicationDispatch.ecommSummary;
      this.ECOM_DISPATCH_PARAMS.ECOMMSTATUS =
        this.ecommunicationDispatch.ecommStatus;
    }

    this.ADD_ECOM_DISPATCH = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_DISPATCH_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_ECOM_DISPATCH = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_DISPATCH_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.ECOM_DISPATCH_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.ECOM_DISPATCH_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initsupremeCourtForm();
    this.getOfficerList();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initsupremeCourtForm = () => {
    this.ecommunicationDispatchForm = this.fb.group({
      id: this.ECOM_DISPATCH_PARAMS.ID,
      ecommNoDate: [
        this.ECOM_DISPATCH_PARAMS.ECOMMNODATE,
        Validators.compose([Validators.required]),
      ],
      reciptNo: [
        { value: this.ECOM_DISPATCH_PARAMS.DISPATCHNO, disabled: true },
        Validators.compose([Validators.required]),
      ],
      stationFrom: [
        this.ECOM_DISPATCH_PARAMS.STATIONFROM,
        Validators.compose([Validators.required]),
      ],
      ecommSrNo: [
        this.ECOM_DISPATCH_PARAMS.ECOMMSRNO,
        Validators.compose([Validators.required]),
      ],
      ecommDate: [
        this.ECOM_DISPATCH_PARAMS.ECOMMDATE,
        Validators.compose([Validators.required]),
      ],
      ecommSubject: [
        this.ECOM_DISPATCH_PARAMS.ECOMMSUBJECT,
        Validators.compose([Validators.required]),
      ],
      assigndFor: [
        this.ECOM_DISPATCH_PARAMS.ASSIGNEDFOR,
        Validators.compose([Validators.required]),
      ],
      ecommreceviedNo: [this.ECOM_DISPATCH_PARAMS.ECOMMRECEIVEDNO],
      ecommQueriesReceivedDate: [
        this.ECOM_DISPATCH_PARAMS.ECOMMQUERIESRECEIEVEDDATE,
      ],
      ecommresolveNo: [this.ECOM_DISPATCH_PARAMS.ECOMMRESOLVEDNO],
      ecommResolvedDate: [this.ECOM_DISPATCH_PARAMS.ECOMMRESOLVEDDATE],
      ecommSummary: [this.ECOM_DISPATCH_PARAMS.ECOMMSUMMERY],
      ecommStatus: [
        this.ECOM_DISPATCH_PARAMS.ECOMMSTATUS,
        Validators.compose([Validators.required]),
      ],
      ecommFill2: [this.ECOM_DISPATCH_PARAMS.ECOMFILL2],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.ecommunicationDispatchForm.controls;
    if (
      this.ecommunicationDispatchForm.invalid &&
      !this.ecommunicationDispatchForm.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var selectedOne = [];
    this.selectedOfficerId.forEach((selection: any) => {
      selectedOne.push(selection.id);
    });

    var formData = new FormData();

    if (this.ecommunicationDispatch)
      formData.append('id', this.ecommunicationDispatchForm.value['id']);
    formData.append(
      'ecommNoDate',
      this.ecommunicationDispatchForm.value['ecommNoDate']
    );

    if (this.ecommunicationDispatchForm.value['ecommNoDate']) {
      var recNo = this.ecommunicationDispatchForm.value['ecommNoDate'];
      var receipt = recNo.split(',');
      this.ecommunicationDispatchForm.patchValue({
        reciptNo: receipt[0],
      });
      formData.append('reciptNo', receipt[0]);
    }

    formData.append(
      'stationFrom',
      this.ecommunicationDispatchForm.value['stationFrom']
    );
    formData.append(
      'ecommSrNo',
      this.ecommunicationDispatchForm.value['ecommSrNo']
    );
    formData.append(
      'ecommDate',
      this.ecommunicationDispatchForm.value['ecommDate']
    );
    formData.append(
      'ecommSubject',
      this.ecommunicationDispatchForm.value['ecommSubject']
    );
    formData.append('assigndForIds', selectedOne.toString());
    formData.append(
      'assigndForName',
      this.ecommunicationDispatchForm.value['assigndForName']
    );
    formData.append(
      'ecommreceviedNo',
      this.ecommunicationDispatchForm.value['ecommreceviedNo']
    );
    formData.append(
      'ecommQueriesReceivedDate',
      this.ecommunicationDispatchForm.value['ecommQueriesReceivedDate']
    );
    formData.append(
      'ecommresolveNo',
      this.ecommunicationDispatchForm.value['ecommresolveNo']
    );
    formData.append(
      'ecommResolvedDate',
      this.ecommunicationDispatchForm.value['ecommResolvedDate']
    );
    formData.append(
      'ecommSummary',
      this.ecommunicationDispatchForm.value['ecommSummary']
    );
    formData.append(
      'ecommStatus',
      this.ecommunicationDispatchForm.value['ecommStatus']
    );
    if (this.ECOMFILL2) {
      formData.append('file', this.ECOMFILL2, this.ECOMFILL2.name);
    }

    if (this.ecommunicationDispatchForm.value['id'])
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
            this.selectedOfficerId = [];
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
            this.selectedOfficerId = [];
            this.appStore.dispatch(new AppLoadderHide({}));
          }
        );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.ecommunicationDispatchForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.ecommunicationDispatchForm.controls[controlName];
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
    this.ecommunicationDispatchForm.patchValue({
      reciptNo: receipt[0].toUpperCase(),
      ecommNoDate: value.toUpperCase(),
    });
  };

  getOfficerList = (): any => {
    this.apiService
      .apiPostCall(AppConstants.NHRC_MODULE.COMM_FORMWARD_LIST, {}, true)
      .subscribe((data) => {
        this.officersList = data.list;
      });
  };

  onItemSelect(item: any) {
    this.selectedOfficerId.push(item.id + '');
    this.ecommunicationDispatchForm.patchValue({
      assigndFor: item.id,
    });
  }

  focusOut = (event, name) => {
    this.ecommunicationDispatchForm.patchValue({
      [name]: event.target.value,
    });
  };
}
