import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { User } from 'src/app/models/user';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  RefreshViewDataStop,
  StopEditFormData,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  sections: any;
  baseUrl: string = AppConstants.backServer;

  sectionUserPath: string =
    AppConstants.SECTION_MODULE.FETCH_VIEW_SECTION_USERS;
  sectionUserDeleteCode: string;
  sectionUserDeleteUrl: string;
  sectionUserId: number = null;
  sectionUserEditCurrentFormCode: string;
  sectionUserForm: UntypedFormGroup;
  sectionUserSubmitURL: string;
  sectionUserEditURL: string;

  permissions: Permissions = new Permissions();
  table: boolean = false;
  view: boolean = false;
  language: string;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private authStore: Store<{ auth: User }>
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;
    
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.global.checkForUserPermission(this.router.url);
    this.sections = this.localStorage.getStoredValue('viewData');

    if (this.sections) this.sectionUserId = this.sections.id;
    
    this.subscriptionAuth = this.authStore
      .pipe(select('auth'))
      .subscribe((data) => {
        if (data && data.user && !this.sections) {
          this.sectionUserId = data.user.sectionId;
          
        }
      });


    this.fetchData();

    this.sectionUserSubmitURL =
      AppConstants.SECTION_MODULE.SECTION_USER_SUBMIT;

      this.sectionUserEditURL =
        AppConstants.SECTION_MODULE.SECTION_USER_EDIT;

    this.sectionUserDeleteCode =
      AppConstants.SECTION_MODULE.DELETE_SECTION_USER_BUTTON;
    this.sectionUserDeleteUrl =
      AppConstants.SECTION_MODULE.DETELE_SECTION_USER_URL;

    this.sectionUserEditCurrentFormCode =
      AppConstants.SECTION_MODULE.SECTION_USER_CURRENT_FORM_EDIT;

    this.permissions.sectionUserList = this.global.checkForUserButtonPermission(
      AppConstants.SECTION_MODULE.SECTION_USER_TABLE
    );

    this.permissions.sectionUser = this.global.checkForUserButtonPermission(
      AppConstants.SECTION_MODULE.SECTION_USER_FORM
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.SECTION_MODULE.EDIT_BUTTON
    );

    appStore.dispatch(new StopEditFormData({}));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isViewDataRefresh) {
        this.appStore.dispatch(new RefreshViewDataStop({}));
        this.fetchData();
      }

      this.table = data.isTableRefresh;
      this.view = data.isViewDataRefresh;
    });
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.SECTION_MODULE.FETCH_VIEW_DATA,
        { id: this.sectionUserId },
        true
      )
      .subscribe((data) => {
        this.sections = data.sectionsDTO;
      });
  };

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }

  getUpdatedForm = (sectionUserForm: UntypedFormGroup) => {
    this.sectionUserForm = sectionUserForm;
  };

  
  editInfo = () => {
    this.localStorage.setStoredValue('editData', this.sections);
    this.router.navigate(['/official/sections/edit']);
  };

}
