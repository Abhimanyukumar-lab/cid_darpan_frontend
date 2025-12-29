import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banners } from 'src/app/models/Banner';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Banners(true, null, null, null, null, null)
  );
  rows = new Array<Banners>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Name',
      props: 'name',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Url',
      props: 'url',
      size: 2,
      type: 'MEDIA',
      colName: 'LINKS.URL',
      colPlaceHolder: 'LINKS.ENTER_URL',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Type',
      props: 'type',
      size: 2,
      colName: 'BANNER.TYPE',
      colPlaceHolder: 'BANNER.ENTER_TYPE',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
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
      data: 'name',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'BANNER.TYPE',
      colPlaceHolder: 'BANNER.ENTER_TYPE',
      data: 'type',
      translate: false,
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
  
  path: string = AppConstants.BANNER_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.BANNER_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.BANNER_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.BANNER_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.BANNER_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.BANNER_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.BANNER_MODULE.EDIT_URL;
    this.permissions.deactivate_url = AppConstants.BANNER_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.BANNER_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
