import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OurTeam } from 'src/app/models/OurTeam';
import { Page } from 'src/app/models/Page';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-important-achievement',
  templateUrl: './admin-important-achievement.component.html',
  styleUrls: ['./admin-important-achievement.component.scss'],
})
export class AdminImportantAchievementComponent {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new OurTeam(
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
      'IMPORTANT_ACHIEVEMENT'
    )
  );
  rows = new Array<OurTeam>();

  columns = [
    {
      name: 'Id',
      props: 'id',
      size: 1,
      colName: 'Id',
      colPlaceHolder: 'Enter ID',
      isTranslate: false,
      filter: false,
      sort: true,
      isNeedToTranslate: false,
    },
    {
      name: 'title',
      props: 'title',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'titleHi',
      props: 'titleHi',
      size: 2,
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'link',
      props: 'link',
      size: 2,
      type: 'MEDIA',
      colName: 'FORMS.IMAGE',
      isTranslate: false,
      isNeedToTranslate: false,
    },
    {
      name: 'description',
      props: 'description',
      size: 2,
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      isTranslate: false,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'descriptionHi',
      props: 'descriptionHi',
      size: 2,
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'Priority',
      props: 'priority',
      size: 1,
      colName: 'Priority',
      colPlaceHolder: 'Enter Priority',
      isTranslate: false,
      sort: true,
      filter: false,
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
      data: 'title',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'HELPLINE.HELPLINE_NAME',
      colPlaceHolder: 'APPOINTMENT.ENTER_NAME',
      data: 'titleHi',
      translate: true,
      type: 'INPUT',
    },
    {
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      data: 'description',
      translate: false,
      type: 'INPUT',
    },
    {
      colName: 'TRANSFER.TRANSFER_DESCRIPTION',
      colPlaceHolder: 'TRANSFER.ENTER_TRANSFER_DESCRIPTION',
      data: 'descriptionHi',
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

  path: string = AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.EDIT_BUTTON
    );
    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url =
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.ADD_URL;
    this.permissions.edit_url =
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url =
      AppConstants.IMPORTANT_ACHIEVEMENT_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
