import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LangModule } from 'src/app/models/LangModule';
import { Permissions } from 'src/app/models/Permissions';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewComponent implements OnInit, OnDestroy {
  subscription: any;

  baseUrl: string = AppConstants.backServer;
  characterForm: any;
  charFormData: any;
  permissions: Permissions = new Permissions();

  backUrl: string;
  id: number;
  characterId: number = null;
  language: string;
  name: string;

  CHAR_FORM_EN: string;
  CHAR_FORM_HI: string;

  fileName: string;
  addSoftNo: string;
  characterDate: string;
  stationMemoNo: string;

  constructor(
    private appStore: Store<{ app: any }>,
    private localStorage: LocalstorageService,
    private global: GlobalFunctionsService,
    private router: Router,
    private _location: Location,
    private apiCaller: ApiCallerService,
    public langModule: LangModule,
    private translateService: TranslateService
  ) {
    this.id = this.localStorage.getStoredValue('characterValue');
    this.backUrl = this.localStorage.getStoredValue('characterUrl');

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.translateService
      .get('HOME.DISTRICT_POLICE')
      .subscribe((text: string) => {
        this.name = text;
      });

    this.baseUrl = global.getSiteBackUrl() || AppConstants.backServer;

    this.global.checkForUserPermission(this.router.url);
    this.characterForm = this.localStorage.getStoredValue('viewData');

    this.fetchData();
  }
  ngOnDestroy(): void {
    // this.localStorage.destroyStoredValue('characterValue');
    // this.localStorage.destroyStoredValue('characterUrl');
    // this.localStorage.destroyStoredValue('viewData');
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  fetchData = () => {
    this.apiCaller
      .apiPostCall(
        AppConstants.CHARACTER_MODULE.VIEW_CHAR_FORM_URL,
        { characterId: this.id },
        true
      )
      .subscribe((data) => {
        this.characterForm = data.characterFormDTO;
        this.charFormData = this.characterForm.characterDetailsDTO;
        this.fileName = this.charFormData.name + '_Character.pdf';
        this.addSoftNo = this.charFormData.addSoftNo;
        this.characterDate = this.charFormData.createdDate;
        this.stationMemoNo = this.charFormData.stationMemoNo;
      });
  };

  goBack() {
    this._location.back();
  }

  openPDF() {
    var element = document.getElementById('viewCharacterForm');
    html2pdf(element, {
      margin: 0,
      filename: this.fileName,
      image: { type: 'jpg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        logging: true,
        dpi: 300,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  }
}
