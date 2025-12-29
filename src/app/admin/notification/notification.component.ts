import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { Permissions } from 'src/app/models/Permissions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  subscription: any;

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

  userpath: string = AppConstants.NOTIFICATION_USER_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();
  language: string;

  constructor(
    private fb: UntypedFormBuilder,
    private appStore: Store<{ app: any }>,
    private _location: Location,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private localStorage: LocalstorageService
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.localStorage.setStoredValue(
      'notificationUrl',
      '/official/notification'
    );

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

  }
  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.initNotificationForm();

    this.apiService
      .apiGetCall(AppConstants.NOTIFICATION_MODULE.GT_USER_LIST, true)
      .subscribe((data) => {
        this.officersList = data.notificationUserListDTOs;
      });
  }

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

    this.apiService
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

  goBack() {
    this._location.back();
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
