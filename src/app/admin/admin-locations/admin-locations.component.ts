import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Locations } from 'src/app/models/Locations';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './admin-locations.component.html',
  styleUrls: ['./admin-locations.component.scss'],
})
export class AdminLocationsComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Locations(true, null, null, null, null)
  );
  rows = new Array<Locations>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Ids',
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'LocationName',
      props: 'locationName',
      size: 1,
      colName: 'LOCATION.LOCATION_NAME',
      colPlaceHolder: 'LOCATION.ENTR_LOCATION_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'locationDiscription',
      props: 'locationDiscription',
      size: 1,
      colName: 'LOCATION.LOC_NAME',
      colPlaceHolder: 'LOCATION.LOC_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'locationImage',
      props: 'locationImage',
      size: 1,
      colName: 'FORMS.IMAGE',
      isTranslate: false,
      sort: false,
      filter: false,
      type: 'MEDIA',
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
      colName: 'LOCATION.LOCATION_NAME',
      colPlaceHolder: 'LOCATION.ENTR_LOCATION_NAME',
      data: 'locationName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'LOCATION.LOC_NAME',
      colPlaceHolder: 'LOCATION.LOC_NAME',
      data: 'locationDiscription',
      translate: true,
      type: 'INPUT',
    },
   
  ];
  
  path: string = AppConstants.LOCATION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.LOCATION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.LOCATION_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.LOCATION_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.LOCATION_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.LOCATION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.LOCATION_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.LOCATION_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.LOCATION_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
