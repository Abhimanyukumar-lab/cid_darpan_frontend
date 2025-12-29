import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { DeadPerson } from 'src/app/models/DeadPerson';

@Component({
  selector: 'app-admin-dead-person',
  templateUrl: './admin-dead-person.component.html',
  styleUrls: ['./admin-dead-person.component.scss'],
})
export class AdminDeadPersonComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [
      { prop: 'updateStatus', dir: 'desc' },
      { prop: 'id', dir: 'desc' },
    ],
    new DeadPerson(
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
      null,
      null,
      null
    )
  );
  rows = new Array<DeadPerson>();

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
      name: 'MissingName',
      props: 'missingName',
      size: 2,
      colName: 'MISSING_PERSON.PERSON_NAME',
      colPlaceHolder: 'MISSING_PERSON.ENTR_PERSON_NAME',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'MissingImage',
      props: 'missingImage',
      size: 2,
      type: 'MEDIA',
      colName: 'MISSING_PERSON.PERSON_IMAGE',
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'MissingGender',
      props: 'missingGender',
      size: 2,
      colName: 'MISSING_PERSON.PERSON_GENDER',
      colPlaceHolder: 'MISSING_PERSON.ENTR_PERSON_GENDER',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'DateOfMissing',
      props: 'dateOfMissing',
      size: 2,
      colName: 'DEAD_PERSON.DEAD_DEATH',
      colPlaceHolder: 'DEAD_PERSON.ENTR_DEAD_DEATH',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'MissingAge',
      props: 'missingAge',
      size: 1,
      colName: 'MISSING_PERSON.PERSON_AGE',
      colPlaceHolder: 'MISSING_PERSON.ENTR_PERSON_AGE',
      filter: true,
      sort: true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'MissingArea',
      props: 'missingArea',
      size: 2,
      colName: 'DEAD_PERSON.DEAD_AREA',
      colPlaceHolder: 'DEAD_PERSON.ENTR_DEAD_AREA',
      filter: true,
      sort: true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'status',
      props: 'status',
      size: 2,
      colName: 'COMPLAINT.STATUS',
      colPlaceHolder: 'COMPLAINT.STATUS',
      filter: true,
      isTranslate: true,
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
      colName: 'MISSING_PERSON.PERSON_NAME',
      colPlaceHolder: 'MISSING_PERSON.ENTR_PERSON_NAME',
      data: 'missingName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'MISSING_PERSON.PERSON_GENDER',
      colPlaceHolder: 'MISSING_PERSON.ENTR_PERSON_GENDER',
      data: 'missingGender',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'DEAD_PERSON.DEAD_DEATH',
      colPlaceHolder: 'DEAD_PERSON.ENTR_DEAD_DEATH',
      data: 'dateOfMissing',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'MISSING_PERSON.PERSON_AGE',
      colPlaceHolder: 'MISSING_PERSON.ENTR_PERSON_AGE',
      data: 'missingAge',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'DEAD_PERSON.DEAD_AREA',
      colPlaceHolder: 'DEAD_PERSON.ENTR_DEAD_AREA',
      data: 'missingArea',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'COMPLAINT.STATUS',
      colPlaceHolder: 'COMPLAINT.STATUS',
      data: 'status',
      translate: true,
      type: 'STATUS',
      module:'MISSINGPERSON'
    },
  ];
  

  path: string = AppConstants.DEAD_PERSON_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.DEAD_PERSON_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.DEAD_PERSON_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.DEAD_PERSON_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.DEAD_PERSON_MODULE.DELETE_BUTTON
    );

    this.permissions.add_url = AppConstants.DEAD_PERSON_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.DEAD_PERSON_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.DEAD_PERSON_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.DEAD_PERSON_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
