import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { Location } from '@angular/common';
import {
  AppLoadderHide,
  AppLoadderShow,
} from 'src/app/storage/actions/app.actions';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-character-download',
  templateUrl: './character-download.component.html',
  styleUrls: ['./character-download.component.scss'],
})
export class CharacterDownloadComponent implements OnInit, OnDestroy {
  subscription: any;
  characterDownloadForm: UntypedFormGroup;
  showData: boolean = false;
  errorMsg: string = null;
  alertType: string = null;

  characterForm: any;
  charFormData: any;
  fileName: string;
  language: string;
  url: string;

  min: Date = new Date();

  currentYear = this.min.getFullYear();

  constructor(
    private appStore: Store<{ app: any }>,
    private fb: UntypedFormBuilder,
    private global: GlobalFunctionsService,
    private _location: Location,
    private apiCaller: ApiCallerService
  ) {
    this.url = this.global.getSiteBackUrl() || AppConstants.backServer;

    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
    });

    this.initCheckStatusForm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  initCheckStatusForm = () => {
    this.characterDownloadForm = this.fb.group({
      charId: ['', Validators.compose([Validators.required])],
      districtMemoNo: ['', Validators.compose([Validators.required])],
    });
  };

  submitData = () => {
    var year = this.characterDownloadForm.value['charId'].split('/')[1];

    if (!this.characterDownloadForm.value['charId'].includes('/')) {
      this.alertType = 'danger';
      this.errorMsg = 'Character Id should be like' + `${this.currentYear}`;
    }

    if (
      !this.characterDownloadForm.value['charId'].includes('/') &&
      year != this.currentYear
    ) {
      this.alertType = 'danger';
      this.errorMsg = `Character Id should be like eg. 001/${this.currentYear}`;
    }

    this.appStore.dispatch(new AppLoadderShow({}));
    const controls = this.characterDownloadForm.controls;
    if (
      this.characterDownloadForm.invalid &&
      !this.characterDownloadForm.valid
    ) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );

      this.alertType = 'danger';
      this.errorMsg = 'Character Id and District Memo Number both are Required';

      this.appStore.dispatch(new AppLoadderHide({}));
      return;
    }

    this.apiCaller
      .apiPostCall(
        AppConstants.PUBLIC_APIS.CHARACTER_DOWNLOAD,
        this.characterDownloadForm.value,
        false,
        false,
        false
      )
      .subscribe(
        (data) => {
          this.alertType = 'success';
          this.errorMsg = data.message;

          this.characterDownloadForm.controls['charId'].disable();
          this.characterDownloadForm.controls['districtMemoNo'].disable();

          this.characterForm = data.characterFormDTO;
          this.charFormData = data.characterFormDTO.characterDetailsDTO;

          this.fileName =
            this.charFormData.name + '_Character-Unsigned-Certificate.pdf';

          this.showData = true;
          this.appStore.dispatch(new AppLoadderHide({}));
        },
        (error) => {
          this.alertType = 'danger';
          if (error.message != null && error.message != 1)
            this.errorMsg = error.message;
          this.showData = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      );
  };

  isControlHasErrors = (name: string) => {
    return this.global.isControlHasErrors(this.characterDownloadForm, name);
  };

  isControlHasError = (name: string, methode: string) => {
    return this.global.isControlHasError(
      this.characterDownloadForm,
      name,
      methode
    );
  };

  openPDF() {
    // let doc = new jsPDF();
    // doc.html(document.getElementById('viewCharacterForm'), function () {
    //   doc.save('viewCharacterForm.pdf');
    // });

    var element = document.getElementById('downloadCerificateunSigned');
    var opt = {
      filename: this.fileName,
      image: { type: 'jpg', quality: 0.98 },
      html2canvas: { dpi: 196, scale: 2, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  }

  goBack() {
    this._location.back();
  }
}
