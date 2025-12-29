import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/Page';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { Permissions } from 'src/app/models/Permissions';
import { SupplierProducts } from 'src/app/models/SupplierProducts';

@Component({
  selector: 'app-suppliers-products-table',
  templateUrl: './suppliers-products-table.component.html',
  styleUrls: ['./suppliers-products-table.component.scss'],
})
export class SuppliersProductsTableComponent implements OnInit {
  //for Product Details

  supplierProductspage: Page;
  supplierProductsRows = new Array<SupplierProducts>();

  supplierProductscolumns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'assetTypeName',
      props: 'assetTypeName',
      size: 2,
      colName: 'Asset Type',
      colPlaceHolder: 'Enter Asset Type',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'productName',
      props: 'productName',
      size: 2,
      colName: 'Product Name',
      colPlaceHolder: 'Enter Product Name',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'productPrice',
      props: 'productPrice',
      size: 2,
      colName: 'Product Price',
      colPlaceHolder: 'Enter Product Price',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'productQuantity',
      props: 'productQuantity',
      size: 2,
      colName: 'Product Quantity',
      colPlaceHolder: 'Enter Product Quantity',
      isTranslate: false,
      sort: true,
      filter: true,
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

  @Input()
  supplierProductsPath: string;

  @Input()
  supplierProductsDeactivate: string;

  @Input()
  supplierProductsDeactivateUrl: string;

  @Input()
  supplierProductsActivate: string;

  @Input()
  supplierProductsActivateUrl: string;

  @Input()
  supplierProductsEdit: string;

  @Input()
  supplierProductsEditUrl: string;

  @Input()
  supplierProductsId: number;

  supplierProductspermissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {
    this.supplierProductspermissions.deactivate =
      this.global.checkForUserButtonPermission(this.supplierProductsDeactivate);

    this.supplierProductspermissions.activate =
      this.global.checkForUserButtonPermission(this.supplierProductsActivate);

    this.supplierProductspermissions.edit =
      this.global.checkForUserButtonPermission(this.supplierProductsEdit);

    this.supplierProductspermissions.deactivate_url =
      this.supplierProductsDeactivateUrl;
    this.supplierProductspermissions.activate_url =
      this.supplierProductsActivateUrl;
    this.supplierProductspermissions.edit_url = this.supplierProductsEditUrl;

    this.supplierProductspage = new Page(
      0,
      0,
      0,
      0,
      true,
      [{ prop: 'id', dir: 'desc' }],
      new SupplierProducts(
        true,
        null,
        null,
        null,
        null,
        null,
        null,
        this.supplierProductsId,
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
  }
}
