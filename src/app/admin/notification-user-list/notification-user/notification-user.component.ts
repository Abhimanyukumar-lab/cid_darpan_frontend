import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NotificationUserList } from '../../../models/NotificationUserList';

const NOTIFICATION_USER_PARAM_EMPTY: any = {
  userName: null,
  name: null,
  villageName: null,
  userDesignation: null,
  userMobile1: null,
  userMobile2: null,
  createdBy: null,
  createdDate: null,
  updatedBy: null,
  updatedDate: null,
  active: null,
};

@Component({
  selector: 'app-notification-user',
  templateUrl: './notification-user.component.html',
  styleUrls: ['./notification-user.component.scss'],
})
export class NotificationUserComponent implements OnInit, OnDestroy {
  subscription: any;
  notificationUserPage: Page;
  notificationUserRows = new Array<NotificationUserList>();

  notificationUserColumns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'userName',
      props: 'userName',
      size: 2,
      colName: 'POLICE_OFFICER.OFFICER_NAME',
      colPlaceHolder: 'POLICE_OFFICER.ENT_OFFICER_NAME',
      isTranslate: true,
      filter: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'userDesignation',
      props: 'userDesignation',
      size: 2,
      colName: 'POLICE_OFFICER.OFFICER_DESIGN',
      colPlaceHolder: 'POLICE_OFFICER.ENTR_OFFICER_DESIGN',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'villageName',
      props: 'villageName',
      size: 2,
      colName: 'Village Name',
      colPlaceHolder: 'Enter Village Name',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'userMobile1',
      props: 'userMobile1',
      size: 2,
      colName: 'SECTIONS.SEC_OFFICER_CONTACT',
      colPlaceHolder: 'SECTIONS.ENTER_SEC_OFFICER_CONTACT',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'userMobile2',
      props: 'userMobile2',
      size: 2,
      colName: 'SECTIONS.SEC_OFFICER_CONTACT',
      colPlaceHolder: 'SECTIONS.ENTER_SEC_OFFICER_CONTACT',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Action',
      isTranslate: false,
      width: '100',
      sort: false,
      isNeedToTranslate: false,
    },
  ];

  filterOptions = [
    {
      colName: 'Id',
      colPlaceHolder: 'Id',
      data: 'id',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'POLICE_OFFICER.OFFICER_NAME',
      colPlaceHolder: 'POLICE_OFFICER.ENT_OFFICER_NAME',
      data: 'name',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.DESIGNATION',
      colPlaceHolder: 'HELPLINE.ENTER_DESIGNATION',
      data: 'userDesignation',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'Village Name',
      colPlaceHolder: 'Enter Village Name',
      data: 'villageName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'SECTIONS.SEC_OFFICER_CONTACT',
      colPlaceHolder: 'SECTIONS.ENTER_SEC_OFFICER_CONTACT',
      data: 'userMobile1',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'SECTIONS.SEC_OFFICER_CONTACT',
      colPlaceHolder: 'SECTIONS.ENTER_SEC_OFFICER_CONTACT',
      data: 'userMobile2',
      translate: true,
      type: 'INPUT',
    },
  ];

  @Input()
  notificationUserPath: string;

  @Input()
  notificationUserDeleteCode: string;

  @Input()
  notificationUserDeleteUrl: string;

  @Input()
  notificationUserId: number;

  @Input()
  notificationUserEditCurrentFormCode: string;

  @Input()
  form: UntypedFormGroup;

  @Output()
  formOut = new EventEmitter<UntypedFormGroup>();

  NOTIFICATION_USER_PARAM: any = {
    userName: null,
    name: null,
    villageName: null,
    userDesignation: null,
    userMobile1: null,
    userMobile2: null,
    createdBy: null,
    createdDate: null,
    updatedBy: null,
    updatedDate: null,
    active: null,
  };

  notificationUserPermissions: Permissions = new Permissions();

  constructor(
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private appStore: Store<{ app: any }>
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.notificationUserPermissions.delete =
      this.global.checkForUserButtonPermission(this.notificationUserDeleteCode);
    this.notificationUserPermissions.edit_current_form =
      this.global.checkForUserButtonPermission(
        this.notificationUserEditCurrentFormCode
      );

    this.notificationUserPermissions.delete_url =
      this.notificationUserDeleteUrl;

    this.notificationUserPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new NotificationUserList(
        true,
        null,
        this.notificationUserId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      )
    );
  }

  initNotificationUserForm = () => {
    this.form = this.fb.group({
      id: [this.NOTIFICATION_USER_PARAM.ID],
      userName: [this.NOTIFICATION_USER_PARAM.USERNAME],
      name: [
        this.NOTIFICATION_USER_PARAM.NAME,
        Validators.compose([Validators.required]),
      ],
      villageName: [
        this.NOTIFICATION_USER_PARAM.NAME,
        Validators.compose([Validators.required]),
      ],
      userDesignation: [
        this.NOTIFICATION_USER_PARAM.NAME,
        Validators.compose([Validators.required]),
      ],
      userMobile1: [
        this.NOTIFICATION_USER_PARAM.NAME,
        Validators.compose([Validators.required]),
      ],
      userMobile2: [this.NOTIFICATION_USER_PARAM.NAME],
    });

    this.formOut.emit(this.form);
  };

  resetForm = () => {
    this.NOTIFICATION_USER_PARAM.name = null;
    this.NOTIFICATION_USER_PARAM.villageName = null;
    this.NOTIFICATION_USER_PARAM.userDesignation = null;
    this.NOTIFICATION_USER_PARAM.userMobile1 = null;
    this.NOTIFICATION_USER_PARAM.userMobile2 = null;
    this.NOTIFICATION_USER_PARAM.createdBy = null;
    this.NOTIFICATION_USER_PARAM.createdDate = null;
    this.NOTIFICATION_USER_PARAM.updatedBy = null;
    this.NOTIFICATION_USER_PARAM.updatedDate = null;
    this.NOTIFICATION_USER_PARAM.active = null;
  };
}
