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

const DSP_USER_PARAM_EMPTY: any = {
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
  dspId: null,
  dspName: null,
  dspNameHi: null,
  token: null,
  tokenValidity: null,
  type: null,
  updatedBy: null,
  updatedDate: null,
  villageName: null,
};
@Component({
  selector: 'app-dsp-user',
  templateUrl: './dsp-user.component.html',
  styleUrls: ['./dsp-user.component.scss']
})
export class DspUserComponent implements OnInit, OnDestroy {
  subscription: any;
  dspUserPage: Page;
  dspUserRows = new Array<StationUser>();

  dspUserColumns = [
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
  dspUserPath: string;

  @Input()
  dspUserDeleteCode: string;

  @Input()
  dspUserDeleteUrl: string;

  @Input()
  dspUserId: number;

  @Input()
  dspUserEditCurrentFormCode: string;

  @Input()
  form: UntypedFormGroup;

  @Output()
  formOut = new EventEmitter<UntypedFormGroup>();

  DSP_USER_PARAM: any = {
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
    dspId: null,
    dspName: null,
    dspNameHi: null,
    token: null,
    tokenValidity: null,
    type: null,
    updatedBy: null,
    updatedDate: null,
    villageName: null,
  };

  dspUserPermissions: Permissions = new Permissions();

  constructor(
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private appStore: Store<{ app: any }>
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dspUserPermissions.delete =
      this.global.checkForUserButtonPermission(this.dspUserDeleteCode);
    this.dspUserPermissions.edit_current_form =
      this.global.checkForUserButtonPermission(
        this.dspUserEditCurrentFormCode
      );

    this.dspUserPermissions.delete_url = this.dspUserDeleteUrl;

    this.dspUserPage = new Page(
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
        this.dspUserId,
        null,
        null,
        null,
        null,
        null,
        null
      )
    );

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      if (data.isEditing) {
        this.DSP_USER_PARAM = data.isEditingData;
        this.initStationUserForm();
      } else {
        this.DSP_USER_PARAM = DSP_USER_PARAM_EMPTY;
        this.DSP_USER_PARAM.dspId = this.dspUserId;
        this.initStationUserForm();
      }
    });
  }

  initStationUserForm = () => {
    this.form = this.fb.group({
      id: [this.DSP_USER_PARAM.id],
      dspId: [
        this.DSP_USER_PARAM.dspId,
        Validators.compose([Validators.required]),
      ],
      name: [
        this.DSP_USER_PARAM.name,
        Validators.compose([Validators.required]),
      ],
      image: [null],
      email: [this.DSP_USER_PARAM.email],
      mobileNo: [
        this.DSP_USER_PARAM.mobileNo,
        Validators.compose([Validators.required]),
      ],
      contactNo: [this.DSP_USER_PARAM.contactNo],
      type: [
        this.DSP_USER_PARAM.type,
        Validators.compose([Validators.required]),
      ],
      designationId: [this.DSP_USER_PARAM.designationId],
      villageName: [this.DSP_USER_PARAM.villageName],
      priority: [
        this.DSP_USER_PARAM.priority,
        Validators.compose([Validators.required]),
      ],
    });

    this.formOut.emit(this.form);
  };

  resetForm = () => {
    this.DSP_USER_PARAM.active = null;
    this.DSP_USER_PARAM.address = null;
    this.DSP_USER_PARAM.contactNo = null;
    this.DSP_USER_PARAM.createdBy = null;
    this.DSP_USER_PARAM.createdDate = null;
    this.DSP_USER_PARAM.designationId = null;
    this.DSP_USER_PARAM.designationName = null;
    this.DSP_USER_PARAM.districtId = null;
    this.DSP_USER_PARAM.districtName = null;
    this.DSP_USER_PARAM.email = null;
    this.DSP_USER_PARAM.id = null;
    this.DSP_USER_PARAM.image = null;
    this.DSP_USER_PARAM.mobileNo = null;
    this.DSP_USER_PARAM.name = null;
    this.DSP_USER_PARAM.permissions = null;
    this.DSP_USER_PARAM.priority = null;
    this.DSP_USER_PARAM.role = null;
    this.DSP_USER_PARAM.sidebarMenu = null;
    this.DSP_USER_PARAM.dspId = null;
    this.DSP_USER_PARAM.dspName = null;
    this.DSP_USER_PARAM.dspNameHi = null;
    this.DSP_USER_PARAM.token = null;
    this.DSP_USER_PARAM.tokenValidity = null;
    this.DSP_USER_PARAM.type = null;
    this.DSP_USER_PARAM.updatedBy = null;
    this.DSP_USER_PARAM.updatedDate = null;
    this.DSP_USER_PARAM.villageName = null;
  };
}
