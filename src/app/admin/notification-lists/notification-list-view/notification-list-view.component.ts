import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Permissions } from 'src/app/models/Permissions';
import { User } from 'src/app/models/user';
import { select, Store } from '@ngrx/store';
import {
  AppLoadderHide,
  AppLoadderShow,
  RefreshViewDataStop,
  StopEditFormData,
} from 'src/app/storage/actions/app.actions';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-notification-list-view',
  templateUrl: './notification-list-view.component.html',
  styleUrls: ['./notification-list-view.component.scss'],
})
export class NotificationListViewComponent implements OnInit, OnDestroy {
  subscription: any;
  subscriptionAuth: any;
  notificationList: any;
  backUrl: string;
  language: string;

  notificationUserPath: string =
    AppConstants.NOTIFICATION_USER_MODULE.FETCH_URL;
  notificationUserDeleteCode: string;
  notificationUserDeleteUrl: string;
  notificationUserId: number = null;
  notificationUserEditCurrentFormCode: string;
  notificationUserForm: UntypedFormGroup;
  notificationUserSubmitURL: string;
  notificationUserEditURL: string;

  listId: number = null;

  permissions: Permissions = new Permissions();
  table: boolean = false;
  view: boolean = false;

  sendNotification: any;
  sendNotificationForm: UntypedFormGroup;
  loading = false;

  SUBMIT_ADD: boolean;
  SUBMIT_EDIT: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  NOTIFY_PARAM: any = {
    ID: null,
    LIST_NAME: '',
    USER_NAME: '',
    MESSAGE: '',
  };

  officersList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {
    singleSelection: false,
    text: 'Select User Name',
    enableCheckAll: true,
    selectAllText: 'Select All List and User',
    unSelectAllText: 'UnSelect All List and User',
    enableSearchFilter: true,
    badgeShowLimit: 3,
    primaryKey: 'id',
    labelKey: 'userName',
    groupBy: 'listName',
    selectGroup: true,
  };

