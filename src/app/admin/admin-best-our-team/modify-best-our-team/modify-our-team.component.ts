import { DatePipe, formatDate, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
  selector: 'app-modify-our-team',
  templateUrl: './modify-our-team.component.html',
  styleUrls: ['./modify-our-team.component.scss'],
})
export class ModifyOurTeamComponent implements OnInit, OnDestroy {
  subscription: any;
  ourTeam: any;
  loading = false;
  ourTeamForm: UntypedFormGroup;

  ADD_OUR_TEAM: boolean;
  EDIT_OUR_TEAM: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  LINKSOURCE: File = null;
  language: string;
  designationList: string;

  OUR_TEAM_PARAMS = {
    ID: null,
    TITLE: '',
    TITLEHI: '',
    DESIGNATIONID: null,
    DESIGNATION: '',
    LINK: '',
    LINKSOURCE: '',
    DESCRIPTION: '',
    DESCRIPTIONHI: '',
    PRIORITY: '',
    DATE: '',
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
    public langModule: LangModule
  ) {
    this.ourTeam = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.apiService
      .apiGetCall(AppConstants.DESIGNATION_MODULE.GET_DESGN_LIST, true)
      .subscribe((data) => {
        this.designationList = data.designationDTOs;
      });

    if (this.ourTeam) {
      this.OUR_TEAM_PARAMS.ID = this.ourTeam.id;
      this.OUR_TEAM_PARAMS.TITLE = this.ourTeam.title;
      this.OUR_TEAM_PARAMS.TITLEHI = this.ourTeam.titleHi;
      this.OUR_TEAM_PARAMS.DESIGNATIONID = this.ourTeam.designationId;
      this.OUR_TEAM_PARAMS.DESIGNATION = this.ourTeam.designationName;
      this.OUR_TEAM_PARAMS.DESCRIPTION = this.ourTeam.description;
      this.OUR_TEAM_PARAMS.DESCRIPTIONHI = this.ourTeam.descriptionHi;
      this.OUR_TEAM_PARAMS.LINK = this.ourTeam.link;
      this.OUR_TEAM_PARAMS.PRIORITY = this.ourTeam.priority;
      this.OUR_TEAM_PARAMS.TYPE = this.ourTeam.type;
      this.OUR_TEAM_PARAMS.DATE = this.ourTeam.date.replaceAll('/', '-');
    }

    this.ADD_OUR_TEAM = this.global.checkForUserButtonPermission(
      AppConstants.OUR_TEAM_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_OUR_TEAM = this.global.checkForUserButtonPermission(
      AppConstants.OUR_TEAM_MODULE.EDIT_SUBMIT_DATA
    );

    this.ADD_URL = AppConstants.OUR_TEAM_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.OUR_TEAM_MODULE.EDIT_SUBMIT_URL;
  }

  ngOnInit(): void {
    this.initOurTeamForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initOurTeamForm = () => {
    this.ourTeamForm = this.fb.group({
      id: this.OUR_TEAM_PARAMS.ID,
      title: [
        this.OUR_TEAM_PARAMS.TITLE,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      titleHi: [
        this.OUR_TEAM_PARAMS.TITLEHI,
        Validators.compose([Validators.required]),
      ],
      link: [this.OUR_TEAM_PARAMS.LINK],
      linkSource: [this.OUR_TEAM_PARAMS.LINKSOURCE],
      designationId: [
        this.OUR_TEAM_PARAMS.DESIGNATIONID,
        Validators.compose([Validators.required]),
      ],
      description: [
        this.OUR_TEAM_PARAMS.DESCRIPTION,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ]),
      ],
      descriptionHi: [
        this.OUR_TEAM_PARAMS.DESCRIPTIONHI,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ]),
      ],
      priority: [
        this.OUR_TEAM_PARAMS.PRIORITY,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      date: [
        this.OUR_TEAM_PARAMS.DATE,
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.ourTeamForm.controls;
    if (this.ourTeamForm.invalid && !this.ourTeamForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.ourTeam) formData.append('id', this.ourTeamForm.value['id']);
    formData.append('title', this.ourTeamForm.value['title']);
    formData.append('titleHi', this.ourTeamForm.value['titleHi']);
    formData.append(
      'designationName',
      this.ourTeamForm.value['designationName']
    );
    formData.append('designationId', this.ourTeamForm.value['designationId']);
    formData.append('description', this.ourTeamForm.value['description']);
    formData.append('descriptionHi', this.ourTeamForm.value['descriptionHi']);
    formData.append('priority', this.ourTeamForm.value['priority']);
    formData.append('date', this.ourTeamForm.value['date']);
    formData.append('type', 'BEST_OUR_TEAM');
    formData.append('language', this.language);
    // formData.append(
    //   'date',
    //   formatDate(this.ourTeamForm.value['date'], 'dd/MM/yyyy', 'en')
    // );

    if (this.LINKSOURCE) {
      formData.append('linkSource', this.LINKSOURCE, this.LINKSOURCE.name);
    } else {
      formData.append('link', this.ourTeamForm.value['link']);
    }

    if (this.ourTeamForm.value['id'])
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
    const control = this.ourTeamForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.ourTeamForm.controls[controlName];
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
    this.ourTeamForm.patchValue({
      [name]: event.target.value,
    });
  };
}
