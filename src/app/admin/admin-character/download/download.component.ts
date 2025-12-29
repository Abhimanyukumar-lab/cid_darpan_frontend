import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

import * as html2pdf from 'html2pdf.js';
import { ModelService } from 'src/app/common/popup/model.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { environment } from 'src/environments/environment';
import {
  AppLoadderHide,
  RefreshTableAndForm,
} from 'src/app/storage/actions/app.actions';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-character-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit, OnDestroy {
  @Input('id')
  id: number;

  subscription: any;

  characterForm: any;
  charFormData: any;
  fileName: string;
  language: string;

  url: string;

  type: string = 'TYPE1';
  districtnameEN: string;
  districtnameHI: string;

  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;

  newSixMonthDate: any;

  constructor(
    private appStore: Store<{ app: any }>,
    private apiCaller: ApiCallerService,
    private localStorage: LocalstorageService,
    private modelService: ModelService,
    private global: GlobalFunctionsService,
    private _FileSaverService: FileSaverService
  ) {
    //this.id = this.localStorage.getStoredValue('characterValue');
    this.characterForm = this.localStorage.getStoredValue('viewData');
    this.url = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.subscription = this.appStore.pipe(select('app')).subscribe((data) => {
      this.language = data.defaultLang;
      this.type = data.districtDetails.isCharacterType;
    });

    this.districtnameEN = environment.CHAR_DISTRICT_POLICE_EN;
    this.districtnameHI = environment.CHAR_DISTRICT_POLICE_HI;

    this.elementType = 'url';
    this.value = this.url + '/characterDownload';
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

        this.newSixMonthDate = new Date(this.charFormData.updatedDate);
        this.newSixMonthDate.setMonth(this.newSixMonthDate.getMonth() + 6);

        this.fileName =
          this.charFormData.name + '_Character-Unsigned-Certificate.pdf';
      });
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };

  openModal = (id: string) => {
    this.modelService.open(id);
  };

  openPDF() {
    var element = document.getElementById('downloadCerificateunSigned');
    var opt = {
      filename: this.fileName,
      image: { type: 'jpg', quality: 1 },
      html2canvas: { dpi: 250, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: {
        before: '.beforeClass',
        avoid: 'img',
      },
    };

    if (this.type == 'TYPE1') {
      html2pdf().set(opt).from(element).save();
    } else if (this.type == 'TYPE2') {
      // html2pdf()
      //   .set(opt)
      //   .from(element)
      //   .toPdf()
      //   .output('datauristring')
      //   .then((pdf) => {
      //     this.closeModal('downloadCertificate');
      //     var arr = pdf.split(',');
      //     pdf = arr[1];

      //     this.apiCaller
      //       .apiPostCall(
      //         AppConstants.CHARACTER_MODULE.GENERATE_SIGNED_CERT,
      //         { id: this.characterForm.id, extra: pdf },
      //         true
      //       )
      //       .subscribe(
      //         (data) => {
      //           this._FileSaverService.save(data, this.fileName);
      //           this.appStore.dispatch(new RefreshTableAndForm(true));
      //           this.appStore.dispatch(new AppLoadderHide({}));
      //         },
      //         (error) => {
      //           this.appStore.dispatch(new AppLoadderHide({}));
      //           this.openModal('downloadCertificate');
      //         }
      //       );
      //   });

      html2pdf().set(opt).from(element).save();
    }
  }
}
