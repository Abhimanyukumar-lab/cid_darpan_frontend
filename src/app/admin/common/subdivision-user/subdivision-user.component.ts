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
import { StationUser } from 'src/app/models/StationUser';

const SUBDIVISION_USER_PARAM_EMPTY: any = {
  active: null,
  address: null,
  contactNo: null,
  createdBy: null,
  createdDate: null,
  designationId: null,
  designationName: null,
  districtId: null,
  districtName: null,
  email: null,
  id: null,
  image: null,
  mobileNo: null,
  name: null,
  permissions: null,
  priority: null,
  role: null,
  sidebarMenu: null,
  subdivisionId: null,
  subdivisionName: null,
  subdivisionNameHi: null,
  token: null,
  tokenValidity: null,
  type: null,
  updatedBy: null,
  updatedDate: null,
  villageName: null,
};

@Component({
  selector: 'app-subdivision-user',
  templateUrl: './subdivision-user.component.html',
  styleUrls: ['./subdivision-user.component.scss']
})
export class SubdivisionUserComponent implements OnInit, OnDestroy {
  subscription: any;
  subdivisionUserPage: Page;
  subdivisionUserRows = new Array<StationUser>();

  subdivisionUserColumns = [
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
      name: 'type',
      props: 'type',
      size: 2,
      colName: 'POLICE_OFFICER.OFFICER_TYPE',
      colPlaceHolder: 'POLICE_OFFICER.ENTR_OFFICER_TYPE',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'name',
      props: 'name',
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
      name: 'image',
      props: 'image',
      size: 2,
      colName: 'FORMS.IMAGE',
      filter: false,
      isTranslate: false,
      width: '100',
      sort: false,
      type: 'MEDIA',
      isNeedToTranslate: false,
    },
    {
      name: 'designationName',
      props: 'designationName' + 'villageName',
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
      name: 'mobileNo',
      props: 'mobileNo',
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
      name: 'priority',
      props: 'priority',
      size: 2,
      colName: 'FORMS.PRIORITY',
      colPlaceHolder: 'FORMS.ENTER_PRIORITY',
      filter: false,
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
      colName: 'POLICE_OFFICER.OFFICER_TYPE',
      colPlaceHolder: 'POLICE_OFFICER.ENTR_OFFICER_TYPE',
      data: 'type',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.DESIGNATION',
      colPlaceHolder: 'HELPLINE.ENTER_DESIGNATION',
      data: 'designationIds',
      translate: true,
      type: 'DESIGNATIONS',
    },
    {
      colName: 'SECTIONS.SEC_OFFICER_CONTACT',
      colPlaceHolder: 'SECTIONS.ENTER_SEC_OFFICER_CONTACT',
      data: 'mobileNo',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      data: 'priority',
      translate: false,
      type: 'INPUT',
    },
  ];

  @Input()
  subdivisionUserPath: string;

  @Input()
  subdivisionUserDeleteCode: string;

  @Input()
  subdivisionUserDeleteUrl: string;

  @Input()
  subdivisionUserId: number;

  @Input()
  subdivisionUserEditCurrentFormCode: string;

  @Input()
  form: UntypedFormGroup;

  @Output()
  formOut = new EventEmitter<UntypedFormGroup>();

  SUBDIVISION_USER_PARAM: any = {
    active: null,
    address: null,
    contactNo: null,
    createdBy: null,
    createdDate: null,
    designationId: null,
    designationName: null,
    districtId: null,
    districtName: null,
    email: null,
    id: null,
    image: null,
    mobileNo: null,
    name: null,
    permissions: null,
    priority: null,
    role: null,
    sidebarMenu: null,
    subdivisionId: null,
    subdivisionName: null,
    subdivisionNameHi: null,
    token: null,
    tokenValidity: null,
    type: null,
    updatedBy: null,
    updatedDate: null,
    villageName: null,
  };

  subdivisionUserPermissions: Permissions = new Permissions();

  constructor(
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private appStore: Store<{ app: any }>
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subdivisionUserPermissions.delete =
      this.global.checkForUserButtonPermission(this.subdivisionUserDeleteCode);
    this.subdivisionUserPermissions.edit_current_form =
      this.global.checkForUserButtonPermission(
        this.subdivisionUserEditCurrentFormCode
      );

    this.subdivisionUserPermissions.delete_url = this.subdivisionUserDeleteUrl;

    this.subdivisionUserPage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new StationUser(
        true,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        this.subdivisionUserId,
        null,
        null,
        null,
        null
      )
    );

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isEditing) {
        this.SUBDIVISION_USER_PARAM = data.isEditingData;
        this.initStationUserForm();
      } else {
        this.SUBDIVISION_USER_PARAM = SUBDIVISION_USER_PARAM_EMPTY;
        this.SUBDIVISION_USER_PARAM.subdivisionId = this.subdivisionUserId;
        this.initStationUserForm();
      }
    });
  }

  initStationUserForm = () => {
    this.form = this.fb.group({
      id: [this.SUBDIVISION_USER_PARAM.id],
      subdivisionId: [
        this.SUBDIVISION_USER_PARAM.subdivisionId,
        Validators.compose([Validators.required]),
      ],
      name: [
        this.SUBDIVISION_USER_PARAM.name,
        Validators.compose([Validators.required]),
      ],
      image: [null],
      email: [this.SUBDIVISION_USER_PARAM.email],
      mobileNo: [
        this.SUBDIVISION_USER_PARAM.mobileNo,
        Validators.compose([Validators.required]),
      ],
      contactNo: [this.SUBDIVISION_USER_PARAM.contactNo],
      type: [
        this.SUBDIVISION_USER_PARAM.type,
        Validators.compose([Validators.required]),
      ],
      designationId: [this.SUBDIVISION_USER_PARAM.designationId],
      villageName: [this.SUBDIVISION_USER_PARAM.villageName],
      priority: [
        this.SUBDIVISION_USER_PARAM.priority,
        Validators.compose([Validators.required]),
      ],
    });

    this.formOut.emit(this.form);
  };

  resetForm = () => {
    this.SUBDIVISION_USER_PARAM.active = null;
    this.SUBDIVISION_USER_PARAM.address = null;
    this.SUBDIVISION_USER_PARAM.contactNo = null;
    this.SUBDIVISION_USER_PARAM.createdBy = null;
    this.SUBDIVISION_USER_PARAM.createdDate = null;
    this.SUBDIVISION_USER_PARAM.designationId = null;
    this.SUBDIVISION_USER_PARAM.designationName = null;
    this.SUBDIVISION_USER_PARAM.districtId = null;
    this.SUBDIVISION_USER_PARAM.districtName = null;
    this.SUBDIVISION_USER_PARAM.email = null;
    this.SUBDIVISION_USER_PARAM.id = null;
    this.SUBDIVISION_USER_PARAM.image = null;
    this.SUBDIVISION_USER_PARAM.mobileNo = null;
    this.SUBDIVISION_USER_PARAM.name = null;
    this.SUBDIVISION_USER_PARAM.permissions = null;
    this.SUBDIVISION_USER_PARAM.priority = null;
    this.SUBDIVISION_USER_PARAM.role = null;
    this.SUBDIVISION_USER_PARAM.sidebarMenu = null;
    this.SUBDIVISION_USER_PARAM.subdivisionId = null;
    this.SUBDIVISION_USER_PARAM.subdivisionName = null;
    this.SUBDIVISION_USER_PARAM.subdivisionNameHi = null;
    this.SUBDIVISION_USER_PARAM.token = null;
    this.SUBDIVISION_USER_PARAM.tokenValidity = null;
    this.SUBDIVISION_USER_PARAM.type = null;
    this.SUBDIVISION_USER_PARAM.updatedBy = null;
    this.SUBDIVISION_USER_PARAM.updatedDate = null;
    this.SUBDIVISION_USER_PARAM.villageName = null;
  };
}
