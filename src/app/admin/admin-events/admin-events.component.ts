import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Events } from 'src/app/models/Events';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Events(true, null, null, 'EVENTS')
  );
  rows = new Array<Events>();

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
      name: 'Title',
      props: 'title',
      size: 2,
      colName: 'FORMS.TITLE',
      colPlaceHolder: 'IMAGE_GALLERY.ENTER_EVENT_NAME',
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
      ccolName: 'FORMS.TITLE',
      colPlaceHolder: 'IMAGE_GALLERY.ENTER_EVENT_NAME',
      data: 'title',
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
  
  path: string = AppConstants.EVENTS_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.EVENTS_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.EVENTS_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.EVENTS_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.EVENTS_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.EVENTS_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.EVENTS_MODULE.EDIT_URL;
    this.permissions.deactivate_url = AppConstants.EVENTS_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.EVENTS_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
