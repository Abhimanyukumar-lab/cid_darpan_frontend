import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { EcommunicationReceipt } from 'src/app/models/EcommunicationReceipt';

@Component({
  selector: 'app-admin-ecomm-receipt',
  templateUrl: './admin-ecomm-receipt.component.html',
  styleUrls: ['./admin-ecomm-receipt.component.scss'],
})
export class AdminEcommReceiptComponent implements OnInit {
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
    new EcommunicationReceipt(
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
      null
    )
  );
  rows = new Array<EcommunicationReceipt>();

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
      name: 'ecommNoDate',
      props: 'ecommNoDate',
      size: 2,
      colName: 'ECOM_RECEIPT.SER_NO_DATE',
      colPlaceHolder: 'Eg.999999999,01/01/2021',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ecommSubject',
      props: 'ecommSubject',
      size: 2,
      colName: 'ECOM_RECEIPT.SUBJECT',
      colPlaceHolder: 'ECOM_RECEIPT.ENTR_SUBJECT',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'stationFrom',
      props: 'stationFrom',
      size: 2,
      colName: 'ECOM_RECEIPT.FROM_WHO',
      colPlaceHolder: 'ECOM_RECEIPT.ENTR_FROM_WHO',
      filter: true,
      isTranslate: true,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ecommSrNo',
      props: 'ecommSrNo',
      size: 2,
      colName: 'ECOM_RECEIPT.DOC_NO',
      colPlaceHolder: 'ECOM_RECEIPT.ENTR_DOC_NO',
      filter: true,
      isTranslate: false,
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'ecommDate',
      props: 'ecommDate',
      size: 2,
      colName: 'ECOM_RECEIPT.DATE',
      filter: false,
      isTranslate: false,
      type: 'DATE',
      width: '100',
      sort: true,
      isNeedToTranslate: false,
    },
    // {
    //   name: 'ecommStatus',
    //   props: 'ecommStatus',
    //   size: 2,
    //   colName: 'ECOM_RECEIPT.STATUS',
    //   colPlaceHolder: 'ECOM_RECEIPT.SEL_STATUS',
    //   filter: true,
    //   isTranslate: true,
    //   width: '100',
    //   sort: true,
    //   isNeedToTranslate: false,
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
      name: 'dispatchNo',
      props: 'dispatchNo',
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
      name: 'ecommFill2',
      props: 'ecommFill2',
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
      name: 'ecommStatus',
      props: 'ecommStatus',
      size: 2,
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      filter: true,
      sort: true,
      isTranslate: false,
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
      colName: 'ECOM_RECEIPT.SER_NO_DATE',
      colPlaceHolder: 'Eg.999999999,01/01/2021',
      data: 'ecommNoDate',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'ECOM_RECEIPT.SUBJECT',
      colPlaceHolder: 'ECOM_RECEIPT.ENTR_SUBJECT',
      data: 'ecommSubject',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'ECOM_RECEIPT.FROM_WHO',
      colPlaceHolder: 'ECOM_RECEIPT.ENTR_FROM_WHO',
      data: 'stationFrom',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'ECOM_RECEIPT.DATE',
      data: 'ecommDate',
      translate: false,
      type: 'DATE',
    },
    {
      colName: 'ECOM_RECEIPT.STATUS',
      colPlaceHolder: 'ECOM_RECEIPT.SEL_STATUS',
      data: 'ecommStatus',
      translate: true,
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
      colName: 'ECOM_RECEIPT.DOC_NO',
      colPlaceHolder: 'ECOM_RECEIPT.ENTR_DOC_NO',
      data: 'ecommSrNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'CHARACTER.DISPATCH_NO',
      colPlaceHolder: 'CHARACTER.SEL_DISPATCH_NO',
      data: 'dispatchNo',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'COURT.COURT_STATUS',
      colPlaceHolder: 'COURT.COURT_STATUS',
      data: 'ecommStatus',
      translate: false,
      type: 'ECOMMTYPE',
    },
  ];

  path: string = AppConstants.ECOM_RECEIPT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_RECEIPT_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_RECEIPT_MODULE.EDIT_BUTTON
    );
    this.permissions.view = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_RECEIPT_MODULE.VIEW_BUTTON
    );
    this.permissions.delete = this.global.checkForUserButtonPermission(
      AppConstants.ECOM_RECEIPT_MODULE.DELETE_BUTTON
    );

    this.permissions.add_url = AppConstants.ECOM_RECEIPT_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.ECOM_RECEIPT_MODULE.EDIT_URL;
    this.permissions.view_url = AppConstants.ECOM_RECEIPT_MODULE.VIEW_URL;
    this.permissions.delete_url = AppConstants.ECOM_RECEIPT_MODULE.DELETE_URL;
  }
  ngOnInit(): void {}

  goToLink = (url: any) => {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  };
}
