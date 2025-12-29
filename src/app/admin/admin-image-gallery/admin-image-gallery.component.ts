import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { ImageGallery } from 'src/app/models/ImageGallery';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-image-gallery',
  templateUrl: './admin-image-gallery.component.html',
  styleUrls: ['./admin-image-gallery.component.scss'],
})
export class AdminImageGalleryComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new ImageGallery(true, null, null, null, null, null, null, 'IMAGE_GALLERY')
  );
  rows = new Array<ImageGallery>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      sort:true,
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Title',
      props: 'title',
      size: 2,
      colName: 'FORMS.TITLE',
      colPlaceHolder: 'FORMS.ENTER_TITLE',
      isTranslate: true,
      sort:true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Released By',
      props: 'releasedBy',
      size: 2,
      colName: 'IMAGE_GALLERY.EVENT_NAME',
      colPlaceHolder: 'IMAGE_GALLERY.ENTER_EVENT_NAME',
      filter: true,
      sort:true,
      isTranslate: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Link',
      props: 'link',
      size: 2,
      type: 'MEDIA',
      colName: 'FORMS.LINK',
      colPlaceHolder: 'FORMS.ENTER_LINK',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      sort:true,
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
      colName: 'FORMS.TITLE',
      colPlaceHolder: 'FORMS.ENTER_TITLE',
      data: 'title',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'IMAGE_GALLERY.EVENT_NAME',
      colPlaceHolder: 'IMAGE_GALLERY.ENTER_EVENT_NAME',
      data: 'releasedBy',
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
  
  path: string = AppConstants.IMAGE_GALLERY_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.IMAGE_GALLERY_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.IMAGE_GALLERY_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.IMAGE_GALLERY_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.IMAGE_GALLERY_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.IMAGE_GALLERY_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.IMAGE_GALLERY_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.IMAGE_GALLERY_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.IMAGE_GALLERY_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
