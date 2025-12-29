import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/common/popup/model.service';
import { PublicModelService } from 'src/app/common/public-popup/public-model.service';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-missing-person',
  templateUrl: './missing-person.component.html',
  styleUrls: ['./missing-person.component.scss'],
})
export class MissingPersonComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  missingPerson: any;
  missing: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService,
    private modelService: ModelService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.GETMISSINGPERSON, false)
      .subscribe((data) => {
        this.missingPerson = data.missingPersonDTOs;
      });
  }

  ngOnInit(): void {}

  openModal = (id: string, missing) => {
    this.missing = missing;
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };
}
