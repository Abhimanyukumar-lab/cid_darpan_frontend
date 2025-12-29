import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Procecution } from 'src/app/models/Procecution';

@Component({
  selector: 'app-summon',
  templateUrl: './summon.component.html',
  styleUrls: ['./summon.component.scss']
})
export class SummonComponent implements OnInit {

  //summon
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Procecution(
      true,
      null,
      'Summons',
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
  rows = new Array<Procecution>();

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
      name: 'serialNoDate',
      props: 'serialNoDate',
      size: 2,
      colName: 'PROCECUTION.SER_NO_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_SER_NO_DATE',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'courtName',
    //   props: 'courtName',
    //   size: 2,
    //   colName: 'PROCECUTION.NAME_OF_PROC',
    //   colPlaceHolder: 'PROCECUTION.ENTR_NAME_OF_PROC',
    //   isTranslate: true,
    //   sort: true,
    //   filter: true,
    //   isNeedToTranslate: false,
    // },
    {
      name: 'proName',
      props: 'proName',
      size: 2,
      colName: 'PROCECUTION.NAME_OF_PROC',
      colPlaceHolder: 'PROCECUTION.ENTR_NAME_OF_PROC',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'procAddress',
      props: 'procAddress',
      size: 2,
      colName: 'PROCECUTION.PROC_ADDRESS',
      colPlaceHolder: 'PROCECUTION.ENTR_PROC_ADDRESS',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'procType',
      props: 'procType',
      size: 2,
      colName: 'PROCECUTION.PROC_TYPE',
      colPlaceHolder: 'PROCECUTION.SEL_PROC_TYPE',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'mobileNo',
      props: 'mobileNo',
      size: 2,
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'presentDate',
      props: 'presentDate',
      size: 2,
      colName: 'PROCECUTION.PRESENT_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_PRESENT_DATE',
      isTranslate: false,
      sort: true,
      filter: true,
      type:'DATE',
      isNeedToTranslate: false,
    },
    {
      name: 'remark',
      props: 'remark',
      size: 2,
      colName: 'PROCECUTION.NEXT_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_NEXT_DATE',
      isTranslate: false,
      sort: true,
      filter: true,
      // type:'DATE',
      isNeedToTranslate: false,
    },
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
      name: 'document',
      props: 'document',
      size: 2,
      colName: 'COMPLAINT.DOCUMENT',
      type:'MEDIA',
      isTranslate: false,
      sort: false,
      filter: false,
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
      colName: 'PROCECUTION.SER_NO_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_SER_NO_DATE',
      data: 'serialNoDate',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'PROCECUTION.NAME_OF_PROC',
      colPlaceHolder: 'PROCECUTION.ENTR_NAME_OF_PROC',
      data: 'proName',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'PROCECUTION.PROC_ADDRESS',
      colPlaceHolder: 'PROCECUTION.ENTR_PROC_ADDRESS',
      data: 'procAddress',
      translate: true,
      type: 'INPUT',
    },
    // {
    //   colName: 'PROCECUTION.PROC_TYPE',
    //   colPlaceHolder: 'PROCECUTION.SEL_PROC_TYPE',
    //   data: 'procType',
    //   translate: false,
    //   type: 'INPUT',
    // },
    {
      colName: 'CONTACT.MOBILE_NUMBER',
      colPlaceHolder: 'CONTACT.SEL_MOBILE_NO',
      data: 'mobileNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'PROCECUTION.PRESENT_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_PRESENT_DATE',
      data: 'presentDate',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'PROCECUTION.NEXT_DATE',
      colPlaceHolder: 'PROCECUTION.ENTR_NEXT_DATE',
      data: 'nextDate',
      translate: false,
      type: 'DATE',
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

  path: string = AppConstants.PROCECUTION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.PROCECUTION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.PROCECUTION_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.PROCECUTION_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.PROCECUTION_MODULE.DELETE_BUTTON
    );

    this.permissions.add_url = AppConstants.PROCECUTION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.PROCECUTION_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.PROCECUTION_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.PROCECUTION_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}
}
