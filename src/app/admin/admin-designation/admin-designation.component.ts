import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Designation } from 'src/app/models/Designation';

@Component({
  selector: 'app-admin-designation',
  templateUrl: './admin-designation.component.html',
  styleUrls: ['./admin-designation.component.scss'],
})
export class AdminDesignationComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Designation(true, null, null, null, null, null)
  );
  rows = new Array<Designation>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'designationName',
      props: 'designationName',
      size: 2,
      colName: 'DESIGNATION.DESIGN_NAME',
      colPlaceHolder: 'DESIGNATION.DESIGN_SEL_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'designationNameHi',
      props: 'designationNameHi',
      size: 2,
      colName: 'DESIGNATION.DESIGN_NAME',
      colPlaceHolder: 'DESIGNATION.DESIGN_SEL_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'priority',
      props: 'priority',
      size: 2,
      colName: 'FORMS.PRIORITY',
      colPlaceHolder: 'FORMS.ENTER_PRIORITY',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Action',
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
      colName: 'DESIGNATION.DESIGN_NAME',
      colPlaceHolder: 'DESIGNATION.DESIGN_SEL_NAME',
      data: 'designationName',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'DESIGNATION.DESIGN_NAME',
      colPlaceHolder: 'DESIGNATION.DESIGN_SEL_NAME',
      data: 'designationNameHi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.ENTER_DESIGNATION',
      colPlaceHolder: 'DESIGNATION.DESIGN_SEL_DESCRI',
      data: 'description',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      data: 'priority',
      translate: true,
      type: 'INPUT',
    },
  ];
  
  path: string = AppConstants.DESIGNATION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.DESIGNATION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.DESIGNATION_MODULE.EDIT_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.DESIGNATION_MODULE.DEACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.DESIGNATION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.DESIGNATION_MODULE.EDIT_URL;
    this.permissions.delete_url =
      AppConstants.DESIGNATION_MODULE.DEACTIVATE_URL;
  }
  ngOnInit(): void {}
}
