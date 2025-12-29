import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
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
  selector: 'app-modify-succession-list',
  templateUrl: './modify-succession-list.component.html',
  styleUrls: ['./modify-succession-list.component.scss'],
})
export class ModifySuccessionListComponent implements OnInit, OnDestroy {
  subscription: any;
  successionList: any;
  loading = false;
  successionListForm: UntypedFormGroup;

  ADD_SUCCESSION_LIST: boolean;
  EDIT_SUCCESSION_LIST: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;
  designationList: string;

  SUCCESSION_LIST_PARAMS = {
    ID: null,
    TITLE: '',
    TITLEHI: '',
    LINK: '',
    LINKSOURCE: '',
    DESCRIPTION: '',
    DESIGNATION_ID: null,
    DESIGNATION: '',
    PRIORITY: '',
    DATE: {},
    NEW_DATE: '',
    TYPE: '',
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
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.successionList = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    if (this.successionList) {
      this.SUCCESSION_LIST_PARAMS.ID = this.successionList.id;
      this.SUCCESSION_LIST_PARAMS.TITLE = this.successionList.title;
      this.SUCCESSION_LIST_PARAMS.TITLEHI = this.successionList.titleHi;
      this.SUCCESSION_LIST_PARAMS.DESCRIPTION = this.successionList.description;
      this.SUCCESSION_LIST_PARAMS.DESIGNATION_ID =
        this.successionList.designationId;
      this.SUCCESSION_LIST_PARAMS.DESIGNATION =
        this.successionList.designationName;
      this.SUCCESSION_LIST_PARAMS.LINK = this.successionList.link;
      this.SUCCESSION_LIST_PARAMS.PRIORITY = this.successionList.priority;
      this.SUCCESSION_LIST_PARAMS.TYPE = this.successionList.type;
      this.SUCCESSION_LIST_PARAMS.DATE = this.successionList.date.replaceAll(
        '/',
        '-'
      );
      this.SUCCESSION_LIST_PARAMS.NEW_DATE =
        this.successionList.newDate != 'Till Date'
          ? this.successionList.newDate.replaceAll('/', '-')
          : this.successionList.newDate;
    }

    this.ADD_SUCCESSION_LIST = this.global.checkForUserButtonPermission(
      AppConstants.SUCCESSION_LIST_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SUCCESSION_LIST = this.global.checkForUserButtonPermission(
      AppConstants.SUCCESSION_LIST_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.SUCCESSION_LIST_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SUCCESSION_LIST_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initSuccessionListForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initSuccessionListForm = () => {
    this.successionListForm = this.fb.group({
      id: this.SUCCESSION_LIST_PARAMS.ID,
      title: [
        this.SUCCESSION_LIST_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      titleHi: [
        this.SUCCESSION_LIST_PARAMS.TITLEHI,
        Validators.compose([Validators.required]),
      ],
      link: [this.SUCCESSION_LIST_PARAMS.LINK],
      linkSource: [this.SUCCESSION_LIST_PARAMS.LINKSOURCE],
      designationId: [
        this.SUCCESSION_LIST_PARAMS.DESCRIPTION,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.SUCCESSION_LIST_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date: [
        this.SUCCESSION_LIST_PARAMS.DATE,
        Validators.compose([Validators.required]),
      ],
      newDate: [this.SUCCESSION_LIST_PARAMS.NEW_DATE, []],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.successionListForm.controls;
    if (this.successionListForm.invalid && !this.successionListForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.successionList)
      formData.append('id', this.successionListForm.value['id']);
    formData.append('title', this.successionListForm.value['title']);
    formData.append('titleHi', this.successionListForm.value['titleHi']);
    formData.append(
      'designationId',
      this.successionListForm.value['designationId']
    );
    formData.append(
      'designationName',
      this.successionListForm.value['designationName']
    );
    formData.append('priority', this.successionListForm.value['priority']);
    formData.append('type', 'SUCCESSION_LIST');
    formData.append('language', this.language);
    formData.append('date', this.successionListForm.value['date']);
    if (this.successionListForm.value['newDate']) {
      formData.append('newDate', this.successionListForm.value['newDate']);
    }

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.successionListForm.value['link']);
    }

    if (this.successionListForm.value['id'])
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
    const control = this.successionListForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.successionListForm.controls[controlName];
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
    this.LINKSOURCE = file.item(0);
  };

  focusOut = (event, name) => {
    this.successionListForm.patchValue({
      [name]: event.target.value,
    });
  };
}