  userList: any[] = [];
  selectedUserItems = [];
  dropdownUserSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'userName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  selectedOfficersids: any[] = [];
  selectedUserids: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private toaster: ToasterService,
    private authStore: Store<{ auth: User }>
  ) {

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.global.checkForUserPermission(this.router.url);
    this.notificationList = this.localStorage.getStoredValue('viewData');

    if (this.notificationList)
      this.notificationUserId = this.notificationList.id;
    this.listId = this.notificationList.id;

    this.fetchData();

    this.notificationUserSubmitURL =
      AppConstants.NOTIFICATION_USER_MODULE.ADD_SUBMIT_URL;

    this.notificationUserEditURL =
      AppConstants.NOTIFICATION_USER_MODULE.EDIT_SUBMIT_URL;

    this.permissions.activate_url =
      AppConstants.NOTIFICATION_USER_MODULE.ACTIVATE_URL;
    this.permissions.deactivate_url =
      AppConstants.NOTIFICATION_USER_MODULE.DEACTIVATE_URL;

    this.notificationUserDeleteCode =
      AppConstants.NOTIFICATION_USER_MODULE.DEACTIVATE_BUTTON;
    this.notificationUserDeleteUrl =
      AppConstants.NOTIFICATION_USER_MODULE.DEACTIVATE_URL;

    this.notificationUserEditCurrentFormCode =
      AppConstants.NOTIFICATION_USER_MODULE.EDIT_SUBMIT_DATA;

    this.permissions.stationUserList = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_USER_MODULE.USER_TABLE
    );

    this.permissions.stationUser = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_USER_MODULE.ADD_SUBMIT_DATA
    );

    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.NOTIFICATION_USER_MODULE.EDIT_SUBMIT_DATA
    );

    appStore.dispatch(new StopEditFormData({}));
  }

  ngOnDestroy(): void {
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

    this.apiCaller
      .apiGetCall(AppConstants.NOTIFICATION_MODULE.GT_USER_LIST, true)
      .subscribe((data) => {
        this.officersList = data.notificationUserListDTOs;
      });
  }

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.NOTIFICATION_MODULE.VIEW_URL,
        { id: this.notificationList.id },
        true
      )
      .subscribe((data) => {
        this.notificationList = data.notificationListDTO;
      });
  };

  goBack() {
    this.localStorage.destroyStoredValue('viewData');
    this._location.back();
  }

  getUpdatedForm = (notificationUserForm: UntypedFormGroup) => {
    this.notificationUserForm = notificationUserForm;
  };

  initNotificationForm = () => {
    this.sendNotificationForm = this.fb.group({
      id: [this.NOTIFY_PARAM.ID],
      listName: [this.NOTIFY_PARAM.LIST_NAME],
      userName: [this.NOTIFY_PARAM.USER_NAME],
      message: [
        this.NOTIFY_PARAM.MESSAGE,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.sendNotificationForm.controls;
    if (this.sendNotificationForm.invalid && !this.sendNotificationForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var data = {
      users: this.selectedItems,
      message: this.sendNotificationForm.value['message'],
    };

    this.apiCaller
      .apiPostCall(
        AppConstants.NOTIFICATION_MODULE.SEND_NOTIFICATION,
        data,
        true
      )
      .subscribe(
        (data) => {
          this.toaster.getToastMessage(
            data.message,
            'success',
            3000,
            'top-end'
          );
          this.sendNotificationForm.reset();
          this.selectedItems = [];
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.sendNotificationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.sendNotificationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
  }

  onItemSelect(item: any) {
    var user = {
      id: item.id,
      userName: item.userName,
      name: item.userName,
      villageName: item.villageName,
      userDesignation: item.userDesignation,
      userMobile1: item.userMobile1,
      userMobile2: item.userMobile2,
    };

    this.selectedItems.push(user);
  }
  onSelectAll(items: any) {
    var selectItemsTems = [];

    this.selectedItems.forEach((user, i) => {
      if (!user.id) {
        selectItemsTems.push(user);
      }
    });

    this.selectedItems = selectItemsTems;

    items.forEach((item) => {
      var user = {
        id: item.id,
        userName: item.userName,
        name: item.userName,
        villageName: item.villageName,
        userDesignation: item.userDesignation,
        userMobile1: item.userMobile1,
        userMobile2: item.userMobile2,
      };

      this.selectedItems.push(user);
    });
  }
  onDeSelect(item: any) {
    this.selectedItems.forEach((user, i) => {
      if (item.id == user.id) {
        this.selectedItems.splice(i, 1);
        return;
      }
    });
  }
  onDeSelectAll(items: any) {
    var selectItemsTems = [];

    this.selectedItems.forEach((user, i) => {
      if (!user.id) {
        selectItemsTems.push(user);
      }
    });

    this.selectedItems = selectItemsTems;
  }

  onGroupSelect(items: any) {
    var isPresent = false;
    if (items.selected) {
      items.list.forEach((item, i) => {
        this.selectedItems.forEach((user) => {
          if (item.id == user.id) {
            isPresent = true;
          }
        });

        if (!isPresent) {
          var user = {
            id: item.id,
            userName: item.userName,
            name: item.userName,
            villageName: item.villageName,
            userDesignation: item.userDesignation,
            userMobile1: item.userMobile1,
            userMobile2: item.userMobile2,
          };

          this.selectedItems.push(user);
        }

        isPresent = false;
      });
    }
  }
  onGroupDeSelect(items: any) {
    var isPresent = false;
    var selectItemsTems = [];

    if (!items.selected) {
      this.selectedItems.forEach((user, i) => {
        items.list.forEach((item, i) => {
          if (user.id && item.id == user.id) {
            isPresent = true;
          }
        });
        if (!isPresent) {
          selectItemsTems.push(user);
        }
        isPresent = false;
      });

      this.selectedItems = selectItemsTems;
    }
  }

  focusOut = (event, name) => {
    this.sendNotificationForm.patchValue({
      [name]: event.target.value,
    });
  };
}
