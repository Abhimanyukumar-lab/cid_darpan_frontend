import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Rti } from 'src/app/models/Rti';

@Component({
  selector: 'app-admin-rti',
  templateUrl: './admin-rti.component.html',
  styleUrls: ['./admin-rti.component.scss'],
})
export class AdminRtiComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Rti(
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
      null
    )
  );
  rows = new Array<Rti>();

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
      name: 'rtoRequestname',
      props: 'rtoRequestname',
      size: 2,
      colName: 'APPOINTMENT.NAME',
      colPlaceHolder: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'rtoRequestAddress',
      props: 'rtoRequestAddress',
      size: 2,
      colName: 'RTI.GOT_FROM',
      colPlaceHolder: 'RTI.ENTR_GOT_FROM',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'rtoSubject',
      props: 'rtoSubject',
      size: 2,
      colName: 'COMPLAINT.OL_SUBJECT',
      colPlaceHolder: 'COMPLAINT.SUBJECT',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'rtoResolveNo',
      props: 'rtoResolveNo',
      size: 2,
      colName: 'RTI.EXC_DATE_BOOK',
      colPlaceHolder: 'RTI.ENTR_EXC_DATE_BOOK',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'ef1',
    //   props: 'ef1',
    //   size: 2,
    //   colName: 'COMPLAINT.DOCUMENT',
    //   type: 'MEDIA',
    //   isTranslate: false,
    //   sort: false,
    //   filter: false,
    // },
    {
      name: 'reciptNo',
      props: 'reciptNo',
      size: 2,
      colName: 'CHARACTER.RECEIPT_NO',
      colPlaceHolder: 'CHARACTER.SEL_RECEIPT_NO',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'dispatchNum',
      props: 'dispatchNum',
      size: 2,
      colName: 'CHARACTER.DISPATCH_NO',
      colPlaceHolder: 'CHARACTER.SEL_DISPATCH_NO',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ef1',
      props: 'ef1',
      size: 2,
      colName: 'COMPLAINT.DOCUMENT',
      filter: false,
      isTranslate: false,
      width: '100',
      sort: false,
      type: 'MEDIA',
      isNeedToTranslate: false,
    },
    {
      name: 'documentReply',
      props: 'documentReply',
      size: 2,
      colName: 'COMPLAINT.DOCUMENT',
      filter: false,
      isTranslate: false,
      width: '100',
      sort: false,
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
      colName: 'APPOINTMENT.NAME',
      colPlaceHolder: 'APPOINTMENT.SELECT_APPLICANT_NAME',
      data: 'rtoRequestname',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'RTI.GOT_FROM',
      colPlaceHolder: 'RTI.ENTR_GOT_FROM',
      data: 'rtoRequestAddress',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'COMPLAINT.OL_SUBJECT',
      colPlaceHolder: 'COMPLAINT.SUBJECT',
      data: 'rtoSubject',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'RTI.EXC_DATE_BOOK',
      colPlaceHolder: 'RTI.ENTR_EXC_DATE_BOOK',
      data: 'rtoResolveNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'CHARACTER.RECEIPT_NO',
      colPlaceHolder: 'CHARACTER.SEL_RECEIPT_NO',
      data: 'reciptNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'CHARACTER.DISPATCH_NO',
      colPlaceHolder: 'CHARACTER.SEL_DISPATCH_NO',
      data: 'dispatchNum',
      translate: false,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.RTI_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.RTI_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.RTI_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.RTI_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.RTI_MODULE.DELETE_BUTTON
    );

    this.permissions.add_url = AppConstants.RTI_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.RTI_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.RTI_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.RTI_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
