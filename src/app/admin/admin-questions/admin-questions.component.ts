import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/models/Permissions';
import { Page } from 'src/app/models/Page';
import { Router } from '@angular/router';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import { Subdivision } from 'src/app/models/Subdivision';
import { Question } from 'src/app/models/Question';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss'],
})
export class AdminQuestionsComponent implements OnInit {
  page = new Page(
    0,
    0,
    0,
    0,
    true,
    [{ prop: 'id', dir: 'desc' }],
    new Question(true, null, null, null, null, null, null)
  );
  rows = new Array<Question>();

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
      name: 'questionName',
      props: 'questionName',
      size: 2,
      colName: 'QUESTION.QUESTION_NAME',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_NAME',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'answer1Title',
      props: 'answer1Title',
      size: 2,
      colName: 'QUESTION.QUESTION_ANSWER',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_ANSWER',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'answer2Title',
      props: 'answer2Title',
      size: 2,
      colName: 'QUESTION.QUESTION_ANSWER2',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_ANSWER',
      isTranslate: true,
      sort: true,
      filter: true,
      isNeedToTranslate: false,
    },
    {
      name: 'answer3Title',
      props: 'answer3Title',
      size: 2,
      colName: 'QUESTION.QUESTION_ANSWER3',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_ANSWER',
      isTranslate: true,
      sort: true,
      filter: true,
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
      colName: 'QUESTION.QUESTION_NAME',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_NAME',
      data: 'questionName',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'answer1Title',
      colName: 'QUESTION.QUESTION_ANSWER',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_ANSWER',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'answer2Title',
      colName: 'QUESTION.QUESTION_ANSWER2',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_ANSWER',
      translate: true,
      type: 'INPUT',
    },
    {
      data: 'answer3Title',
      colName: 'QUESTION.QUESTION_ANSWER3',
      colPlaceHolder: 'QUESTION.ENTER_QUESTION_ANSWER',
      translate: true,
      type: 'INPUT',
    },
  ];

  path: string = AppConstants.QUESTION_MODULE.FETCH_URL;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {
    this.global.checkForUserPermission(this.router.url);

    this.permissions.add = this.global.checkForUserButtonPermission(
      AppConstants.QUESTION_MODULE.ADD_BUTTON
    );
    this.permissions.edit = this.global.checkForUserButtonPermission(
      AppConstants.QUESTION_MODULE.EDIT_BUTTON
    );

    this.permissions.deactivate = this.global.checkForUserButtonPermission(
      AppConstants.QUESTION_MODULE.DEACTIVATE_BUTTON
    );
    this.permissions.activate = this.global.checkForUserButtonPermission(
      AppConstants.QUESTION_MODULE.ACTIVATE_BUTTON
    );

    this.permissions.add_url = AppConstants.QUESTION_MODULE.ADD_URL;
    this.permissions.edit_url = AppConstants.QUESTION_MODULE.EDIT_URL;
    this.permissions.deactivate_url =
      AppConstants.QUESTION_MODULE.DEACTIVATE_URL;
    this.permissions.activate_url = AppConstants.QUESTION_MODULE.ACTIVATE_URL;
  }
  ngOnInit(): void {}
}
