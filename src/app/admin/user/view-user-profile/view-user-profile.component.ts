import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';
import { UserData } from 'src/app/models/UserData';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.scss']
})
export class ViewUserProfileComponent implements OnInit {
deleteUser(arg0: any) {
throw new Error('Method not implemented.');
}
editUser(arg0: any) {
throw new Error('Method not implemented.');
}
nextPage() {
throw new Error('Method not implemented.');
}
goToPage(_t57: any) {
throw new Error('Method not implemented.');
}
getPages(): any {
throw new Error('Method not implemented.');
}
previousPage() {
throw new Error('Method not implemented.');
}
  page = new Page(
    0,
    0,
    0,
    0,
    false,
    null,
    new UserData(
      true,
      null,
      null,
      null,
      {
        id: null,
        roleName: null,
      },
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
      null,
      null,
      null
    )
  );
  rows = new Array<UserData>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'IDs',
      colPlaceHolder: 'Enter Id',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'firstName',
      props: 'firstName',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'subdivisionId',
      props: 'subdivisionId',
      size: 2,
      colName: 'Subdivision',
      colPlaceHolder: 'Subdivision',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'lastName',
      props: 'lastName',
      size: 2,
      colName: 'HELPLINE.SURNAME',
      colPlaceHolder: 'HELPLINE.ENTER_SURNAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'mobileNo',
      props: 'mobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'email',
      props: 'email',
      size: 2,
      colName: 'CONTACT.EMAIL',
      colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_EMAIL',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'userImage',
      props: 'userImage',
      size: 2,
      colName: 'FORMS.IMAGE',
      type: 'MEDIA',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'roleName',
      props: 'roleName',
      size: 2,
      colName: 'USER.ROLE_NAME',
      colPlaceHolder: 'USER.ENTR_ROLE_NAME',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
      isTranslate: false,
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
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'firstName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.SURNAME',
      colPlaceHolder: 'HELPLINE.ENTER_SURNAME',
      data: 'lastName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      data: 'mobileNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'CONTACT.EMAIL',
      colPlaceHolder: 'DISTRICT_DETAILS.ENTER_DIST_EMAIL',
      data: 'email',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'USER.ROLE_NAME',
      colPlaceHolder: 'USER.ENTR_ROLE_NAME',
      data: 'roleIds',
      translate: true,
      type: 'ROLES',
    },
  ];

  path: string = AppConstants.USER_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    //this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.USER_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission( 
      AppConstants.USER_MODULE.EDIT_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.USER_MODULE.DEACTIVATE_BUTTON
    );
    // this.permissions.activate = this.global.checkForUserButtonPermission(
    //   AppConstants.USER_MODULE.ACTIVATE_BUTTON
    // );

    this.permissions.add_url = AppConstants.USER_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.USER_MODULE.EDIT_URL;
    this.permissions.delete_url = AppConstants.USER_MODULE.DEACTIVATE_URL;
    // this.permissions.activate_url = AppConstants.USER_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
