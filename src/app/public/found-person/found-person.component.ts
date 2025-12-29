import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/common/popup/model.service';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-found-person',
  templateUrl: './found-person.component.html',
  styleUrls: ['./found-person.component.scss'],
})
export class FoundPersonComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  foundPerson: any;
  found: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService,
    private modelService: ModelService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.GETFOUNDPERSON, false)
      .subscribe((data) => {
        this.foundPerson = data.foundPersonDTOs;
      });
  }

  ngOnInit(): void {}

  openModal = (id: string, found) => {
    this.found = found;
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };
}
