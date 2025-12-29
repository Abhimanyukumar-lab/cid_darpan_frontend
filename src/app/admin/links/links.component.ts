import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Links } from 'src/app/models/links';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Permissions } from 'src/app/models/Permissions';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Links(null, null, null, null, null, null, null, null, null)
  );
  rows = new Array<Links>();

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
      name: 'linksNameHi',
      props: 'linksNameHi',
      size: 2,
      colName: 'LINKS.LINK_NAME',
      colPlaceHolder: 'LINKS.ENTER_LINK_NAME',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'linksNameEn',
      props: 'linksNameEn',
      size: 2,
      colName: 'LINKS.LINK_NAME',
      colPlaceHolder: 'LINKS.ENTER_LINK_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Link Url',
      props: 'linkUrl',
      size: 2,
      colName: 'LINKS.LINK_URL',
      colPlaceHolder: 'LINKS.ENTER_LINK_URL',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Link Type',
      props: 'linkType',
      size: 2,
      colName: 'LINKS.LINK_TYPE',
      colPlaceHolder: 'LINKS.ENTER_LINK_TYPE',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Links Colour',
      props: 'linksColour',
      size: 2,
      colName: 'DISTRICT_DETAILS.LINK_COLOUR',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_COLOR',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Link Priority',
      props: 'linkPriority',
      size: 1,
      colName: 'FORMS.PRIORITY',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Actions',
      props: 'active',
      size: 2,
      colName: 'Actions',
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
      colName: 'LINKS.LINK_NAME',
      colPlaceHolder: 'LINKS.ENTER_LINK_NAME',
      data: 'linksNameEn',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'LINKS.LINK_NAME',
      colPlaceHolder: 'LINKS.ENTER_LINK_NAME',
      data: 'linksNameHi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'LINKS.LINK_URL',
      colPlaceHolder: 'LINKS.ENTER_LINK_URL',
      data: 'linkUrl',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'DISTRICT_DETAILS.LINK_COLOUR',
      colPlaceHolder: 'CITIZEN_REPORT.SEL_COLOR',
      data: 'linksColour',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      data: 'linkPriority',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.LINKS_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.LINKS_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.LINKS_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.LINKS_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.LINKS_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.LINKS_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.LINKS_MODULE.EDIT_URL;
    this.permissions.deactivate_url = AppConstants.LINKS_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.LINKS_MODULE.ACTIVATE_URL;
  }

  ngOnInit(): void {}
}
