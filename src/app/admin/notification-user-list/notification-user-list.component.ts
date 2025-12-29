import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  AppLoadderHide,
  AppLoadderShow,
  StopEditFormData,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification-user-list',
  templateUrl: './notification-user-list.component.html',
  styleUrls: ['./notification-user-list.component.scss'],
})
export class NotificationUserListComponent implements OnInit, OnDestroy {
  @Input('listId')
  listId: number;

  @Input('url')
  url: string;

  @Input('editUrl')
  editUrl: string;

  @Input('id')
  id: number;

  @Input('form')
  form: UntypedFormGroup;

  subscription: any;
  // url: string = AppConstants.NOTIFICATION_USER_MODULE.ADD_SUBMIT_URL;
  backUrl: string;
  // id: number;
  name: string;

  loading: boolean = false;
  notificationUserForm: UntypedFormGroup;
  language: string;

  USER_LIST_PARAM: any = {
    active: true,
    createdBy: null,
    createdDate: null,
    districtId: null,
    districtName: null,
    id: null,
    idInfo: null,
    listId: null,
    listName: null,
    name: null,
    updatedBy: null,
    updatedDate: null,
    userDesignation: null,
    userId: null,
    userMobile1: null,
    userMobile2: null,
    userName: null,
    villageName: null,
  };
  USER_LIST_PARAM_EMPTY: any = {
    active: true,
    createdBy: null,
    createdDate: null,
    districtId: null,
    districtName: null,
    id: null,
    idInfo: null,
    listId: null,
    listName: null,
    name: null,
    updatedBy: null,
    updatedDate: null,
    userDesignation: null,
    userId: null,
    userMobile1: null,
    userMobile2: null,
    userName: null,
    villageName: null,
  };
  stationList: any[];

  officersList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {
    singleSelection: false,
    text: 'Select Station User Name',
    enableCheckAll: true,
    selectAllText: 'Select All police Stations User',
    unSelectAllText: 'UnSelect All police Stations User',
    enableSearchFilter: true,
    badgeShowLimit: 3,
    primaryKey: 'id',
    labelKey: 'name',
    groupBy: 'stationName',
    selectGroup: true,
  };

  dropdownPoliceStationSettings = {
    singleSelection: false,
    text: 'Select Station Name',
    enableCheckAll: true,
    selectAllText: 'Select All police Stations',
    unSelectAllText: 'UnSelect All police Stations',
    enableSearchFilter: true,
    badgeShowLimit: 3,
    primaryKey: 'id',
    labelKey: 'stationName',
  };

  selectedOfficersids: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiCallerService,
    private toaster: ToasterService,
    private appStore: Store<{ app: any }>,
    private localStorage: LocalstorageService,
    private langModule: LangModule,
    private router: Router
  ) {
    this.id = this.localStorage.getStoredValue('listValue');
    this.backUrl = this.localStorage.getStoredValue('listNameUrl');
    this.name = this.localStorage.getStoredValue('listNameValue');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isEditing) {
        this.USER_LIST_PARAM = data.isEditingData;
        this.initNotificationUserForm();
      } else {
        this.USER_LIST_PARAM = this.USER_LIST_PARAM_EMPTY;
        this.USER_LIST_PARAM.LINKID = this.listId;
        this.initNotificationUserForm();
      }
    });
  }

  ngOnInit(): void {
    this.USER_LIST_PARAM.ID = this.id;
    this.USER_LIST_PARAM.LINKID = this.listId;

    // if (this.form) this.notificationUserForm = this.form;
    // else

    this.initNotificationUserForm();

    this.apiService
      .apiGetCall(AppConstants.NOTIFICATION_USER_MODULE.GT_OFFICER_LIST, true)
      .subscribe((data) => {
        this.stationList = data.stationDtos;
      });

    this.apiService
      .apiGetCall(AppConstants.NOTIFICATION_USER_MODULE.GT_STN_USER_LIST, true)
      .subscribe((data) => {
        this.officersList = data.stationUserDTOs;
      });
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('listValue');
    this.localStorage.destroyStoredValue('listNameUrl');
    this.localStorage.destroyStoredValue('listNameValue');
    this.appStore.dispatch(new StopEditFormData({}));
    this.subscription.unsubscribe();
  }

  initNotificationUserForm = () => {
    this.notificationUserForm = this.fb.group({
      id: [this.USER_LIST_PARAM.id],
      userName: [
        this.USER_LIST_PARAM.userName &&
        typeof this.USER_LIST_PARAM.userName == 'object' &&
        this.USER_LIST_PARAM.userName.length > 0
          ? this.USER_LIST_PARAM.userName
          : null,
      ],
      name: [
        this.USER_LIST_PARAM.name,
        Validators.compose([Validators.required]),
      ],
      villageName: [
        this.USER_LIST_PARAM.villageName,
        Validators.compose([Validators.required]),
      ],
      userDesignation: [
        this.USER_LIST_PARAM.userDesignation,
        Validators.compose([Validators.required]),
      ],
      userMobile1: [
        this.USER_LIST_PARAM.userMobile1,
        Validators.compose([Validators.required]),
      ],
      userMobile2: [this.USER_LIST_PARAM.userMobile2],
    });
  };

  adduserToList = () => {
    Swal.fire({
      title: 'Are you sure want to add?',
      text: 'You will not be able to edit user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add it!',
      cancelButtonText: 'No, keep editting',
    }).then((result) => {
      if (result.value) {
        this.appStore.dispatch(new AppLoadderShow({}));
        const controls = this.notificationUserForm.controls;
        if (
          this.notificationUserForm.invalid &&
          !this.notificationUserForm.valid
        ) {
          Object.keys(controls).forEach((controlName) =>
            controls[controlName].markAsTouched()
          );
          this.loading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
          return;
        }

        this.selectedItems.push(this.notificationUserForm.value);
        this.notificationUserForm.reset();
        this.appStore.dispatch(new AppLoadderHide({}));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  };

  submit = () => {
    Swal.fire({
      title: 'Are you sure want to finish?',
      text: 'You will not be able to edit users!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Add it!',
      cancelButtonText: 'No, keep editting',
    }).then((result) => {
      if (result.value) {
        this.appStore.dispatch(new AppLoadderShow({}));
        this.apiService
          .apiPostCall(
            this.url,
            {
              listId: this.listId,
              listName: this.name,
              users: this.selectedItems,
            },
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
              this.loading = false;
              this.router.navigate(['/official/notification']);
            },
            (error) => {
              this.loading = false;
              this.appStore.dispatch(new AppLoadderHide({}));
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  };

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.notificationUserForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.notificationUserForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.errors && (control.dirty || control.touched);
    return result;
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

  onItemSelect(item: any) {
    var user = {
      id: item.id,
      userName: item.name,
      name: item.name,
      villageName: item.address,
      userDesignation: item.stationName,
      userMobile1: item.mobileNo,
      userMobile2: item.contactNo,
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
        userName: item.name,
        name: item.name,
        villageName: item.address,
        userDesignation: item.stationName,
        userMobile1: item.mobileNo,
        userMobile2: item.contactNo,
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
            userName: item.name,
            name: item.name,
            villageName: item.address,
            userDesignation: item.stationName,
            userMobile1: item.mobileNo,
            userMobile2: item.contactNo,
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
    this.notificationUserForm.patchValue({
      [name]: event.target.value,
    });
  };
}
