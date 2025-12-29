import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LangModule } from 'src/app/models/LangModule';
import { Menu } from 'src/app/models/Menu';
import { SubMenu } from 'src/app/models/SubMenu';
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
  selector: 'app-modify-submenu',
  templateUrl: './modify-submenu.component.html',
  styleUrls: ['./modify-submenu.component.scss'],
})
export class ModifySubmenuComponent implements OnInit, OnDestroy {
  subscription: any;
  submenu: any;
  loading = false;
  submenuForm: UntypedFormGroup;

  ADD_SUBMENU: boolean;
  EDIT_SUBMENU: boolean;

  ADD_URL: string;
  EDIT_URL: string;

  menuList: Menu[];

  subMenuList: SubMenu[];

  language: string;

  SUBMENU_PARAMS = {
    ID: null,
    MAIN_MENU_ID: null,
    MAIN_NAME: '',
    SUB_MENU_ID: null,
    SUB_MENU_NAME: '',
    MENU_NAME: '',
    MENU_NAME_HI: '',
    MENU_URL: '',
    MENU_ICON: '',
    PRIORITY: '',
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
    this.submenu = this.localStorage.getStoredValue('editData');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    if (this.submenu) {
      this.SUBMENU_PARAMS.ID = this.submenu.id;
      this.SUBMENU_PARAMS.MAIN_MENU_ID = this.submenu.menuId;
      this.SUBMENU_PARAMS.MAIN_NAME = this.submenu.mainName;
      this.SUBMENU_PARAMS.SUB_MENU_ID = this.submenu.subMenuId;
      this.SUBMENU_PARAMS.SUB_MENU_NAME = this.submenu.subMenuName;
      this.SUBMENU_PARAMS.MENU_NAME = this.submenu.menuName;
      this.SUBMENU_PARAMS.MENU_NAME_HI = this.submenu.menuNameHi;
      this.SUBMENU_PARAMS.MENU_URL = this.submenu.menuUrl;
      this.SUBMENU_PARAMS.MENU_ICON = this.submenu.menuIcon;
      this.SUBMENU_PARAMS.PRIORITY = this.submenu.priority;
    }

    this.ADD_SUBMENU = this.global.checkForUserButtonPermission(
      AppConstants.SUBMENU_MODULE.ADD_SUBMIT_DATA
    );
    this.EDIT_SUBMENU = this.global.checkForUserButtonPermission(
      AppConstants.SUBMENU_MODULE.EDIT_SUBMIT_DATA
    );
    this.ADD_URL = AppConstants.SUBMENU_MODULE.ADD_SUBMIT_URL;
    this.EDIT_URL = AppConstants.SUBMENU_MODULE.EDIT_SUBMIT_URL;

    this.apiService
      .apiGetCall(AppConstants.SUBMENU_MODULE.FTCH_MENU_DATA, true)
      .subscribe((data) => {
        this.menuList = data.menus;
      });

    this.apiService
      .apiGetCall(AppConstants.SUBMENU_MODULE.FTCH_SUBMENU_DATA, true)
      .subscribe((data) => {
        this.subMenuList = data.subNemuDTOs;
      });
  }

  ngOnInit(): void {
    this.initiateSubmenuForm();
  }

  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('editData');
    this.subscription.unsubscribe();
  }

  initiateSubmenuForm = () => {
    this.submenuForm = this.fb.group({
      id: this.SUBMENU_PARAMS.ID,
      menuId: [
        this.SUBMENU_PARAMS.MAIN_MENU_ID,
        Validators.compose([Validators.required]),
      ],
      subMenuId: [this.SUBMENU_PARAMS.SUB_MENU_ID],
      menuName: [
        this.SUBMENU_PARAMS.MENU_NAME,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ]),
      ],
      menuNameHi: [
        this.SUBMENU_PARAMS.MENU_NAME_HI,
        Validators.compose([Validators.required]),
      ],
      menuURL: [
        this.SUBMENU_PARAMS.MENU_URL,
        Validators.compose([Validators.required]),
      ],
      menuIcon: [this.SUBMENU_PARAMS.MENU_ICON],
      menuPriority: [
        this.SUBMENU_PARAMS.PRIORITY,
        Validators.compose([Validators.required]),
      ],
    });
  };

  submit = () => {
    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.submenuForm.controls;
    if (this.submenuForm.invalid && !this.submenuForm.valid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      this.loading = false;
      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.loading = true;

    var formData = new FormData();

    if (this.submenu) formData.append('id', this.submenuForm.value['id']);
    formData.append('menuId', this.submenuForm.value['menuId']);
    formData.append('subMenuId', this.submenuForm.value['subMenuId']);
    formData.append('menuName', this.submenuForm.value['menuName']);
    formData.append('menuNameHi', this.submenuForm.value['menuNameHi']);
    formData.append('menuUrl', this.submenuForm.value['menuUrl']);
    formData.append('priority', this.submenuForm.value['priority']);
    formData.append('menuIcon', this.submenuForm.value['menuIcon']);

    if (this.submenuForm.value['id'])
      this.apiService
        .apiPostCall(this.EDIT_URL, this.submenuForm.value, true)
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
        .apiPostCall(this.ADD_URL, this.submenuForm.value, true)
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
    const control = this.submenuForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  isControlHasErrors(controlName: string): boolean {
    const control = this.submenuForm.controls[controlName];
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
  
  focusOut = (event, name) => {
    this.submenuForm.patchValue({
      [name]: event.target.value,
    });
  };

}
