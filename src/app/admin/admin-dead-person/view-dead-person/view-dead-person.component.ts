import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Permissions } from 'src/app/models/Permissions';
import { ModelService } from 'src/app/common/popup/model.service';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RefreshTableAndForm, RefreshViewDataStop } from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-dead-person',
  templateUrl: './view-dead-person.component.html',
  styleUrls: ['./view-dead-person.component.scss'],
})
export class ViewDeadPersonComponent implements OnInit, OnDestroy {
  subscription: any;
  baseUrl: string = AppConstants.backServer;
  deadPerson: any;

  changeStatusPath: string = AppConstants.DEAD_PERSON_MODULE.FETCH_VIEW_URL;
  changeStatusDeleteCode: string;
  changeStatusDeleteUrl: string;
  changeStatusModule: string = 'DEADPERSON';
  changeStatusId: number = null;

  forwardDestinationPath: string =
    AppConstants.DEAD_PERSON_MODULE.FETCH_VIEW_FORWARDURL;
  forwardDestinationDeleteCode: string;
  forwardDestinationDeleteUrl: string;
  forwardDestinationModule: string = 'DEADPERSON';
  forwardDestinationId: number = null;

  // change status dropdown options
  changeStatusForModule: string = 'DEADPERSON';
  moduleStatus: string = null;

  changeStatusSubmitURL: string;
  assignToOfficerSubmitURL: string;
  forwatdToDestinationSubmitURL: string;

  isComplete: boolean = false;
  isPending: boolean = false;
  permissions: Permissions = new Permissions();

  view: boolean = false;
  table: boolean = false;

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private modelService: ModelService
  ) {
    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);

    this.deadPerson = this.localStorage.getStoredValue('viewData');

    this.fetchData();

    this.changeStatusId = this.deadPerson.id;
    this.forwardDestinationId = this.deadPerson.id;

    this.changeStatusSubmitURL =
      AppConstants.DEAD_PERSON_MODULE.CHANGE_STATUS_SUBMIT;
    this.assignToOfficerSubmitURL =
      AppConstants.DEAD_PERSON_MODULE.ASSIGN_TO_OFFICER_SUBMIT;
    this.forwatdToDestinationSubmitURL =
      AppConstants.DEAD_PERSON_MODULE.FORWARD_TO_DESTINATION_SUBMIT;

    this.changeStatusDeleteCode =
      AppConstants.DEAD_PERSON_MODULE.DELETE_CHECK_STATUS_BUTTON;
    this.changeStatusDeleteUrl =
      AppConstants.DEAD_PERSON_MODULE.DETELE_CHECK_STATUS_URL;

    this.forwardDestinationDeleteCode =
      AppConstants.DEAD_PERSON_MODULE.DELETE_FORWARD_TO_BUTTON;
    this.forwardDestinationDeleteUrl =
      AppConstants.DEAD_PERSON_MODULE.DETELE_FORWARD_URL;


    this.permissions.changeStatusForm =
      this.global.checkForUserButtonPermission(
        AppConstants.DEAD_PERSON_MODULE.CHANGE_STATUS_FORM
      );

    this.permissions.asssignToOfficer =
      this.global.checkForUserButtonPermission(
        AppConstants.DEAD_PERSON_MODULE.ASSIGN_TO_OFFICER_FORM
      );

    this.permissions.changeStatusList =
      this.global.checkForUserButtonPermission(
        AppConstants.DEAD_PERSON_MODULE.CHANGE_STATUS_TABLE
      );

    this.permissions.forwardToDestinationList =
      this.global.checkForUserButtonPermission(
        AppConstants.DEAD_PERSON_MODULE.FORWARD_TO_OFFICER_TABLE
      );

    this.permissions.forwardToDestination =
      this.global.checkForUserButtonPermission(
        AppConstants.DEAD_PERSON_MODULE.FORWARD_TO_OFFICER_FORM
      );

    this.permissions.sendSMSToUser = this.global.checkForUserButtonPermission(
      AppConstants.DEAD_PERSON_MODULE.SMS_TO_USER_FORM
    );

    this.permissions.sendSMSToUserList =
      this.global.checkForUserButtonPermission(
        AppConstants.DEAD_PERSON_MODULE.SMS_TO_USER_TABLE
      );

      this.permissions.activeInactive = this.global.checkForUserButtonPermission(
        AppConstants.DEAD_PERSON_MODULE.ACTIVE_BUTTON
      );
  }
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
    this.subscription.unsubscribe();
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

  goBack() {
    this._location.back();
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.DEAD_PERSON_MODULE.FETCH_VIEW_DATA,
        { id: this.deadPerson.id },
        true
      )
      .subscribe((data) => {
        this.deadPerson = data.deadPersonDTO;

        this.moduleStatus = this.deadPerson.status;

        this.isComplete =
          AppConstants.DEAD_PERSON_MODULE.COPM_CLOSED != this.deadPerson.status
            ? AppConstants.DEAD_PERSON_MODULE.COPM_REJECT !=
              this.deadPerson.status
            : false;
            
        this.isPending = this.deadPerson.status == AppConstants.PENDING;
      });
  };

  
  openModal = (id: string) => {
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };

  
  acceptApp = (acceptReject: number, id: string) => {
    this.apiCaller
      .apiPostCall(
        AppConstants.DEAD_PERSON_MODULE.SHO_HIDE_PUBLICE,
        {
          id: this.deadPerson.id,
          agreeReject: acceptReject
        },
        true
      )
      .subscribe((data) => {
        this.closeModal(id);
        this.appStore.dispatch(new RefreshTableAndForm(true));
        this.fetchData();
      });
  };

}
