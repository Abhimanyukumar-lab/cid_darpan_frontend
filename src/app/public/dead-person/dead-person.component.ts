import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/common/popup/model.service';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-dead-person',
  templateUrl: './dead-person.component.html',
  styleUrls: ['./dead-person.component.scss'],
})
export class DeadPersonComponent implements OnInit {
  baseUrl: string = AppConstants.backServer;
  deadPerson: any;
  dead: any;

  constructor(
    private apiCaller: ApiCallerService,
    private global: GlobalFunctionsService,
    private modelService: ModelService
  ) {
    this.baseUrl = this.global.getSiteBackUrl() || AppConstants.backServer;
    this.apiCaller
      .apiGetCall(AppConstants.PUBLIC_APIS.GETDEADPERSON, false)
      .subscribe((data) => {
        this.deadPerson = data.deadPersonDTOs;
      });
  }

  ngOnInit(): void {}

  openModal = (id: string, dead) => {
    this.dead = dead;
    this.modelService.open(id);
  };

  closeModal = (id: string) => {
    this.modelService.close(id);
  };
}
