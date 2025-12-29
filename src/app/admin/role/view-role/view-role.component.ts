import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss'],
})
export class ViewRoleComponent implements OnInit, OnDestroy {
  role: any;

  permissionId = 'id';
  permissionName = 'permissionName';
  permissionList = [];
  permissionSelected = [];

  menuId = 'id';
  menuName = 'menuName';
  menuList = [];
  menuSelected = [];

  submenuId = 'id';
  submenuName = 'menuName';
  submenuList = [];
  submenuSelected = [];

  updatePermissionButton: boolean = false;
  updateMenuButton: boolean = false;
  updateSubmenuButton: boolean = false;

  moduleList = [];
  moduleSystemConfigList = [];

  selectedOne = {};

  constructor(
    private _location: Location,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private apiCaller: ApiCallerService,
    private toaster: ToasterService
  ) {
    this.global.checkForUserPermission(this.router.url);

    this.role = this.localStorage.getStoredValue('viewData');

    this.updatePermissionButton = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.UPDATE_PERMISSION
    );
    this.updateMenuButton = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.UPDATE_MENU
    );
    this.updateSubmenuButton = this.global.checkForUserButtonPermission(
      AppConstants.ROLE_MODULE.UPDATE_SUBMENU
    );
  }
  ngOnDestroy(): void {
    this.localStorage.destroyStoredValue('viewData');
  }

  ngOnInit(): void {
    this.apiCaller
      .apiPostCall(
        AppConstants.ROLE_MODULE.FETCH_VIEW_DATA,
        { roleId: this.role.id },
        true
      )
      .subscribe((data) => {
        this.permissionList = data.permissions;
        this.permissionSelected = data.selectedPermissions;
        this.menuList = data.menus;
        this.menuSelected = data.selectedMenus;
        this.submenuList = data.submenus;
        this.submenuSelected = data.selectedSubmenus;
      });

    this.apiCaller
      .apiPostCall(
        AppConstants.ROLE_MODULE.SYSTEM_CONFIG_DATA,
        { name: this.role.roleName },
        true
      )
      .subscribe((data) => {
        this.moduleList = data.modules;
        this.moduleSystemConfigList = data.moduleSystemConfig;
        this.selectedOne = data.selectedOne;
      });
  }

  goBack() {
    this._location.back();
  }

  updatePermission() {
    var idS = [];

    this.permissionSelected.map((permission) => {
      idS.push(permission.id);
    });

    this.apiCaller
      .apiPostCall(
        AppConstants.ROLE_MODULE.UPDATE_PERMISSION_URL,
        { id: this.role.id, permissionIds: idS },
        true
      )
      .subscribe((data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
      });
  }

  updateMenu() {
    var idS = [];

    this.menuSelected.map((menu) => {
      idS.push(menu.id);
    });

    this.apiCaller
      .apiPostCall(
        AppConstants.ROLE_MODULE.UPDATE_MENU_URL,
        { id: this.role.id, menuIds: idS },
        true
      )
      .subscribe((data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
      });
  }

  updateSubMenu() {
    var idS = [];

    this.submenuSelected.map((menu) => {
      idS.push(menu.id);
    });

    this.apiCaller
      .apiPostCall(
        AppConstants.ROLE_MODULE.UPDATE_SUBMENU_URL,
        { id: this.role.id, subMenuIds: idS },
        true
      )
      .subscribe((data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
      });
  }

  onSelectChange = (event) => {
    this.selectedOne[event.target.name] = event.target.value;
  };

  getSelectedValue = (event) => {};

  updateSystemConfig = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.ROLE_MODULE.UPDATE_SYSTEM_CONFIG_DATA,
        { data: this.selectedOne },
        true
      )
      .subscribe((data) => {
        this.toaster.getToastMessage(data.message, 'success', 3000, 'top-end');
      });
  };
}
